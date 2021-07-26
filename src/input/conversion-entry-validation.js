const defaultValues = require("../common/sub-input/default-values");
const inputPath = require("./arguments/general/input-path");
const convWrite = require("./arguments/conversion/conv-write");
const convPathPrep = require("./arguments/conversion/conv-path-prep");
const convPathObject = require("./arguments/conversion/conv-path-object");
const saveConfig = require("./arguments/conversion/save-config");
const resolvedPath = require("./arguments/general/resolved-path");
const imageConfigPath = require("./arguments/image-options/image-config-path");
const optionalItems = require("./arguments/general/optional-items");


// Handles entry validation for the 'grid-to-absolute' command.
function readGridToAbsoluteArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.absoluteConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	return argumentReadResult;
}


// Handles entry validation for the 'absolute-to-grid' command.
function readAbsoluteToGridArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.gridConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	return argumentReadResult;
}


// Handles entry validation for the 'image-to-absolute' command.
function readImageToAbsoluteArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.absoluteConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	var imageAppendSuccessful = false;
	
	if (argumentReadResult.valid === true)
	{
		imageAppendSuccessful = coordinateImageItems(optionalArgsObj, argumentReadResult);
		argumentReadResult.valid = imageAppendSuccessful;
	}
	
	return argumentReadResult;
}


// Handles entry validation for the 'image-to-grid' command.
function readImageToGridArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.gridConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	var imageAppendSuccessful = false;
	
	if (argumentReadResult.valid === true)
	{
		imageAppendSuccessful = coordinateImageItems(optionalArgsObj, argumentReadResult);
		argumentReadResult.valid = imageAppendSuccessful;
	}
	
	return argumentReadResult;
}


// Handles entry validation for the 'absolute-to-relative' and 'grid-to-relative' commands.
function readTextToRelativeArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.relativeConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	return argumentReadResult;
}

// Handles entry validation for the 'grid-to-image' command.
function readGridToImageArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.imgConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	return argumentReadResult;
	
}


// Handles entry validation for the 'image-to-relative' commands.
function readImageToRelativeArguments(argInputPath, argWritePath, optionalArgsObj)
{
	var defaultOutput = defaultValues.relativeConversionPath;
	var argumentReadResult = coordinateMain(argInputPath, argWritePath, optionalArgsObj, defaultOutput);
	var imageAppendSuccessful = false;
	
	if (argumentReadResult.valid === true)
	{
		imageAppendSuccessful = coordinateImageItems(optionalArgsObj, argumentReadResult);
		argumentReadResult.valid = imageAppendSuccessful;
	}
	
	return argumentReadResult;
}


// Validates main arguments which are used in all conversion commands.
function coordinateMain(aInputPath, aWritePath, optionalArgs, defaultWritePath)
{
	var aReadRes = definePreparedArguments(defaultWritePath);
	
	var inputPathValid = inputPath.validateInputFilePath(aInputPath, aReadRes);
	var writePathValid = convWrite.validateWriteFilePath(aWritePath, aReadRes, defaultWritePath);
	var preparedPathsValid = false;
	var pathsDifferent = false;
	
	
	if (inputPathValid === true && writePathValid === true)
	{
		// Converts IO paths from relative to absolute.
		convPathObject.initializePaths(aReadRes.preparedPaths);
		convPathPrep.resolvePath(aReadRes, "inputFilePath", "inputPath");
		convPathPrep.resolvePath(aReadRes, "writeFilePath", "writePath");
		
		// Validates absolute IO paths.
		preparedPathsValid = resolvedPath.validatePreparedConversionPaths(aReadRes.preparedPaths);
	}
	
	
	if (preparedPathsValid === true)
	{
		// Input and Output paths cannot be the same.
		pathsDifferent = convPathPrep.validateDifferent(aReadRes);
	}
	
	
	if (pathsDifferent === true)
	{
		prepareOptionalArguments(optionalArgs, aReadRes);
		aReadRes.valid = true;
	}
	
	
	return aReadRes;
}



// Validates image conversion arguments.
function coordinateImageItems(optionalArgs, aReadRes)
{
	var loadPathValid = false;
	var savePathValid = false;
	var loadSaveResolved = false;
	
	var appendRes = false;
	
	// Adds image properties. (Including absolute paths)
	aReadRes["loadConfigPath"] = "";
	aReadRes["saveConfigPath"] = "";
	aReadRes["imageItems"] = {};
	convPathObject.appendImageConfig(aReadRes.preparedPaths);
	
	
	// Validates entered load and save config paths.
	loadPathValid = imageConfigPath.validateLoadConfigPath(optionalArgs.load, aReadRes);
	savePathValid = saveConfig.validateSavePath(optionalArgs.save, aReadRes);
	
	var appendRes = false;
	
	if (loadPathValid === true && savePathValid === true)
	{
		// Converts load and save config paths from relative to absolute.
		convPathObject.defineImageConfig(aReadRes);
		loadSaveResolved = resolvedPath.validateConvSaveLoadConfigPaths(aReadRes.preparedPaths);
	}
	
	if (loadSaveResolved === true)
	{
		appendRes = true;
	}
	
	
	return appendRes;
}



// Prepares optional toggle arguments.
function prepareOptionalArguments(optArgs, readRes)
{
	var objectPassed = optionalItems.verifyObjectPassed(optArgs);
	
	if (objectPassed === true)
	{
		optionalItems.setToggle(optArgs, "replace", readRes, "replaceExistingFile");
		optionalItems.setToggle(optArgs, "ignoreParseErrors", readRes, "ignoreSafeParseErrors");
	}
	
}


// Argument result object.
function definePreparedArguments(dWrite)
{
	var defineRes = {};
	
	defineRes["inputFilePath"] = "";
	defineRes["writeFilePath"] = dWrite;
	defineRes["replaceExistingFile"] = defaultValues.replaceExisting;
	defineRes["ignoreSafeParseErrors"] = defaultValues.ignoreErrors;
	defineRes["preparedPaths"] = {};
	defineRes["valid"] = false;
	
	return defineRes;
}




module.exports =
{
	readGridToAbsolute: readGridToAbsoluteArguments,
	readAbsoluteToGrid: readAbsoluteToGridArguments,
	readImageToAbsolute: readImageToAbsoluteArguments,
	readImageToGrid: readImageToGridArguments,
	readTextToRelative: readTextToRelativeArguments,
	readGridToImage: readGridToImageArguments,
	readImageToRelative: readImageToRelativeArguments
};