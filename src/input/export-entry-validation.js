const defaultValues = require("../common/sub-input/default-values");
const inputPath = require("./arguments/general/input-path");
const pathfindingMode = require("./arguments/general/pathfinding-mode");
const outputFolder = require("./arguments/general/output-folder");
const optionalItems = require("./arguments/general/optional-items");
const testExportFlags = require("./arguments/general/test-export-flags");
const graphFilePaths = require("./arguments/general/graph-file-paths");
const resolvedPath = require("./arguments/general/resolved-path");


// Handles entry validation for the 'test-export' command.
function readTestExportArguments(argMapMode, optionalArgs)
{
	var argumentReadResult = definePreparedArguments();
	var mapModeValid = pathfindingMode.validatePathfindingMode(argMapMode, argumentReadResult);
	var optionalArgumentsValid = prepareOptionalArguments(optionalArgs, argumentReadResult);
	
	var outputFolderResolved = false;
	var exportModesValid = false;
	var exportPathsResolved = false;
	
	if (mapModeValid === true && optionalArgumentsValid === true)
	{
		// Converts output folder from relative to absolute.
		graphFilePaths.initializeProperties(argumentReadResult.preparedPaths);
		graphFilePaths.prepareTestExportEntry(argumentReadResult);
		outputFolderResolved = resolvedPath.validateTestExportPath(argumentReadResult.preparedPaths.outputFolder);
	}
	
	
	if (outputFolderResolved === true)
	{
		// Validates export mode toggles (At least one must be enabled)
		exportModesValid = testExportFlags.validateTestExportFlags(argumentReadResult);
	}
	
	
	if (exportModesValid === true)
	{
		// Prepares file output paths.
		exportPathsResolved = prepareExportPathArguments(argumentReadResult);
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
		// Read and validate entry.
		outputFolderValid = outputFolder.validateOutputFolderPath(optArgs.outputFolder, readRes);
		optionalItems.setToggle(optArgs, "graph", readRes, "exportGraphData");
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


// Prepares individual output file paths.
function prepareExportPathArguments(readRes)
{
	var gData = readRes.exportGraphData;
	var rData = readRes.exportRawData;
	var exportPathRes = false;
	
	// Writes and validates file paths.
	graphFilePaths.prepareDestPaths(readRes.preparedPaths, gData, rData);
	exportPathRes = resolvedPath.validateMapExportPaths(readRes.preparedPaths);
	
	return exportPathRes;
}


// Argument result object.
function definePreparedArguments()
{
	var defineRes = {};
	
	defineRes["mapModeFlag"] = -1;
	defineRes["outputFolderPath"] = defaultValues.outputFolderPath;
	defineRes["exportGraphData"] = defaultValues.exportTestGraphData;
	defineRes["exportRawData"] = defaultValues.exportRawData;
	defineRes["preparedPaths"] = {};
	defineRes["valid"] = false;
	
	return defineRes;
}






module.exports =
{
	readArguments: readTestExportArguments
};