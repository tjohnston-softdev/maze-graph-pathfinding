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


/*
	Command: grid-to-image
	Description: Takes an existing grid definition text file and converts it to an image.
	Steps:
		* Validate console input.
		* Initialize output image options.
		* Check input file exists.
		* Check output path safe.
		* Validate output image options.
		* Parse input file into grid.
		* Validate grid dimensions.
		* Convert grid tiles to binary characters.
		* Generate image file.
*/




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
		ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),							// Check input file exists.
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),										// Check output path safe.
		imageOptionsValidation.prepareOutput.bind(null, prepArgsObj, optArgsObj),						// Validate image option arguments.
		textFileRead.performGridParsing.bind(null, sInputPath, sIgnoreTextErrors)						// Parse grid from input file.
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
		initializeGrid.performGridInitialization.bind(null, rGridObject, pArgs.ignoreSafeParseErrors),			// Find start and end points on grid.
		binaryGrid.convertTiles.bind(null, rGridObject),														// Convert tiles characters to binary numbers.
		createGridImage.createFile.bind(null, pArgs, rGridObject)												// Generate output image file.
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