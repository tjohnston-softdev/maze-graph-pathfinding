const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const textFileRead = require("./parsing/text-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const resultControl = require("./output/result-control");


/*
	Command: grid-to-absolute
	Description: Converts absolute input file to grid input file.
	Steps:
		* Validate console input.
		* Check input file exists.
		* Check output path safe.
		* Parse input file into grid.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Write converted file.
*/


function runGridToAbsoluteFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readGridToAbsolute(eInputPath, eTargetPath, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		executePreperationTasks(preparedArgumentsObject);
	}
	
}



function executePreperationTasks(prepArgsObj)
{
	var sInputPath = prepArgsObj.preparedPaths.inputPath;
	var sOutputPath = prepArgsObj.preparedPaths.writePath;
	var sReplace = prepArgsObj.replaceExistingFile;
	var sIgnoreTextErrors = prepArgsObj.ignoreSafeParseErrors;
	
	asyncModule.series(
	{
		"inputExists": ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),
		"targetSafe": ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),
		"readGridObject": textFileRead.performGridParsing.bind(null, sInputPath, sIgnoreTextErrors)
	},
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			executeGridInitialization(prepArgsObj, prepRes.readGridObject);
		}
	});
}


function executeGridInitialization(pArgsObj, readGridObj)
{
	initializeGrid.performGridInitialization(readGridObj, pArgsObj.ignoreSafeParseErrors, function (gIntlError, gIntlRes)
	{
		if (gIntlError !== null)
		{
			exitProgram.callExit(gIntlError.message);
		}
		else
		{
			executeGraphTasks(pArgsObj, readGridObj, gIntlRes);
		}
	});
}


function executeGraphTasks(pArguments, readGrid, parsedGraph)
{
	asyncModule.series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),
		parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph)
	],
	function (graphError, graphResult)
	{
		if (graphError !== null)
		{
			exitProgram.callExit(graphError.message);
		}
		else
		{
			resultControl.callGridToAbsoluteOutput(pArguments.preparedPaths.writePath, parsedGraph, "Grid to Absolute Conversion");
		}
	});
}




module.exports =
{
	runFileConversion: runGridToAbsoluteFileConversion
};