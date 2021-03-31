const clear = require("clear");
const asyncModule = require("async");
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
	
	
	asyncModule.series(
	{
		"inputExists": ioConversionExist.verifyTextConvertInputExists.bind(null, sInputPath),
		"targetSafe": ioTargetPath.verifySafe.bind(null, sOutputPath, sReplace),
		"readAbsoluteObject": textFileRead.performAbsoluteParsing.bind(null, sInputPath, sIgnoreTextErrors)
	},
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			executeGraphTasks(prepArgsObj, prepRes.readAbsoluteObject);
		}
	});
}


function executeGraphTasks(pArguments, parsedGraph)
{
	asyncModule.series(
	[
		parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
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
			resultControl.callAbsoluteGridToRelative(pArguments.preparedPaths.writePath, parsedGraph, "Absolute to Relative Conversion");
		}
	});
}




module.exports =
{
	runFileConversion: runAbsoluteToRelativeFileConversion
};