const clear = require("clear");
const series = require("run-series");
const exitProgram = require("./common/exit-program");
const readImageConfigValidation = require("./input/read-image-config-validation");
const imageEntryValidation = require("./input/image-entry-validation");
const loadImageConfig = require("./input/load-image-config");
const imageOptionsValidation = require("./input/image-options-validation");
const imageColourValidation = require("./input/image-colour-validation");


/*
	Command: read-image-config
	Description: Reads and validates an existing image configuration file.
	Steps:
		* Validate input file path.
		* Load input file.
		* Validate file contents.
		* Validate colours.
*/



function runReadImageConfig(eInputPath)
{
	var preparedArgumentsObject = readImageConfigValidation.readArguments(eInputPath);
	
	if (preparedArgumentsObject.valid === true)
	{
		clear();
		imageEntryValidation.initializeImageItems(preparedArgumentsObject);
		executeReadTasks(preparedArgumentsObject);
	}
	
}



function executeReadTasks(prepArgsObj)
{
	var optionsPlaceholder = {};
	
	series(
	[
		loadImageConfig.loadRequiredFile.bind(null, prepArgsObj.preparedFilePath, prepArgsObj.imageItems),		// Read successful
		imageOptionsValidation.prepareGeneral.bind(null, prepArgsObj, optionsPlaceholder),				// Contents valid
		imageColourValidation.convertColours.bind(null, prepArgsObj.imageItems)							// Colours valid
	],
	function (readTaskError)
	{
		if (readTaskError !== null)
		{
			exitProgram.callExit(readTaskError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}




module.exports =
{
	performCommand: runReadImageConfig
};