const defaultValues = require("../common/sub-input/default-values");
const inputPath = require("./arguments/general/input-path");
const pathfindingMode = require("./arguments/general/pathfinding-mode");
const outputFolder = require("./arguments/general/output-folder");
const graphFilePaths = require("./arguments/general/graph-file-paths");
const resolvedPath = require("./arguments/general/resolved-path");
const optionalItems = require("./arguments/general/optional-items");


// Handles input validation for the 'map' commands.
function readTextEntryArguments(argInputPath, argMapMode, optionalArgs)
{
	var argumentReadResult = definePreparedArguments();
	
	var inputPathValid = inputPath.validateInputFilePath(argInputPath, argumentReadResult);
	var mapModeValid = pathfindingMode.validatePathfindingMode(argMapMode, argumentReadResult);
	var optionalArgumentsValid = prepareOptionalArguments(optionalArgs, argumentReadResult);
	
	var ioPathsResolved = false;
	var exportPathsResolved = false;
	
	
	if (inputPathValid === true && mapModeValid === true && optionalArgumentsValid === true)
	{
		// Converts IO paths from relative to absolute.
		graphFilePaths.initializeProperties(argumentReadResult.preparedPaths);
		graphFilePaths.prepareMapEntry(argumentReadResult);
		ioPathsResolved = resolvedPath.validateMapIoPaths(argumentReadResult.preparedPaths);
	}
	
	if (ioPathsResolved === true)
	{
		// Prepares file output paths.
		graphFilePaths.prepareDestPaths(argumentReadResult.preparedPaths, true, argumentReadResult.exportRawData);
		exportPathsResolved = resolvedPath.validateMapExportPaths(argumentReadResult.preparedPaths);
	}
	
	if (exportPathsResolved === true)
	{
		argumentReadResult.valid = true;
	}
	
	
	return argumentReadResult;
}


// Validates output folder and prepares toggle options.
function prepareOptionalArguments(optArgs, readRes)
{
	var objectPassed = optionalItems.verifyObjectPassed(optArgs);
	var outputFolderValid = false;
	var toggleValid = false;
	
	var optionalRes = false;
	
	if (objectPassed === true)
	{
		// Read and validate.
		outputFolderValid = outputFolder.validateOutputFolderPath(optArgs.outputFolder, readRes);
		
		optionalItems.setToggle(optArgs, "ignoreParseErrors", readRes, "ignoreTextErrors");
		optionalItems.setToggle(optArgs, "raw", readRes, "exportRawData");
		
		toggleValid = true;
	}
	else
	{
		// Use default.
		outputFolderValid = true;
		toggleValid = true;
	}
	
	
	if (outputFolderValid === true && toggleValid === true)
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
	defineRes["ignoreTextErrors"] = defaultValues.ignoreErrors;
	defineRes["exportRawData"] = defaultValues.exportRawData;
	defineRes["preparedPaths"] = {};
	defineRes["valid"] = false;
	
	return defineRes;
}




module.exports =
{
	readArguments: readTextEntryArguments
};