const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const textEntryValidation = require("./input/text-entry-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const textFileRead = require("./parsing/text-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const resultControl = require("./output/result-control");


/*
	Command: map-grid
	Description: Creates graph from grid input file.
	Steps:
		* Validate console input.
		* Check input file and output folder paths are safe.
		* Check template files exist.
		* Parse text file.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Pathfinding.
		* Prepare output folder.
		* Output graph file.
		* Output raw data. (Optional)
*/



function runGridFileMapping(eInputPath, eMappingMode, optionalArgumentsObject)
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
		"templateFilesSafe": templateFiles.verifyTemplateFiles.bind(null),
		"readGridObject": textFileRead.performGridParsing.bind(null, sInputFile, sIgnoreTextErrors)
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
	initializeGrid.performGridInitialization(readGridObj, pArgsObj.ignoreTextErrors, function(gIntlError, gIntlRes)
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
	{
		"traverseSuccessful": gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),
		"validStructure": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
		"pathfindObject": routeFind.performGraphPathfinding.bind(null, pArguments.mapModeFlag, parsedGraph),
		"folderPrepared": resultFolder.createOutputFolder.bind(null, pArguments.preparedPaths.outputFolder)
	},
	function (graphError, graphResult)
	{
		if (graphError !== null)
		{
			exitProgram.callExit(graphError.message);
		}
		else
		{
			executeOutputTasks(pArguments, parsedGraph, graphResult.pathfindObject);
		}
	});
}



function executeOutputTasks(pArgs, pGraph, pPathResult)
{
	resultControl.callTextGraphOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pGraph, pPathResult, "Grid Text File");
}



module.exports =
{
	runGridMapping: runGridFileMapping
};