const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const imageEntryValidation = require("./input/image-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const loadImageConfig = require("./input/load-image-config");
const imageOptionsValidation = require("./input/image-options-validation");
const imageColourValidation = require("./input/image-colour-validation");
const imageFileRead = require("./parsing/image-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const resultControl = require("./output/result-control");


/*
	Command: image-to-absolute
	Description: Converts image to absolute input file.
	Steps:
		* Validate console input.
		* Check input file exists.
		* Check conversion output path safe.
		* Check config save path safe.
		* Load config file. (Optional)
		* Validate image options.
		* Prepare image colours.
		* Open image file.
		* Validate image dimensions.
		* Parse image into tile grid.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Write converted file.
		* Save config file. (Optional)
*/



function runImageToAbsoluteFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readImageToAbsolute(eInputPath, eTargetPath, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		imageEntryValidation.initializeImageItems(preparedArgumentsObject);
		executePreperationTasks(preparedArgumentsObject, optionalArgumentsObject);
	}
	
}


function executePreperationTasks(prepArgsObj, optArgsObj)
{
	var sInputPath = prepArgsObj.preparedPaths.inputPath;
	var sOutputPath = prepArgsObj.preparedPaths.writePath;
	var sLoadPath = prepArgsObj.preparedPaths.loadConfig;
	var sSavePath = prepArgsObj.preparedPaths.saveConfig;
	var sReplace = prepArgsObj.replaceExistingFile;
	
	asyncModule.series(
	{
		"inputFileExists": ioConversionExist.verifyImageConvertInputExists.bind(null, sInputPath),
		"targetPathSafe": ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),
		"savePathSafe": ioTargetPath.verifySafe.bind(null, sSavePath, sReplace),
		"loadSuccessful": loadImageConfig.loadExistingFile.bind(null, sLoadPath, prepArgsObj.imageItems),
		"imageOptionsValid": imageOptionsValidation.prepareOptionArguments.bind(null, prepArgsObj, optArgsObj),
		"preparedColours": imageColourValidation.convertTargetColours.bind(null, prepArgsObj.imageItems),
		"targetImageFile": imageFileRead.performFileOpen.bind(null, sInputPath)
	},
	function (prepTaskError, prepTaskRes)
	{
		if (prepTaskError !== null)
		{
			exitProgram.callExit(prepTaskError.message);
		}
		else
		{
			executeImageReadTasks(prepArgsObj, prepTaskRes.preparedColours, prepTaskRes.targetImageFile);
		}
	});
}



function executeImageReadTasks(pArgsObj, targetColoursObj, targetImageObj)
{
	var sIgnoreErrors = pArgsObj.ignoreSafeParseErrors;
	
	asyncModule.series(
	{
		"dimensionsValid": imageFileRead.performDimensionsRead.bind(null, targetImageObj, pArgsObj.imageItems),
		"readGridObject": imageFileRead.performContentsParse.bind(null, targetImageObj, targetColoursObj, pArgsObj.imageItems, sIgnoreErrors)
	},
	function (imageTaskError, imageTaskRes)
	{
		if (imageTaskError !== null)
		{
			exitProgram.callExit(imageTaskError.message);
		}
		else
		{
			executeGridInitialization(pArgsObj, imageTaskRes.readGridObject);
		}
	});
}



function executeGridInitialization(pArguments, readGridObject)
{
	initializeGrid.performGridInitialization(readGridObject, pArguments.ignoreSafeParseErrors, function (intlGridError, intlGridRes)
	{
		if (intlGridError !== null)
		{
			exitProgram.callExit(intlGridError.message);
		}
		else
		{
			executeGraphTasks(pArguments, readGridObject, intlGridRes);
		}
	});
}


function executeGraphTasks(pArgs, readGrid, parsedGraph)
{
	asyncModule.series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),
		parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph)
	],
	function (graphTasksError, graphTasksRes)
	{
		if (graphTasksError !== null)
		{
			exitProgram.callExit(graphTasksError.message);
		}
		else
		{
			resultControl.callImageToAbsoluteOutput(pArgs, parsedGraph, "Image to Absolute Conversion");
		}
	});
}



module.exports =
{
	runFileConversion: runImageToAbsoluteFileConversion
};