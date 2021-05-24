const asyncModule = require("async");
const fs = require("fs");
const ora = require("ora");
const valuePrep = require("../../common/value-prep");
const writeOptions = require("../../common/sub-files/write-options");
const streamExceptions = require("../../common/sub-files/stream-exceptions");
const pathContext = require("../../common/sub-input/path-context");
const writtenFile = require("../../common/sub-output/written-file");
const templateFile = require("./graph-steps/template-file");
const graphDefinition = require("./graph-steps/graph-definition");
const pathDefinition = require("./graph-steps/path-definition");
const layoutDefinition = require("./graph-steps/layout-definition");
const graphBody = require("./graph-steps/graph-body");
const storedPaths = require("../../../stored-paths");


// This file is used to initiate graph export as a HTML file.



// Main function.
function performNodeGraphExport(inpPathMode, destinationObject, completedGraphObject, completedPathObject, graphInputTypeText, graphExportCallback)
{
	var writeNewFile = valuePrep.checkStringType(destinationObject.mainGraphFile);
	
	if (writeNewFile === true && destinationObject.mainGraphFile.length > 0)
	{
		coordinateGraphExport(inpPathMode, destinationObject, completedGraphObject, completedPathObject, graphInputTypeText, graphExportCallback);
	}
	else
	{
		coordinateGraphSkip(graphExportCallback);
	}
}


// Export graph.
function coordinateGraphExport(pathModeNumber, destObject, completedGraphObj, completedPathObj, gInputTypeTxt, modeCallback)
{
	var exportGraphSpinner = ora("Exporting Graph").start();
	
	
	manageFileCreation(pathModeNumber, destObject.mainGraphFile, completedGraphObj, completedPathObj, gInputTypeTxt, function(expError, expResult)
	{
		if (expError !== null)
		{
			exportGraphSpinner.fail("Graph Export Failed");
			return modeCallback(expError, null);
		}
		else
		{
			exportGraphSpinner.succeed("Graph Exported");
			return modeCallback(null, true);
		}
	});
	
}



// Skip graph export.
function coordinateGraphSkip(modeCallback)
{
	var skipGraphSpinner = ora("Graph Export Skipped").start();
	skipGraphSpinner.info();
	return modeCallback(null, true);
}



// File creation.
function manageFileCreation(pthMode, graphFilePath, completedGraph, completedPath, gTypeText, fwCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var graphFileStreamObject = fs.createWriteStream(graphFilePath, writeOptions.streamSettings);
	
	
	// File write error.
	graphFileStreamObject.on('error', function(wError)
	{
		var flaggedErrorMessage = streamExceptions.getFileWrite("Graph", fileResultObject.created);
		
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedErrorMessage;
		
		graphFileStreamObject.end();
	});
	
	
	// File created.
	graphFileStreamObject.on('ready', function()
	{
		fileResultObject.created = true;
		
		// The graph file will be written differently depending on pathfinding mode.
		if (pthMode === pathContext.modes.DIJKSTRA)
		{
			// Dijkstra - Shortest path.
			compileShortestPath(graphFileStreamObject, completedGraph, completedPath, gTypeText, pthMode, fileResultObject);
		}
		else if (pthMode === pathContext.modes.A_STAR)
		{
			// A*Star - Shortest path.
			compileShortestPath(graphFileStreamObject, completedGraph, completedPath, gTypeText, pthMode, fileResultObject);
		}
		else if (pthMode === pathContext.modes.ALL_POSSIBLE)
		{
			// All possible - Multiple paths.
			compileAllPaths(graphFileStreamObject, completedGraph, completedPath, gTypeText, pthMode, fileResultObject);
		}
		else if (pthMode === pathContext.modes.ANY_POSSIBLE)
		{
			// Any possible - Random path.
			compileShortestPath(graphFileStreamObject, completedGraph, completedPath, gTypeText, pthMode, fileResultObject);
		}
		else if (pthMode === pathContext.modes.BLOCK)
		{
			// Blocked nodes - No path.
			compileBlocked(graphFileStreamObject, completedGraph, completedPath, gTypeText, pthMode, fileResultObject);
		}
		else
		{
			// Blank - No path.
			compileBlankPath(graphFileStreamObject, completedGraph, gTypeText, fileResultObject);
		}
		
	});
	
	
	// File write complete.
	graphFileStreamObject.on('finish', function()
	{
		if (fileResultObject.successful === true)
		{
			return fwCallback(null, true);
		}
		else
		{
			return fwCallback(new Error(fileResultObject.errorMessageText), null);
		}
	});
}



