const clear = require("clear");
const series = require("run-series");
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
const resultControl = require("./output/res-ctrl-img-conv");


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
	
	var preparedColours = null;
	var targetImageFile = null;
	
	series(
	[
		ioConversionExist.verifyImageConvertInputExists.bind(null, sInputPath),							// Check input image file exists.
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),										// Check target output file path safe.
		ioTargetPath.verifySafe.bind(null, sSavePath, sReplace),										// Check image config save path safe.
		loadImageConfig.loadExistingFile.bind(null, sLoadPath, prepArgsObj.imageItems),					// Load existing image config file, if given.
		imageOptionsValidation.prepareGeneral.bind(null, prepArgsObj, optArgsObj),				// Validate image option arguments.
		imageColourValidation.convertColours.bind(null, prepArgsObj.imageItems),					// Convert input hex colours to RGB.
		imageFileRead.performFileOpen.bind(null, sInputPath)											// Open input image file.
	],
	function (prepTaskError, prepTaskRes)
	{
		if (prepTaskError !== null)
		{
			exitProgram.callExit(prepTaskError.message);
		}
		else
		{
			preparedColours = prepTaskRes[5];
			targetImageFile = prepTaskRes[6];
			executeImageReadTasks(prepArgsObj, preparedColours, targetImageFile);
		}
	});
}



function executeImageReadTasks(pArgsObj, tgtColsObj, tgtImgObj)
{
	var sIgnore = pArgsObj.ignoreSafeParseErrors;
	var readGridObject = null;
	
	series(
	[
		imageFileRead.performDimensionsRead.bind(null, tgtImgObj, pArgsObj.imageItems),							// Validate image dimensions.
		imageFileRead.performContentsParse.bind(null, tgtImgObj, tgtColsObj, pArgsObj.imageItems, sIgnore)		// Parse grid from input image.
	],
	function (imageTaskError, imageTaskRes)
	{
		if (imageTaskError !== null)
		{
			exitProgram.callExit(imageTaskError.message);
		}
		else
		{
			readGridObject = imageTaskRes[1];
			executeGridInitialization(pArgsObj, readGridObject);
		}
	});
}



function executeGridInitialization(pArguments, readGridObject)
{
	initializeGrid.performIntl(readGridObject, pArguments.ignoreSafeParseErrors, function (intlGridError, intlGridRes)
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
	series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),			// Traverse grid for graph nodes.
		parseStructureIntegrity.performCheck.bind(null, parsedGraph)			// Validate graph object structure.
	],
	function (graphTasksError)
	{
		if (graphTasksError !== null)
		{
			exitProgram.callExit(graphTasksError.message);
		}
		else
		{
			resultControl.callImageToAbsolute(pArgs, parsedGraph, "Image to Absolute Conversion");
		}
	});
}



module.exports =
{
	performCommand: runImageToAbsoluteFileConversion
};