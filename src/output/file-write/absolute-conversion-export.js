const fs = require("fs");
const ora = require("ora-classic");
const spinText = require("../../common/sub-interface/spin-text/st-output-convert");
const writeOptions = require("../../common/sub-files/write-options");
const streamExceptions = require("../../common/sub-files/stream-exceptions");
const writtenFile = require("../../common/sub-output/written-file");
const headerInfo = require("./conversion-steps/header-info");
const graphEdgeCoordinates = require("./conversion-steps/graph-edge-coordinates");


/*
	* This file is used to initiate absolute conversion output as a text file.
	* This affects the commands 'image-to-absolute' and 'grid-to-absolute'
*/


// Main function.
function performAbsoluteConversionFileExport(inpDestinationPath, inpGraphObject, fileHeaderText, convExportCallback)
{
	var exportSpinner = ora(spinText.conversionProg).start();
	
	coordinateFileWrite(inpDestinationPath, inpGraphObject, fileHeaderText, function (absExportError, absExportRes)
	{
		if (absExportError !== null)
		{
			exportSpinner.fail(spinText.conversionFail);
			return convExportCallback(absExportError, null);
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
		
		headerInfo.writeAbsoluteGridHeader(convFileStreamObject, fileHeadTxt, inpGraphObj);			// Conversion file header.
		graphEdgeCoordinates.writeEdgeList(convFileStreamObject, inpGraphObj);						// Edge coordinates list.
		
		convFileStreamObject.end();
	});
	
	
	// Write complete.
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
	performExport: performAbsoluteConversionFileExport
};