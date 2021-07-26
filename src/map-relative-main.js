const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const manualHeuristics = require("./parsing/manual-heuristics");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const txtGraphResCtrl = require("./output/res-ctrl-txt-graph");


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
	var parsedGraphObject = null;
	
	series(
	[
		mapExist.verifyTextPathsExist.bind(null, sInputFile, sOutputFolder),				// Check target paths exist.
		templateFiles.verifyTemplateFiles.bind(null),										// Check template files safe.
		textFileRead.performRelativeParsing.bind(null, sInputFile, sIgnoreTextErrors)		// Parse input text file.
	],
	function (prepTaskErr, prepTaskRes)
	{
		if (prepTaskErr !== null)
		{
			exitProgram.callExit(prepTaskErr.message);
		}
		else
		{
			parsedGraphObject = prepTaskRes[2];
			executeGraphStructureTasks(prepArgsObj, parsedGraphObject);
		}
	});
	
}



function executeGraphStructureTasks(pArgsObj, parsedGraph)
{
	var heuristicsValid = false;
	
	series(
	[
		parseStructureIntegrity.performCheck.bind(null, parsedGraph),									// Check graph structure.
		manualHeuristics.performCheck.bind(null, parsedGraph, pArgsObj.mapModeFlag)							// Check heuristics valid.
	],
	function (structureError, structureRes)
	{
		if (structureError !== null)
		{
			exitProgram.callExit(structureError.message);
		}
		else
		{
			heuristicsValid = structureRes[1];
			executePathfindingTasks(pArgsObj, parsedGraph, heuristicsValid);
		}
	});
}


function executePathfindingTasks(pArgs, pGraph, heurValid)
{	
	var pathfindObject = null;
	
	series(
	[
		routeFind.performRelativePathfinding.bind(null, pArgs.mapModeFlag, pGraph, heurValid),				// Run pathfinding algorithm.
		resultFolder.createOutputFolder.bind(null, pArgs.preparedPaths.outputFolder)						// Prepare output folder.
	],
	function (pathError, pathRes)
	{
		if (pathError !== null)
		{
			exitProgram.callExit(pathError.message);
		}
		else
		{
			pathfindObject = pathRes[0];
			txtGraphResCtrl.callOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pathfindObject, "Relative");
		}
	});
}


module.exports =
{
	performCommand: runRelativeFileMapping
};