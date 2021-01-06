const defaultValues = require("../common/sub-input/default-values");
const inputPath = require("./arguments/general/input-path");
const pathfindingMode = require("./arguments/general/pathfinding-mode");
const outputFolder = require("./arguments/general/output-folder");
const imageConfigPath = require("./arguments/image-options/image-config-path");
const imageConfigName = require("./arguments/image-options/image-config-name");
const graphFilePaths = require("./arguments/general/graph-file-paths");
const resolvedPath = require("./arguments/general/resolved-path");
const optionalItems = require("./arguments/general/optional-items");


// Handles input validation for the 'map-image' command.
function readImageMappingArguments(argInputPath, argMapMode, optionalArgs)
{
	var argumentReadResult = definePreparedArguments();
	
	var inputPathValid = inputPath.validateInputFilePath(argInputPath, argumentReadResult);
	var mapModeValid = pathfindingMode.validatePathfindingMode(argMapMode, argumentReadResult);
	var optionalArgumentsValid = prepareOptionalArguments(optionalArgs, argumentReadResult);
	
	var ioPathsResolved = false;
	var exportPathsResolved = false;
	var saveLoadResolved = false;
	
	
	if (inputPathValid === true && mapModeValid === true && optionalArgumentsValid === true)
	{
		// Converts IO paths from relative to absolute.
		graphFilePaths.initializeProperties(argumentReadResult.preparedPaths);
		graphFilePaths.prepareMapEntry(argumentReadResult);
		ioPathsResolved = resolvedPath.validateMapIoPaths(argumentReadResult.preparedPaths);
	}
	
	if (ioPathsResolved === true)
	{
		// Prepares individual file paths.
		graphFilePaths.prepareDestPaths(argumentReadResult.preparedPaths, true, argumentReadResult.exportRawData);
		graphFilePaths.appendImageConfigSaveLoad(argumentReadResult);
		exportPathsResolved = resolvedPath.validateMapExportPaths(argumentReadResult.preparedPaths);
		saveLoadResolved = resolvedPath.validateMapImageSaveLoadPaths(argumentReadResult.preparedPaths);
	}
	
	if (exportPathsResolved === true && saveLoadResolved === true)
	{
		argumentReadResult.readSuccessfully = true;
	}
	
	
	
	return argumentReadResult;
}


// Initializes image options with default values.
function initializeImageItemArguments(fullArgumentsObject)
{
	fullArgumentsObject.imageItems["wallColour"] = defaultValues.wallColour;
	fullArgumentsObject.imageItems["floorColour"] = defaultValues.floorColour;
	fullArgumentsObject.imageItems["tolerancePercent"] = defaultValues.tolerancePercent;
	fullArgumentsObject.imageItems["tileSize"] = defaultValues.tileSize;
	fullArgumentsObject.imageItems["originX"] = defaultValues.originCoordinates;
	fullArgumentsObject.imageItems["originY"] = defaultValues.originCoordinates;
}




// Used to validate image config arguments and prepare toggle options.
function prepareOptionalArguments(optArgs, readRes)
{
	var objectPassed = optionalItems.verifyObjectPassed(optArgs);
	
	var outputFolderValid = false;
	var loadPathValid = false;
	var saveNameValid = false;
	var toggleValid = false;
	
	var optionalRes = false;
	
	if (objectPassed === true)
	{
		// Read and validate entry.
		outputFolderValid = outputFolder.validateOutputFolderPath(optArgs.outputFolder, readRes);
		loadPathValid = imageConfigPath.validateLoadConfigPath(optArgs.load, readRes);
		saveNameValid = imageConfigName.validateSaveConfigName(optArgs.save, readRes);
		
		optionalItems.setToggle(optArgs, "ignoreParseErrors", readRes, "ignoreImageParseErrors");
		optionalItems.setToggle(optArgs, "raw", readRes, "exportRawData");
		
		toggleValid = true;
		
	}
	else
	{
		// Use default
		outputFolderValid = true;
		loadPathValid = true;
		saveNameValid = true;
		toggleValid = true;
	}
	
	
	if (outputFolderValid === true && loadPathValid === true && saveNameValid === true && toggleValid === true)
	{
		optionalRes = true;
	}
	
	return optionalRes;
}



// Argument result object.
function definePreparedArguments()
{
	var defineRes = {};
	
	defineRes["inputFilePath"] = "";
	defineRes["mapModeFlag"] = -1;
	defineRes["outputFolderPath"] = defaultValues.outputFolderPath;
	defineRes["loadConfigPath"] = "";
	defineRes["saveConfigName"] = "";
	defineRes["ignoreImageParseErrors"] = defaultValues.ignoreErrors;
	defineRes["exportRawData"] = defaultValues.exportRawData;
	defineRes["preparedPaths"] = {};
	defineRes["imageItems"] = {};
	defineRes["readSuccessfully"] = false;
	
	return defineRes;
}




module.exports =
{
	readArguments: readImageMappingArguments,
	initializeImageItems: initializeImageItemArguments
};