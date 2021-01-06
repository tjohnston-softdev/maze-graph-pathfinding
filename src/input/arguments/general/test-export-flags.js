const exitProgram = require("../../../common/exit-program");


// Validates export mode flags for the 'test-export' command.
function validateTestExportFlagsSet(resObject)
{
	var validationResult = false;
	
	if (resObject.exportGraphData === true || resObject.exportRawData === true)
	{
		validationResult = true;
	}
	else
	{
		validationResult = false;
		exitProgram.callExit("Export not possible. --graph and/or --raw-data must be set.");
	}
	
	return validationResult;
}



module.exports =
{
	validateTestExportFlags: validateTestExportFlagsSet
};