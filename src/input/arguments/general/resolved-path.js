const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Map input file and output folder.
function validateMapIoPathStrings(pObject)
{
	var inputSuccessful = handleRequired(pObject.inputFile, "Input file path");
	var outputSuccessful = handleRequired(pObject.outputFolder, "Output folder path");
	
	var validationResult = false;
	
	if (inputSuccessful === true && outputSuccessful === true)
	{
		validationResult = true;
	}
	
	return validationResult;
}


// Map export files.
function validateMapExportPathStrings(pObject)
{
	var graphSuccessful = handleRequired(pObject.mainGraphFile, "Graph export file path");
	var rawNodesSuccessful = true;
	var rawEdgesSuccessful = true;
	var rawSequenceSuccessful = true;
	
	var validationResult = false;
	
	if (pObject.rawPathsDefined === true)
	{
		rawNodesSuccessful = handleRequired(pObject.rawNodesFile, "Raw node data file path");
		rawEdgesSuccessful = handleRequired(pObject.rawEdgesFile, "Raw edge data file path");
		rawSequenceSuccessful = handleRequired(pObject.rawSequenceFile, "Raw sequence data file path");
	}
	
	
	if (graphSuccessful === true && rawNodesSuccessful === true && rawEdgesSuccessful === true && rawSequenceSuccessful === true)
	{
		validationResult = true;
	}
	
	return validationResult;
}


// Image config save and load for 'map-image'
function validateMapImageSaveLoadPathStrings(pObject)
{
	var loadValid = handleOptional(pObject.imageConfigLoadFile, "Load config file path");
	var saveValid = handleOptional(pObject.imageConfigSaveFile, "Save config file path");
	
	var validationResult = false;
	
	if (loadValid === true && saveValid === true)
	{
		validationResult = true;
	}
	
	return validationResult;
}


// Create image config.
function validateCreateImageConfigPathString(tFile)
{
	var validationResult = handleRequired(tFile, "Target file path");
	return validationResult;
}


// Read image config
function validateReadImageConfigPathString(rFile)
{
	var validationResult = handleRequired(rFile, "Input file path");
	return validationResult;
}



// Test export
function validateTestExportPathString(tFolder)
{
	var validationResult = handleRequired(tFolder, "Output folder path");
	return validationResult;
}



// Conversion input and output files.
function validatePreparedConversionPathStrings(pObject)
{
	var inpSuccessful = handleRequired(pObject.inputPath, "Input path");
	var writeSuccessful = handleRequired(pObject.writePath, "Output path");
	
	var validationResult = false;
	
	if (inpSuccessful === true && writeSuccessful === true)
	{
		validationResult = true;
	}
	
	return validationResult;
}

// Conversion image config save and load.
function validateConvSaveLoadConfigPathStrings(pObject)
{
	var loadValid = handleOptional(pObject.loadConfig, "Load config file path");
	var saveValid = handleOptional(pObject.saveConfig, "Save config file path");
	
	var validationResult = false;
	
	if (loadValid === true && saveValid === true)
	{
		validationResult = true;
	}
	
	return validationResult;
}





// Validates absolute path - Required
function handleRequired(fileStr, fileDesc)
{
	var stringTypeUsed = valuePrep.checkStringType(fileStr);
	
	var handleRes = false;
	var invalidMessage = "";
	
	if (stringTypeUsed === true && fileStr.length > 0 && fileStr.length <= valueLimits.maxPathLength)
	{
		// Absolute path valid
		handleRes = true;
	}
	else if (stringTypeUsed === true && fileStr.length > valueLimits.maxPathLength)
	{
		// Path too long.
		handleRes = false;
		invalidMessage = errorText.writeStringTooLong(fileDesc, valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else if (stringTypeUsed === true)
	{
		// Path missing.
		handleRes = false;
		invalidMessage = errorText.writeMissing(fileDesc);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		// Path resolve error.
		handleRes = false;
		invalidMessage = errorText.writePathResolve(fileDesc);
		exitProgram.callExit(invalidMessage);
	}
	
	return handleRes;
}



// Validates absolute path - Optional
function handleOptional(fileStr, fileDesc)
{
	var stringTypeUsed = valuePrep.checkStringType(fileStr);
	
	var handleRes = false;
	var invalidMessage = "";
	
	if (stringTypeUsed === true && fileStr.length >= 0 && fileStr.length <= valueLimits.maxPathLength)
	{
		// Absolute path valid.
		handleRes = true;
	}
	else if (stringTypeUsed === true && fileStr.length > valueLimits.maxPathLength)
	{
		// Path too long.
		handleRes = false;
		invalidMessage = errorText.writeStringTooLong(fileDesc, valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		// Path not included.
		handleRes = true;
	}
	
	return handleRes;
}




module.exports =
{
	validateMapIoPaths: validateMapIoPathStrings,
	validateMapExportPaths: validateMapExportPathStrings,
	validateMapImageSaveLoadPaths: validateMapImageSaveLoadPathStrings,
	validateCreateImageConfigPath: validateCreateImageConfigPathString,
	validateReadImageConfigPath: validateReadImageConfigPathString,
	validateTestExportPath: validateTestExportPathString,
	validatePreparedConversionPaths: validatePreparedConversionPathStrings,
	validateConvSaveLoadConfigPaths: validateConvSaveLoadConfigPathStrings
};