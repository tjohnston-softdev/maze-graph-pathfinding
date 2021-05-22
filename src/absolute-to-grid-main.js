const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const conversionEntryValidation = require("./input/conversion-entry-validation");
const ioConversionExist = require("./io-paths/conversion-exist");
const ioTargetPath = require("./io-paths/target-path");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const absoluteGridMap = require("./traverse/absolute-grid-map");
const binaryGrid = require("./parsing/binary-grid");
const resultControl = require("./output/res-ctrl-txt-conv");


/*
	Command: absolute-to-grid
	Description: Takes an existing Absolute definition text file, parses it into a graph, and outputs a Grid definition text file.
	Steps:
		* Validate console input.
		* Check input file exists.
		* Check output path safe.
		* Parse input file into graph.
		* Verify graph integrity.
		* Parse graph definition into tile grid.
		* Convert grid tiles to binary characters.
		* Write converted file.
*/



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


function executeGraphTasks(pArguments, parsedGraphObj)
{
	asyncModule.series(
	{
		"integrityPassed": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraphObj),
		"preparedGrid": absoluteGridMap.performMapping.bind(null, parsedGraphObj)
	},
	function (graphTasksErr, graphTasksRes)
	{
		if (graphTasksErr !== null)
		{
			exitProgram.callExit(graphTasksErr.message);
		}
		else
		{
			executeTileConversion(pArguments, parsedGraphObj, graphTasksRes.preparedGrid);
		}
	});
}


function executeTileConversion(pArgs, parsedGraph, prepGrid)
{
	binaryGrid.convertTiles(prepGrid, function (tileConvErr, tileConvRes)
	{
		if (tileConvErr !== null)
		{
			exitProgram.callExit(tileConvErr.message);
		}
		else
		{
			resultControl.callAbsoluteToGrid(pArgs.preparedPaths.writePath, prepGrid, parsedGraph, "Absolute to Grid Conversion");
		}
	});
}


module.exports =
{
	performCommand: runAbsoluteToGridFileConversion
};