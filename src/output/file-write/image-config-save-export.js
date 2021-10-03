const fs = require("fs");
const ora = require("ora-classic");
const writeOptions = require("../../common/sub-files/write-options");
const streamExceptions = require("../../common/sub-files/stream-exceptions");
const writtenFile = require("../../common/sub-output/written-file");
const valuePrep = require("../../common/value-prep");
const objectTasks = require("../../common/object-tasks");
const imgSettingsPrep = require("./conversion-steps/img-settings-prep");


// This file is used to initiate image config file output.


// Main function (Optional)
function performImageConfigFileExport(destinationPath, imgSettingsObject, configExportCallback)
{
	var savePathDefined = valuePrep.checkStringType(destinationPath);
	
	if (savePathDefined === true && destinationPath.length > 0)
	{
		// Create config.
		coordinateConfigExport(destinationPath, imgSettingsObject, configExportCallback);
	}
	else
	{
		coordinateExportSkip(configExportCallback);
	}
	
}


// Main function (Required)
function coordinateConfigExport(destPathString, imgSettings, modeCallback)
{
	var exportSpinner = ora("Saving Config File").start();
	
	manageSaveData(destPathString, imgSettings, function (manageError, manageRes)
	{
		if (manageError !== null)
		{
			exportSpinner.fail("Config Save Failed");
			return modeCallback(manageError, null);
		}
		else
		{
			exportSpinner.succeed("Config File Saved");
			return modeCallback(null, true);
		}
	});
	
}


// File creation.
function manageSaveData(destPth, imgSetObj, fwCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var configFileStreamObject = fs.createWriteStream(destPth, writeOptions.streamSettings);
	
	
	// Write error.
	configFileStreamObject.on('error', function (cfsError)
	{
		var flaggedErrorMessage = streamExceptions.getFileWrite("Saved Image Config", fileResultObject.created);
		
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedErrorMessage;
		
		configFileStreamObject.end();
	});
	
	
	// Created successfully.
	configFileStreamObject.on('ready', function()
	{
		fileResultObject.created = true;
		
		// Converts image settings object to output-ready format.
		var preparedSettingsObject = imgSettingsPrep.prepareConfig(imgSetObj);
		var settingsDefinitionText = objectTasks.quickStringify(preparedSettingsObject);
		
		// Writes and saves config file.
		configFileStreamObject.write(settingsDefinitionText);
		configFileStreamObject.end();
	});
	
	
	// Write complete.
	configFileStreamObject.on('finish', function()
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


// Skip config export.
function coordinateExportSkip(modeCallback)
{
	var skipSpinner = ora("Save Config Skipped").start();
	skipSpinner.info();
	return modeCallback(null, true);
}




module.exports =
{
	performFileExport: performImageConfigFileExport,
	performFileCreate: coordinateConfigExport
};