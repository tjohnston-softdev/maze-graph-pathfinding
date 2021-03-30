const fs = require("fs");
const ora = require("ora");
const spinText = require("../../common/sub-interface/spin-text/st-output-convert");
const writeOptions = require("../../common/sub-files/write-options");
const streamExceptions = require("../../common/sub-files/stream-exceptions");
const writtenFile = require("../../common/sub-output/written-file");
const headerInfo = require("./conversion-steps/header-info");
const gridLines = require("./conversion-steps/grid-lines");

/*
	* This file is used to initiate grid conversion output as a text file.
	* This affects the command 'image-to-grid'
*/


// Main function.
function performGridConversionFileExport(inpDestinationPath, inpGridObject, inpGraphObject, fileHeaderText, convExportCallback)
{
	var exportSpinner = ora(spinText.conversionProg).start();
	
	coordinateFileWrite(inpDestinationPath, inpGridObject, inpGraphObject, fileHeaderText, function (absExportError, absExportRes)
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
function coordinateFileWrite(inpDestPth, inpGridObj, inpGraphObj, fileHeadTxt, fwCallback)
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
		
		headerInfo.writeAbsoluteGridHeader(convFileStreamObject, fileHeadTxt, inpGraphObj);				// Conversion file header.
		gridLines.writeLines(convFileStreamObject, inpGridObj);											// Grid rows.
		
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
	performFileExport: performGridConversionFileExport
};