const clear = require("clear");
const series = require("run-series");
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
const imgGraphResCtrl = require("./output/res-ctrl-img-graph");



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
	
	var preparedColours = null;
	var targetImageFile = null;
	
	series(
	[
		loadImageConfig.loadExistingFile.bind(null, sLoadPath, prepArgsObj.imageItems),				// Load existing config file, if entered.
		imageOptionsValidation.prepareGeneral.bind(null, prepArgsObj, optArgsObj),			// Validate image option arguments.
		imageColourValidation.convertColours.bind(null, prepArgsObj.imageItems),				// Convert hex colours to RGB.
		mapExist.verifyImagePathsExist.bind(null, sInputPath, sOutputFolder),						// Check IO paths safe.
		templateFiles.verifyTemplateFiles.bind(null),												// Check template files exist.
		imageFileRead.performFileOpen.bind(null, sInputPath)										// Open image file.
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			preparedColours = prepRes[2];
			targetImageFile = prepRes[5];
			executeImageReadTasks(prepArgsObj, preparedColours, targetImageFile);
		}
	});
}



function executeImageReadTasks(pArgsObj, targetColoursObject, targetImageObject)
{
	var readGridObject = null;
	
	series(
	[
		imageFileRead.performDimensionsRead.bind(null, targetImageObject, pArgsObj.imageItems),
		imageFileRead.performContentsParse.bind(null, targetImageObject, targetColoursObject, pArgsObj.imageItems, pArgsObj.ignoreImageParseErrors)
	],
	function (imgReadError, imgReadRes)
	{
		if (imgReadError !== null)
		{
			exitProgram.callExit(imgReadError.message);
		}
		else
		{
			readGridObject = imgReadRes[1];
			executeGridInitialization(pArgsObj, readGridObject);
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
	var pathfindObject = null;
	
	series(
	[
		gridTraverse.performGridTraverse.bind(null, readGrid, parsedGraph),						// Traverse grid for nodes.
		parseStructureIntegrity.performGraphCheck.bind(null, parsedGraph),						// Validate graph structure.
		routeFind.performGraphPathfinding.bind(null, pArguments.mapModeFlag, parsedGraph),		// Run pathfinding algorithm.
		resultFolder.createOutputFolder.bind(null, pArguments.preparedPaths.outputFolder)		// Prepare output folder.
	],
	function (graphTaskError, graphTaskRes)
	{
		if (graphTaskError !== null)
		{
			exitProgram.callExit(graphTaskError.message);
		}
		else
		{
			pathfindObject = graphTaskRes[2];
			imgGraphResCtrl.callOutput(pArguments, parsedGraph, pathfindObject, "Image");
		}
	});
}


module.exports =
{
	performCommand: runImageFileMapping
};