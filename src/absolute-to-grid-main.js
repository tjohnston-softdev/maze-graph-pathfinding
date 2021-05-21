const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const absoluteGridMap = require("./traverse/absolute-grid-map");
const resultControl = require("./output/res-ctrl-txt-conv");


function runAbsoluteToGridFileConversion(eInputPath, eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = conversionEntryValidation.readAbsoluteToGrid(eInputPath, eTargetPath, optionalArgumentsObject);
	
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
	{
		"integrityPassed": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
		"preparedGrid": absoluteGridMap.performMapping.bind(null, parsedGraph)
	},
	function (graphTasksErr, graphTasksRes)
	{
		if (graphTasksErr !== null)
		{
			exitProgram.callExit(graphTasksErr.message);
		}
		else
		{
			resultControl.callAbsoluteToGrid(pArguments.preparedPaths.writePath, graphTasksRes.preparedGrid, parsedGraph, "Absolute to Grid Conversion");
		}
	});
}


module.exports =
{
	performCommand: runAbsoluteToGridFileConversion
};