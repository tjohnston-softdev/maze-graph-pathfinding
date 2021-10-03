const parallel = require("run-parallel");
const ora = require("ora-classic");
const fsFileSize = require("../common/sub-files/fs-file-size");
const sizeLimits = require("../common/sub-files/size-limits");
const storedPaths = require("../../stored-paths");



// Validates the existence of all graph output template files as a single action.
function verifyTemplateFilesSafe(ioTemplateCallback)
{
	var templateSpinner = ora("Checking Template Files").start();
	
	parallel(
	[
		callTemplateFileCheck.bind(null, storedPaths.headerPath),
		callTemplateFileCheck.bind(null, storedPaths.stylePath),
		callTemplateFileCheck.bind(null, storedPaths.contentAllPath),
		callTemplateFileCheck.bind(null, storedPaths.contentBlockPath),
		callTemplateFileCheck.bind(null, storedPaths.contentShortestPath),
		callTemplateFileCheck.bind(null, storedPaths.contentBlankPath),
		callTemplateFileCheck.bind(null, storedPaths.graphPath),
		callTemplateFileCheck.bind(null, storedPaths.dynamicAllPath),
		callTemplateFileCheck.bind(null, storedPaths.dynamicBlockPath),
		callTemplateFileCheck.bind(null, storedPaths.dynamicShortestPath),
		callTemplateFileCheck.bind(null, storedPaths.footerPath)
	],
	function (overallError)
	{
		if (overallError !== null)
		{
			templateSpinner.fail("Error Checking Template Files");
			return ioTemplateCallback(overallError, null);
		}
		else
		{
			templateSpinner.succeed("Template Files Safe");
			return ioTemplateCallback(null, true);
		}
	});
	
}


// Checks whether a given template file exists with a safe size.
function callTemplateFileCheck(tFilePath, tFileCallback)
{
	fsFileSize.checkFileSize(tFilePath, tFilePath, sizeLimits.maxTemplateSize, false, function(tError, tResult)
	{
		return tFileCallback(tError, tResult);
	});
}


module.exports =
{
	verifyTemplateFiles: verifyTemplateFilesSafe
};