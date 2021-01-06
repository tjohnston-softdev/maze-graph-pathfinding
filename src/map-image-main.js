const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const imageEntryValidation = require("./input/image-entry-validation");
const loadImageConfig = require("./input/load-image-config");
const imageOptionsValidation = require("./input/image-options-validation");
const imageColourValidation = require("./input/image-colour-validation");
const mapExist = require("./io-paths/map-exist");
const templateFiles = require("./io-paths/template-files");
const imageFileRead = require("./parsing/image-file-read");
const initializeGrid = require("./parsing/initialize-grid");
const gridTraverse = require("./traverse/grid-traverse");
const parseStructureIntegrity = require("./parsing/parse-structure-integrity");
const routeFind = require("./pathfinding/route-find");
const resultFolder = require("./output/result-folder");
const resultControl = require("./output/result-control");



/*
	Command: map-image
	Description: Creates graph from image input file.
	Steps:
		* Validate main console input.
		* Load image config file. (Optional)
		* Validate image options.
		* Prepare image colours.
		* Check input file and output folder paths are safe.
		* Check template files exist.
		* Open image file.
		* Validate image dimensions.
		* Parse image into tile grid.
		* Validate grid dimensions.
		* Traverse grid.
		* Verify graph integrity.
		* Pathfinding.
		* Prepare output folder.
		* Output graph file.
		* Output raw data. (Optional)
		* Output image config file. (Optional)
*/




function runImageFileMapping(eInputPath, eMappingMode, optionalArgumentsObject)
{
	var preparedArgumentsObject = imageEntryValidation.readArguments(eInputPath, eMappingMode, optionalArgumentsObject);
	
	if (preparedArgumentsObject.readSuccessfully === true)
	{
		clear();
		imageEntryValidation.initializeImageItems(preparedArgumentsObject);
		executePreperationTasks(optionalArgumentsObject, preparedArgumentsObject);
	}
	
}


function executePreperationTasks(optArgsObj, prepArgsObj)
{
	var sInputPath = prepArgsObj.preparedPaths.inputFile;
	var sOutputFolder = prepArgsObj.preparedPaths.outputFolder;
	var sLoadPath = prepArgsObj.preparedPaths.imageConfigLoadFile;
	
	asyncModule.series(
	{
		"loadSuccessful": loadImageConfig.loadExistingFile.bind(null, sLoadPath, prepArgsObj.imageItems),
		"optionsValid": imageOptionsValidation.prepareOptionArguments.bind(null, prepArgsObj, optArgsObj),
		"preparedColours": imageColourValidation.convertTargetColours.bind(null, prepArgsObj.imageItems),
		"ioPathsSafe": mapExist.verifyImagePathsExist.bind(null, sInputPath, sOutputFolder),
		"templateSafe": templateFiles.verifyTemplateFiles.bind(null),
		"targetImageFile": imageFileRead.performFileOpen.bind(null, sInputPath)
	},
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			executeImageReadTasks(prepArgsObj, prepRes.preparedColours, prepRes.targetImageFile);
		}
	});
}



function executeImageReadTasks(pArgsObj, targetColoursObject, targetImageObject)
{
	asyncModule.series(
	{
		"dimensionsValid": imageFileRead.performDimensionsRead.bind(null, targetImageObject, pArgsObj.imageItems),
		"readGridObject": imageFileRead.performContentsParse.bind(null, targetImageObject, targetColoursObject, pArgsObj.imageItems, pArgsObj.ignoreImageParseErrors)
	},
	function (imgReadError, imgReadRes)
	{
		if (imgReadError !== null)
		{
			exitProgram.callExit(imgReadError.message);
		}
		else
		{
			executeGridInitialization(pArgsObj, imgReadRes.readGridObject);
		}
	});
}


function executeGridInitialization(pArgs, readGridObject)
{
	initializeGrid.performGridInitialization(readGridObject, pArgs.ignoreImageParseErrors, function (intlGridError, intlGridRes)
	{
		if (intlGridError !== null)
		{
			exitProgram.callExit(intlGridError.message);
		}
		else
		{
			executeGraphTasks(pArgs, readGridObject, intlGridRes);
		}
	});
}



function executeGraphTasks(pArguments, readGrid, parsedGraph)
{
	asyncModule.series(
	{
		"traverseSuccessful": gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),
		"graphIntegritySafe": parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),
		"pathfindObject": routeFind.performGraphPathfinding.bind(null, pArguments.mapModeFlag, parsedGraph),
		"folderPrepared": resultFolder.createOutputFolder.bind(null, pArguments.preparedPaths.outputFolder)
	},
	function (graphTaskError, graphTaskRes)
	{
		if (graphTaskError !== null)
		{
			exitProgram.callExit(graphTaskError.message);
		}
		else
		{
			resultControl.callImageGraphOutput(pArguments, parsedGraph, graphTaskRes.pathfindObject, "Image");
		}
	});
}


module.exports =
{
	runImageMapping: runImageFileMapping
};