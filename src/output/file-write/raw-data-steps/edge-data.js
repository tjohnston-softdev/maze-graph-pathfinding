const fs = require("fs");
const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");
const writeOptions = require("../../../common/sub-files/write-options");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const writtenFile = require("../../../common/sub-output/written-file");
const csvHeaders = require("../../../common/sub-output/csv-headers");
const csvAttributes = require("../../../common/sub-output/csv-attributes");


// Writes raw edge graph data to a .csv file.
function createRawEdgeDataFile(destPaths, specificRouteUsed, fullGraphObject, dataFileCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var dataFileStream = fs.createWriteStream(destPaths.rawEdgesFile, writeOptions.streamSettings);
	
	
	// Write error.
	dataFileStream.on('error', function(wError)
	{
		var flaggedErrorText = streamExceptions.getFileWrite("Edge Data", fileResultObject.created);
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedErrorText;
		
		dataFileStream.end();
	});
	
	
	// Created successfully.
	dataFileStream.on('ready', function()
	{
		fileResultObject.created = true;
		
		writeHeaderRow(dataFileStream, specificRouteUsed);
		writeEdgesLoop(dataFileStream, specificRouteUsed, fullGraphObject);
		
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


// Write edge CSV lines.
function writeEdgesLoop(dfsObject, sRouteUsed, fullGraph)
{
	var edgeIndex = 0;
	var currentEdgeObject = {};
	var currentValueList = [];
	var currentLineString = "";
	
	var cacheText = "";
	
	
	// Loop edges.
	for (edgeIndex = 0; edgeIndex < fullGraph.edgeList.length; edgeIndex = edgeIndex + 1)
	{
		// Read edge object.
		currentEdgeObject = fullGraph.edgeList[edgeIndex];
		currentValueList = [];
		currentLineString = "";
		
		// Prepares row cell values.
		prepareEdgeAttributes(currentEdgeObject, currentValueList);
		prepareHighlightAttribute(currentEdgeObject, sRouteUsed, currentValueList);
		
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


// Writes CSV header line.
function writeHeaderRow(dfsObject, sRouteUsed)
{
	var rowLineText = csvHeaders.getEdgeHeader(sRouteUsed);
	dfsObject.write(rowLineText);
}



// Writes common edge attribute cells.
function prepareEdgeAttributes(eObj, vList)
{
	csvAttributes.addPositiveNumber(eObj.edgeID, false, vList);
	csvAttributes.addPositiveNumber(eObj.origin, false, vList);
	csvAttributes.addPositiveNumber(eObj.destination, false, vList);
	csvAttributes.addPositiveNumber(eObj.distance, false, vList);
}


// Writes highlight status cell if needed.
function prepareHighlightAttribute(eObj, useHighlight, vList)
{
	if (useHighlight === true)
	{
		csvAttributes.addTrueFalse(eObj.highlightedRoute, false, vList);
	}
}




module.exports =
{
	createEdgeFile: createRawEdgeDataFile
};