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
const binaryGrid = require("./parsing/binary-grid");
const resultControl = require("./output/res-ctrl-img-conv");


/*
	Command: image-to-grid
	Description: Converts image to grid input file.
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
		* Convert grid tiles to binary characters.
		* Write converted file.
		* Save config file. (Optional)
*/



function runImageToGridFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readImageToGrid(eInputPath, eTargetPath, optionalArgumentsObject);
	
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
		ioConversionExist.verifyImageConvertInputExists.bind(null, sInputPath),					// Check input file path valid.
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),								// Check output file path safe.
		ioTargetPath.verifySafe.bind(null, sSavePath, sReplace),								// Check image config save path safe.
		loadImageConfig.loadExistingFile.bind(null, sLoadPath, prepArgsObj.imageItems),			// Load existing image config file, if given.
		imageOptionsValidation.prepareOptionArguments.bind(null, prepArgsObj, optArgsObj),		// Validate image option arguments.
		imageColourValidation.convertTargetColours.bind(null, prepArgsObj.imageItems),			// Convert input hex colours to RGB.
		imageFileRead.performFileOpen.bind(null, sInputPath)									// Open input image file.
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
			executeGridPreperationTasks(pArgsObj, readGridObject);
		}
	});
}


function executeGridPreperationTasks(pArgs, rGridObject)
{
	var graphObject = null;
	
	series(
	[
		initializeGrid.performGridInitialization.bind(null, rGridObject, pArgs.ignoreSafeParseErrors),				// Find start and end points on grid.
		binaryGrid.convertTiles.bind(null, rGridObject)																// Convert tiles characters to binary numbers.
	],
	function (gridTaskError, gridTaskRes)
	{
		if (gridTaskError !== null)
		{
			exitProgram.callExit(gridTaskError.message);
		}
		else
		{
			graphObject = gridTaskRes[0];
			resultControl.callImageToGrid(pArgs, rGridObject, graphObject, "Image to Grid Conversion");
		}
	});
}


module.exports =
{
	performCommand: runImageToGridFileConversion
};