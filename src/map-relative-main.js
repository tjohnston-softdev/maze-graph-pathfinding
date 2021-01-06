const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const manualHeuristics = require("./parsing/manual-heuristics");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const resultControl = require("./output/result-control");


/*
	Command: map-relative
	Description: Creates graph from relative input file.
	Steps:
		* Validate console input.
		* Check input file and output folder paths are safe.
		* Check template files exist.
		* Parse text file.
		* Verify graph integrity.
		* Validate entered heuristics.
		* Pathfinding.
		* Prepare output folder.
		* Output graph file.
		* Output raw data. (Optional)
*/


function runRelativeFileMapping(eInputPath, eMappingMode, optionalArgumentsObject)
{
	var preparedArgumentsObject = textEntryValidation.readArguments(eInputPath, eMappingMode, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		executePreperationTasks(preparedArgumentsObject);
	}
}

function executePreperationTasks(prepArgsObj)
{
	var sInputFile = prepArgsObj.preparedPaths.inputFile;
	var sOutputFolder = prepArgsObj.preparedPaths.outputFolder;
	var sIgnoreTextErrors = prepArgsObj.ignoreTextErrors;
	
	asyncModule.series(
	{
		"mapPathsExist": mapExist.verifyTextPathsExist.bind(null, sInputFile, sOutputFolder),
		"templatesSafe": templateFiles.verifyTemplateFiles.bind(null),
		"parsedGraphObject": textFileRead.performRelativeParsing.bind(null, sInputFile, sIgnoreTextErrors)
	},
	function (prepTaskErr, prepTaskRes)
	{
		if (prepTaskErr !== null)
		{
			exitProgram.callExit(prepTaskErr.message);
		}
		else
		{
			executeGraphStructureTasks(prepArgsObj, prepTaskRes.parsedGraphObject);
		}
	});
	
}



function executeGraphStructureTasks(pArgsObj, parsedGraph)
{
	asyncModule.series(
	{
		"structureValid": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
		"heuristicsValid": manualHeuristics.performManualHeuristicCheck.bind(null, parsedGraph, pArgsObj.mapModeFlag)
	},
	function (structureError, structureRes)
	{
		if (structureError !== null)
		{
			exitProgram.callExit(structureError.message);
		}
		else
		{
			executePathfindingTasks(pArgsObj, parsedGraph, structureRes.heuristicsValid);
		}
	});
}


function executePathfindingTasks(pArgs, pGraph, heurValid)
{
	
	asyncModule.series(
	{
		"pathfindObject": routeFind.performRelativePathfinding.bind(null, pArgs.mapModeFlag, pGraph, heurValid),
		"folderPrepared": resultFolder.createOutputFolder.bind(null, pArgs.preparedPaths.outputFolder)
	},
	function (pathError, pathRes)
	{
		if (pathError !== null)
		{
			exitProgram.callExit(pathError.message);
		}
		else
		{
			resultControl.callTextGraphOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pathRes.pathfindObject, "Relative");
		}
	});
}





module.exports =
{
	runRelativeMapping: runRelativeFileMapping
};