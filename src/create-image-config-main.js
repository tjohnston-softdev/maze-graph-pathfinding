const clear = require("clear");
const asyncModule = require("async");
const exitProgram = require("./common/exit-program");
const createConfigValidation = require("./input/create-image-config-validation");
const imageEntryValidation = require("./input/image-entry-validation");
const imageOptionsValidation = require("./input/image-options-validation");
const ioTargetPath = require("./io-paths/target-path");
const resultControl = require("./output/result-control");


/*
	Command: create-image-config
	Description: Creates a configuration file that can be used when reading images.
	Steps:
		* Validate target path input.
		* Validate image options input.
		* Check target path safe.
		* Write config file.
*/


function runCreateImageConfig(eTargetPath, optionalArgumentsObject)
{
	var preparedArgumentsObject = createConfigValidation.readArguments(eTargetPath, optionalArgumentsObject);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		imageEntryValidation.initializeImageItems(preparedArgumentsObject);
		executePreperationTasks(optionalArgumentsObject, preparedArgumentsObject);
	}
	
}



function executePreperationTasks(optArgsObj, prepArgsObj)
{
	asyncModule.series(
	[
		imageOptionsValidation.prepareOptionArguments.bind(null, prepArgsObj, optArgsObj),
		ioTargetPath.verifySafe.bind(null, prepArgsObj.resolvedTargetPath, prepArgsObj.replaceExistingFile)
	],
	function (prepError, prepRes)
	{
		if (prepError !== null)
		{
			exitProgram.callExit(prepError.message);
		}
		else
		{
			resultControl.callCreateImageConfigOutput(prepArgsObj);
		}
	});
	
}



module.exports =
{
	runConfigCreate: runCreateImageConfig
};