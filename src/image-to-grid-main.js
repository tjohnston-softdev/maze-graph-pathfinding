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
			executeGridPreperationTasks(pArgsObj, imageTaskRes.readGridObject);
		}
	});
}


function executeGridPreperationTasks(pArguments, rGridObject)
{
	asyncModule.series(
	{
		"graphObject": initializeGrid.performGridInitialization.bind(null, rGridObject, pArguments.ignoreSafeParseErrors),
		"tilesConverted": binaryGrid.convertTiles.bind(null, rGridObject)
	},
	function (gridTaskError, gridTaskRes)
	{
		if (gridTaskError !== null)
		{
			exitProgram.callExit(gridTaskError.message);
		}
		else
		{
			resultControl.callImageToGrid(pArguments, rGridObject, gridTaskRes.graphObject, "Image to Grid Conversion");
		}
	});
}




module.exports =
{
	runFileConversion: runImageToGridFileConversion
};