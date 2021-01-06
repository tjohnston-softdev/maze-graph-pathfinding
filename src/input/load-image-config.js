const asyncModule = require("async");
const ora = require("ora");
const fsFileSize = require("../common/sub-files/fs-file-size");
const sizeLimits = require("../common/sub-files/size-limits");
const valuePrep = require("../common/value-prep");
const configFile = require("./image-components/config-file");
const configHelp = require("./image-components/config-help");


// Loads existing image config file if needed.
function loadExistingConfigFile(fullLoadPathString, imagePropertiesObject, loadConfigCallback)
{
	var loadRequired = configHelp.decideLoadRequired(fullLoadPathString);
	
	if (loadRequired === true)
	{
		coordinateConfigLoad(fullLoadPathString, imagePropertiesObject, loadConfigCallback);
	}
	else
	{
		coordinateConfigSkip(loadConfigCallback);
	}
	
}


// Image config load is required.
function coordinateConfigLoad(fullLoadPthStr, imgPropsObj, modeCallback)
{
	var loadSpinner = ora("Loading Image Config File").start();
	
	callFileRead(fullLoadPthStr, imgPropsObj, function(overallLoadError, overallLoadRes)
	{
		if (overallLoadError !== null)
		{
			loadSpinner.fail("Error Loading Image Config File");
			return modeCallback(overallLoadError, null);
		}
		else
		{
			loadSpinner.succeed("Config File Loaded");
			return modeCallback(null, true);
		}
	});
	
	
}


// Skip config load.
function coordinateConfigSkip(modeCallback)
{
	var skipSpinner = ora("Load Config Skipped").start();
	skipSpinner.info();
	return modeCallback(null, true);
}



// Retrieves config file contents.
function callFileRead(loadPthStr, imgProps, fileReadCallback)
{
	asyncModule.series(
	{
		"configFileExists": fsFileSize.checkFileSize.bind(null, loadPthStr, "Image Config", sizeLimits.maxImageConfigSize, false),
		"configFileData": configFile.readConfig.bind(null, loadPthStr)
	},
	function (cReadErr, cReadRes)
	{
		if (cReadErr !== null)
		{
			// Error loading config file.
			return fileReadCallback(cReadErr, null);
		}
		else
		{
			// File read successfully. Parse contents.
			callFileParse(imgProps, cReadRes.configFileData, fileReadCallback);
		}
	});
}



// Parses existing image config file.
function callFileParse(pImageItems, configDefinition, fileParseCallback)
{
	// Read file contents as JSON object.
	configFile.parseConfig(configDefinition, function (cParseErr, cParseRes)
	{
		if (cParseErr !== null)
		{
			// Error parsing config.
			return fileParseCallback(cParseErr, null);
		}
		else
		{
			// Read saved settings into memory. Load successful.
			configHelp.applyExternalProperties(pImageItems, cParseRes);
			return fileParseCallback(null, true);
		}
	});
}




module.exports =
{
	loadExistingFile: loadExistingConfigFile,
	loadRequiredFile: coordinateConfigLoad
};