const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const resultControl = require("./output/result-control");


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
	
	asyncModule.series(
	{
		"ioPathsSafe": mapExist.verifyTextPathsExist.bind(null, sInputFile, sOutputFolder),
		"templateSafe": templateFiles.verifyTemplateFiles.bind(null),
		"parsedGraphObject": textFileRead.performAbsoluteParsing.bind(null, sInputFile, sIgnoreTextErrors)
	},
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			executePathfindingTasks(prepArgsObj, prepRes.parsedGraphObject);			
		}
	});
}


function executePathfindingTasks(pArgsObj, parsedGraph)
{
	
	asyncModule.series(
	{
		"validStructure": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
		"pathfindObject": routeFind.performGraphPathfinding.bind(null, pArgsObj.mapModeFlag, parsedGraph),
		"folderPrepared": resultFolder.createOutputFolder.bind(null, pArgsObj.preparedPaths.outputFolder)
	},
	function (pathError, pathRes)
	{
		if (pathError !== null)
		{
			exitProgram.callExit(pathError.message);
		}
		else
		{
			executeOutputTasks(pArgsObj, parsedGraph, pathRes.pathfindObject);
		}
	});
}


function executeOutputTasks(pArgs, pGraph, pPathResult)
{
	resultControl.callTextGraphOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pPathResult, "Absolute Text File");
}







module.exports =
{
	runAbsoluteMapping: runAbsoluteFileMapping
};