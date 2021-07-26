const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const txtGraphResCtrl = require("./output/res-ctrl-txt-graph");


/*
	Command: map-grid
	Description: Creates graph from grid input file.
	Steps:
		* Validate console input.
		* Check input file and output folder paths are safe.
		* Check template files exist.
		* Parse text file.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Pathfinding.
		* Prepare output folder.
		* Output graph file.
		* Output raw data. (Optional)
*/



function runGridFileMapping(eInputPath, eMappingMode, optionalArgumentsObject)
{
	var preparedArgumentsObject = textEntryValidation.readArguments(eInputPath, eMappingMode, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		executePreperationTasks(preparedArgumentsObject);
	}
}



function executePreperationTasks(prepArgsObj)
{
	var sInputFile = prepArgsObj.preparedPaths.inputFile;
	var sOutputFolder = prepArgsObj.preparedPaths.outputFolder;
	var sIgnoreTextErrors = prepArgsObj.ignoreTextErrors;
	var readGridObject = null;
	
	series(
	[
		mapExist.verifyTextPathsExist.bind(null, sInputFile, sOutputFolder),				// Check IO paths safe.
		templateFiles.verifyTemplateFiles.bind(null),										// Check template files safe.
		textFileRead.performGridParsing.bind(null, sInputFile, sIgnoreTextErrors)			// Parse input file.
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			readGridObject = prepRes[2];
			executeGridInitialization(prepArgsObj, readGridObject);
		}
	});
	
}




function executeGridInitialization(pArgsObj, readGridObj)
{
	initializeGrid.performIntl(readGridObj, pArgsObj.ignoreTextErrors, function(gIntlError, gIntlRes)
	{
		if (gIntlError !== null)
		{
			exitProgram.callExit(gIntlError.message);
		}
		else
		{
			executeGraphTasks(pArgsObj, readGridObj, gIntlRes);
		}
	});
}



function executeGraphTasks(pArguments, readGrid, parsedGraph)
{
	var pathfindObject = null;
	
	series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),						// Traverse grid for nodes.
		parseStructureIntegrity.performCheck.bind(null, parsedGraph),						// Check graph structure valid.
		routeFind.performGraphPathfinding.bind(null, pArguments.mapModeFlag, parsedGraph),		// Run pathfinding algorithm.
		resultFolder.createOutputFolder.bind(null, pArguments.preparedPaths.outputFolder)		// Prepare output folder.
	],
	function (graphError, graphResult)
	{
		if (graphError !== null)
		{
			exitProgram.callExit(graphError.message);
		}
		else
		{
			pathfindObject = graphResult[2];
			executeOutputTasks(pArguments, parsedGraph, pathfindObject);
		}
	});
}


function executeOutputTasks(pArgs, pGraph, pPathResult)
{
	txtGraphResCtrl.callOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pPathResult, "Grid Text File");
}



module.exports =
{
	performCommand: runGridFileMapping
};