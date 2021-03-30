const fs = require("fs");
const ora = require("ora");
const spinText = require("../../common/sub-interface/spin-text/st-output-convert");
const writeOptions = require("../../common/sub-files/write-options");
const streamExceptions = require("../../common/sub-files/stream-exceptions");
const writtenFile = require("../../common/sub-output/written-file");
const headerInfo = require("./conversion-steps/header-info");
const relativeMarkers = require("./conversion-steps/relative-markers");
const relativeNodeList = require("./conversion-steps/relative-node-list");
const relativeEdgeList = require("./conversion-steps/relative-edge-list");
const relativeStartEnd = require("./conversion-steps/relative-start-end");



/*
	* This file is used to initiate relative conversion output as a text file.
	* This affects the commands:
		* absolute-to-relative
		* grid-to-relative
		* image-to-relative
*/



// Main function.
function performRelativeConversionFileExport(inpDestinationPath, inpGraphObject, fileHeaderText, convExportCallback)
{
	var exportSpinner = ora(spinText.conversionProg).start();
	
	coordinateFileWrite(inpDestinationPath, inpGraphObject, fileHeaderText, function (relExportError, relExportRes)
	{
		if (relExportError !== null)
		{
			exportSpinner.fail(spinText.conversionFail);
			return convExportCallback(relExportError, null);
		}
		else
		{
			exportSpinner.succeed(spinText.conversionComp);
			return convExportCallback(null, true)
		}
	});
}


// File creation.
function coordinateFileWrite(inpDestPth, inpGraphObj, fileHeadTxt, fwCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var convFileStreamObject = fs.createWriteStream(inpDestPth, writeOptions.streamSettings);
	
	
	// Write error.
	convFileStreamObject.on('error', function (cfsError)
	{
		var flaggedErrorMessage = streamExceptions.getFileWrite("Conversion Output", fileResultObject.created);
		
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedErrorMessage;
		
		convFileStreamObject.end();
	});
	
	
	// Created successfully.
	convFileStreamObject.on('ready', function()
	{
		fileResultObject.created = true;
		
		// Conversion file header.
		headerInfo.writeRelativeHeader(convFileStreamObject, fileHeadTxt, inpGraphObj);
		
		// Nodes
		relativeMarkers.writeLabel(convFileStreamObject, "NODES:");
		relativeNodeList.writeNodes(convFileStreamObject, inpGraphObj.nodeList);
		relativeMarkers.writeSeparator(convFileStreamObject);
		
		// Edges
		relativeMarkers.writeLabel(convFileStreamObject, "EDGES:");
		relativeEdgeList.writeEdges(convFileStreamObject, inpGraphObj);
		relativeMarkers.writeSeparator(convFileStreamObject);
		
		// Start,End
		relativeStartEnd.writePoints(convFileStreamObject, inpGraphObj);
		
		convFileStreamObject.end();
	});
	
	
	// Write complete
	convFileStreamObject.on('finish', function()
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




module.exports =
{
	performFileExport: performRelativeConversionFileExport
};