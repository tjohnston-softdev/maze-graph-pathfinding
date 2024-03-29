const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const exportEntryValidation = require("./input/export-entry-validation");
const exportExist = require("./io-paths/export-exist");
const templateFiles = require("./io-paths/template-files");
const routePrecompiled = require("./pathfinding/route-precompiled");
const resultFolder = require("./output/result-folder");
const txtGraphResCtrl = require("./output/res-ctrl-txt-graph");



/*
	Command: test-export
	Description: Used to test file output by exporting a hard-coded graph.
	Steps:
		* Validate console input.
		* Load precompiled graph.
		* Check target folder path safe.
		* Check template files exist.
		* Prepare output folder.
		* Output graph file. (Optional)
		* Output raw data. (Optional)
*/




function runTestGraphExport(eMappingMode, optionalArgumentsObject)
{
	var preparedArgumentsObject = exportEntryValidation.readArguments(eMappingMode, optionalArgumentsObject);
	var precompiledGraphObject = {};
	
	if (preparedArgumentsObject.valid === true)
	{
		precompiledGraphObject = routePrecompiled.retrieveData(preparedArgumentsObject.mapModeFlag);
		clear();
		executePreperationTasks(preparedArgumentsObject, precompiledGraphObject);
	}
	
}



function executePreperationTasks(prepArgsObj, precompGraphObj)
{
	series(
	[
		exportExist.verifyTestExportFolderExists.bind(null, prepArgsObj.preparedPaths.outputFolder),
		templateFiles.verifyTemplateFiles.bind(null),
		resultFolder.createOutputFolder.bind(null, prepArgsObj.preparedPaths.outputFolder)
	],
	function (prepError)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			executeOutputTasks(prepArgsObj, precompGraphObj);
		}
	});
}



function executeOutputTasks(pArgs, pComp)
{
	txtGraphResCtrl.callOutput(pArgs.preparedPaths, pArgs.mapModeFlag, pComp.graphData, pComp.pathData, "Test");
}




module.exports =
{
	performCommand: runTestGraphExport
};