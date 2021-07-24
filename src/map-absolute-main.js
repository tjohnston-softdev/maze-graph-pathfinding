const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const txtGraphResCtrl = require("./output/res-ctrl-txt-graph");


/*
	Command: map-absolute
	Description: Creates graph from absolute input file.
	Steps:
		* Validate console input.
		* Check input file and output folder paths are safe.
		* Check template files exist.
		* Parse text file.
		* Verify graph integrity.
		* Pathfinding.
		* Prepare output folder.
		* Output graph file.
		* Output raw data. (Optional)
*/


function runAbsoluteFileMapping(eInputPath, eMappingMode, optionalArgumentsObject)
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
		mapExist.verifyTextPathsExist.bind(null, sInputFile, sOutputFolder),				// Check IO paths safe.
		templateFiles.verifyTemplateFiles.bind(null),										// Check template files safe.
		textFileRead.performAbsoluteParsing.bind(null, sInputFile, sIgnoreTextErrors)		// Parse input file.
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			parsedGraphObject = prepRes[2];
			executePathfindingTasks(prepArgsObj, parsedGraphObject);			
		}
	});
}


function executePathfindingTasks(pArgsObj, parsedGraph)
{
	var pathfindObject = null;
	
	series(
	[
		parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),						// Check graph structure valid.
		routeFind.performGraphPathfinding.bind(null, pArgsObj.mapModeFlag, parsedGraph),		// Run pathfinding algorithm.
		resultFolder.createOutputFolder.bind(null, pArgsObj.preparedPaths.outputFolder)			// Create output folder.
	],
	function (pathError, pathRes)
	{
		if (pathError !== null)
		{
			exitProgram.callExit(pathError.message);
		}
		else
		{
			pathfindObject = pathRes[1];
			executeOutputTasks(pArgsObj, parsedGraph, pathfindObject);
		}
	});
}


function executeOutputTasks(pArgs, pGraph, pPathResult)
{
	txtGraphResCtrl.callOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pPathResult, "Absolute Text File");
}



module.exports =
{
	performCommand: runAbsoluteFileMapping
};