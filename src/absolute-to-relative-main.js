const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const automaticHeuristics = require("./parsing/automatic-heuristics");
const resultControl = require("./output/res-ctrl-txt-conv");


/*
	Command: absolute-to-relative
	Description: Takes an existing Absolute definition text file, parses it into a graph, and outputs a Relative definition text file.
	Steps:
		* Validate console input.
		* Check input file exists.
		* Check output path safe.
		* Parse input file into graph.
		* Verify graph integrity.
		* Calculate node heuristics.
		* Write converted file.
*/



function runAbsoluteToRelativeFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
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
	var readAbsoluteObject = null;
	
	
	series(
	[
		ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),					// Check input file exists.
		ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),								// Check target file path safe.
		textFileRead.performAbsoluteParsing.bind(null, sInputPath, sIgnoreTextErrors)			// Parse graph from absolute text file.
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			readAbsoluteObject = prepRes[2];
			executeGraphTasks(prepArgsObj, readAbsoluteObject);
		}
	});
}


function executeGraphTasks(pArguments, parsedGraph)
{
	series(
	[
		parseStructureIntegrity.performCheck.bind(null, parsedGraph),
		automaticHeuristics.performCalculation.bind(null, parsedGraph)
	],
	function (graphTasksErr, graphTasksRes)
	{
		if (graphTasksErr !== null)
		{
			exitProgram.callExit(graphTasksErr.message);
		}
		else
		{
			resultControl.callToRelative(pArguments.preparedPaths.writePath, parsedGraph, "Absolute to Relative Conversion");
		}
	});
}




module.exports =
{
	performCommand: runAbsoluteToRelativeFileConversion
};