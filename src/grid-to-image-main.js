const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const imageEntryValidation = require("./input/image-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const imageOptionsValidation = require("./input/image-options-validation");
const imageColourValidation = require("./input/image-colour-validation");
const textFileRead = require("./parsing/text-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const binaryGrid = require("./parsing/binary-grid");
const createGridImage = require("./output/create-grid-image");


function runGridToImageFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readGridToImage(eInputPath, eTargetPath, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		preparedArgumentsObject["imageItems"] = {};
		imageEntryValidation.initializeImageItems(preparedArgumentsObject);
		executePreperationTasks(preparedArgumentsObject, optionalArgumentsObject);
	}
}


function executePreperationTasks(prepArgsObj, optArgsObj)
{
	var sInputPath = prepArgsObj.preparedPaths.inputPath;
	var sOutputPath = prepArgsObj.preparedPaths.writePath;
	var sReplace = prepArgsObj.replaceExistingFile;
	var sIgnoreTextErrors = prepArgsObj.ignoreSafeParseErrors;
	
	var readGridObject = null;
	
	series(
	[
		ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),
		imageOptionsValidation.prepareOutputArguments.bind(null, prepArgsObj, optArgsObj),
		textFileRead.performGridParsing.bind(null, sInputPath, sIgnoreTextErrors)
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			readGridObject = prepRes[3];
			executeConversionTasks(prepArgsObj, readGridObject);
			
		}
	});
}


function executeConversionTasks(pArgs, rGridObject)
{
	series(
	[
		initializeGrid.performGridInitialization.bind(null, rGridObject, pArgs.ignoreSafeParseErrors),
		binaryGrid.convertTiles.bind(null, rGridObject),
		createGridImage.createFile.bind(null, pArgs, rGridObject)
	],
	function (convTaskError, convTaskRes)
	{
		if (convTaskError !== null)
		{
			exitProgram.callExit(convTaskError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}



module.exports =
{
	performCommand: runGridToImageFileConversion
};