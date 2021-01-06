const fs = require("fs");
const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");
const writeOptions = require("../../../common/sub-files/write-options");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const pathContext = require("../../../common/sub-input/path-context");
const writtenFile = require("../../../common/sub-output/written-file");
const csvHeaders = require("../../../common/sub-output/csv-headers");
const csvAttributes = require("../../../common/sub-output/csv-attributes");



// Writes raw node graph data to a .csv file.
function createRawNodeDataFile(nodePathMode, destPaths, fullGraphObject, dataFileCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var dataFileStream = fs.createWriteStream(destPaths.rawNodesFile, writeOptions.streamSettings);
	
	
	// Write error.
	dataFileStream.on('error', function (wError)
	{
		var flaggedErrorText = streamExceptions.getFileWrite("Node Data", fileResultObject.created);
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedErrorText;
		
		dataFileStream.end();
	});
	
	
	// Created successfully.
	dataFileStream.on('ready', function()
	{
		fileResultObject.created = true;
		writeHeaderRow(nodePathMode, dataFileStream);
		writeNodesLoop(nodePathMode, fullGraphObject, dataFileStream);
		
		dataFileStream.end();
	});
	
	
	// Write complete.
	dataFileStream.on('finish', function()
	{
		if (fileResultObject.successful === true)
		{
			return dataFileCallback(null, true);
		}
		else
		{
			return dataFileCallback(new Error(fileResultObject.errorMessageText), null);
		}
	});
	
}


// Write node CSV lines.
function writeNodesLoop(pMode, fullGraph, dfsObject)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentValueList = [];
	var currentLineString = "";
	
	var cacheText = "";
	
	for (nodeIndex = 0; nodeIndex < fullGraph.nodeList.length; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = fullGraph.nodeList[nodeIndex];
		currentValueList = [];
		currentLineString = "";
		
		// Prepares row cell values.
		prepareBaseAttributes(currentNodeObject, currentValueList);
		prepareSubAttributes(currentNodeObject, currentValueList, pMode);
		
		// Writes row line text.
		currentLineString += charShortcuts.lineBreak;
		currentLineString += currentValueList.join();
		
		
		if (cacheText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			dfsObject.write(cacheText);
			cacheText = currentLineString;
		}
		else
		{
			// Add current line to cache.
			cacheText = cacheText + currentLineString;
		}
	}
	
	// Write remaining cache text.
	if (cacheText.length > 0)
	{
		dfsObject.write(cacheText);
	}
	
	
}



// Writes CSV header line based on pathfinding mode.
function writeHeaderRow(pMode, dfsObject)
{
	var rowLineText = "";
	
	if (pMode === pathContext.modes.DIJKSTRA)
	{
		rowLineText = csvHeaders.getDsktraNodeHeader();
	}
	else if (pMode === pathContext.modes.A_STAR)
	{
		rowLineText = csvHeaders.getAstarNodeHeader();
	}
	else if (pMode === pathContext.modes.BLOCK)
	{
		rowLineText = csvHeaders.getBlockedNodesHeader();
	}
	else if (pMode === pathContext.modes.ANY_POSSIBLE)
	{
		rowLineText = csvHeaders.getAnyPossibleNodeHeader();
	}
	else
	{
		rowLineText = csvHeaders.getBasicNodeHeader();
	}
	
	
	dfsObject.write(rowLineText);
}



// Writes common node attribute cells.
function prepareBaseAttributes(nodeObj, valList)
{
	csvAttributes.addPositiveNumber(nodeObj.nodeID, false, valList);
	csvAttributes.addPositiveNumber(nodeObj.rowNumber, true, valList);			// True = Optional
	csvAttributes.addPositiveNumber(nodeObj.colNumber, true, valList);
	csvAttributes.addNodeType(nodeObj.typeFlag, valList);
}



// Writes pathfinding-specific node attribute cells.
function prepareSubAttributes(nodeObj, valList, sType)
{
	if (sType === pathContext.modes.DIJKSTRA)
	{
		csvAttributes.addZeroPositiveNumber(nodeObj.distanceFromStart, false, valList);
		csvAttributes.addPositiveNumber(nodeObj.previous, true, valList);
		csvAttributes.addTrueFalse(nodeObj.visited, false, valList);
	}
	else if (sType === pathContext.modes.A_STAR)
	{
		csvAttributes.addZeroPositiveNumber(nodeObj.heuristicValue, false, valList);
		csvAttributes.addZeroPositiveNumber(nodeObj.distanceFromStart, true, valList);
		csvAttributes.addZeroPositiveNumber(nodeObj.totalCost, true, valList);
		csvAttributes.addPositiveNumber(nodeObj.previous, true, valList);
		csvAttributes.addFlagNumber(nodeObj.visitFlag, false, valList);
	}
	else if (sType === pathContext.modes.ANY_POSSIBLE)
	{
		csvAttributes.addPositiveNumber(nodeObj.previous, true, valList);
		csvAttributes.addFlagNumber(nodeObj.visitFlag, false, valList);
	}
	else if (sType === pathContext.modes.BLOCK)
	{
		csvAttributes.addTrueFalse(nodeObj.blocked, false, valList);
	}
}



module.exports =
{
	createNodeFile: createRawNodeDataFile
};