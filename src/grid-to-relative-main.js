const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const textFileRead = require("./parsing/text-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const automaticHeuristics = require("./parsing/automatic-heuristics");
const resultControl = require("./output/res-ctrl-txt-conv");



/*
	Command: grid-to-relative
	Description: Takes an existing Grid definition text file, parses it into a graph, and outputs a Relative definition text file.
	Steps:
		* Validate console input.
		* Check input file exists.
		* Check output path safe.
		* Parse input file into grid.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Calculate node heuristics.
		* Write converted file.
*/



function runGridToRelativeFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readTextToRelative(eInputPath, eTargetPath, optionalArgumentsObject);
	
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
	var readGridObject = null;
	
	
	series(
	[
		ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),				// Check input file exists.
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),							// Check output file path safe.
		textFileRead.performGridParsing.bind(null, sInputPath, sIgnoreTextErrors)			// Parse grid from input file.
	],
	function (prepTasksErr, prepTasksRes)
	{
		if (prepTasksErr !== null)
		{
			exitProgram.callExit(prepTasksErr.message);
		}
		else
		{
			readGridObject = prepTasksRes[2];
			executeGridInitialization(prepArgsObj, readGridObject);
		}
	});
}


function executeGridInitialization(pArgsObj, readGridObj)
{
	initializeGrid.performIntl(readGridObj, pArgsObj.ignoreSafeParseErrors, function (gIntlError, gIntlRes)
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


function executeGraphTasks(pArgs, readGrid, parsedGraph)
{
	series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),
		parseStructureIntegrity.performCheck.bind(null, parsedGraph),
		automaticHeuristics.performCalculation.bind(null, parsedGraph)
	],
	function (graphError)
	{
		if (graphError !== null)
		{
			exitProgram.callExit(graphError.message);
		}
		else
		{
			resultControl.callToRelative(pArgs.preparedPaths.writePath, parsedGraph, "Grid to Relative Conversion");
		}
	});
}




module.exports =
{
	performCommand: runGridToRelativeFileConversion
};