// Writes graph file contents for single path.
function compileShortestPath(gfsObject, compGraphObj, compPathObj, gText, pMode, fileResObj)
{
	asyncModule.series(
	[
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.headerPath),								// Header.
		graphDefinition.writeCommonDefinition.bind(null, gfsObject, compGraphObj),							// Graph definition.
		pathDefinition.writeSingle.bind(null, gfsObject, compPathObj),										// Single path definition.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.stylePath),								// CSS styling.
		graphBody.writeBody.bind(null, gfsObject, gText, pMode),											// Main body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.contentShortestPath),					// Single path body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.graphPath),								// Main graph scripting.
		layoutDefinition.writeStructure.bind(null, gfsObject, compGraphObj),								// Graph layout.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.dynamicShortestPath),					// Single path scripting.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.footerPath)								// Footer.
	],
	function (compileError, compileRes)
	{
		if (compileError !== null)
		{
			fileResObj.successful = false;
			fileResObj.errorMessageText = compileError.message;
		}
		
		// Save file.
		gfsObject.end();
	});
}


// Writes graph file contents for multiple paths.
function compileAllPaths(gfsObject, compGraphObj, compPathObj, gText, pMode, fileResObj)
{
	asyncModule.series(
	[
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.headerPath),								// Header.
		graphDefinition.writeCommonDefinition.bind(null, gfsObject, compGraphObj),							// Graph definition.
		pathDefinition.writeMultiple.bind(null, gfsObject, compPathObj),									// Multiple paths definition.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.stylePath),								// CSS styling.
		graphBody.writeBody.bind(null, gfsObject, gText, pMode),											// Main body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.contentAllPath),							// Multiple path body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.graphPath),								// Main graph scripting.
		layoutDefinition.writeStructure.bind(null, gfsObject, compGraphObj),								// Graph layout.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.dynamicAllPath),							// Multiple path scripting.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.footerPath)								// Footer
	],
	function (compileError, compileRes)
	{
		if (compileError !== null)
		{
			fileResObj.successful = false;
			fileResObj.errorMessageText = compileError.message;
		}
		
		gfsObject.end();
	});
}



// Writes graph file contents for blocked nodes.
function compileBlocked(gfsObject, compGraphObj, compPathObj, gText, pMode, fileResObj)
{
	asyncModule.series(
	[
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.headerPath),								// Header
		graphDefinition.writeBlockDefinition.bind(null, gfsObject, compGraphObj),							// Graph definition with blocked nodes.
		pathDefinition.writeBlock.bind(null, gfsObject, compPathObj),										// Block result definition.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.stylePath),								// CSS styling.
		graphBody.writeBody.bind(null, gfsObject, gText, pMode),											// Main body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.contentBlockPath),						// Blocked nodes content.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.graphPath),								// Main graph scripting.
		layoutDefinition.writeStructure.bind(null, gfsObject, compGraphObj),								// Graph layout.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.dynamicBlockPath),						// Blocked nodes scripting.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.footerPath)								// Footer.
	],
	function (compileError, compileRes)
	{
		if (compileError !== null)
		{
			fileResObj.successful = false;
			fileResObj.errorMessageText = compileError.message;
		}
		
		gfsObject.end();
	});
}





// Writes graph file contents without any paths.
function compileBlankPath(gfsObject, compGraphObj, gText, fileResObj)
{
	asyncModule.series(
	[
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.headerPath),								// Header.
		graphDefinition.writeCommonDefinition.bind(null, gfsObject, compGraphObj),							// Graph definition.
		pathDefinition.writeBlank.bind(null, gfsObject),													// Blank result object.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.stylePath),								// CSS styling.
		graphBody.writeBody.bind(null, gfsObject, gText, -1),												// Main body contents.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.contentBlankPath),						// Begin script.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.graphPath),								// Main graph scripting.
		layoutDefinition.writeStructure.bind(null, gfsObject, compGraphObj),								// Graph layout.
		templateFile.addTemplate.bind(null, gfsObject, storedPaths.footerPath)								// Footer
	],
	function (compileError, compileRes)
	{
		if (compileError !== null)
		{
			fileResObj.successful = false;
			fileResObj.errorMessageText = compileError.message;
		}
		
		gfsObject.end();
	});
}





module.exports =
{
	performGraphExport: performNodeGraphExport
};