const ora = require("ora-classic");
const fsFolderSafe = require("../common/sub-files/fs-folder-safe");


// Checks whether the 'test-export' output folder path can be used.
function verifyTestExportFolderPathExists(resFolderPath, ioPathCallback)
{
	var pathCheckSpinner = ora("Checking Output Folder Path").start();
	
	fsFolderSafe.checkFolderSafe(resFolderPath, "Output", function (overallError, overallResult)
	{
		if (overallError !== null)
		{
			pathCheckSpinner.fail("Error Checking Output Folder Path");
			return ioPathCallback(overallError, null);
		}
		else
		{
			pathCheckSpinner.succeed("Output Folder Path Safe");
			return ioPathCallback(null, true);
		}
	});
	
	
}



module.exports =
{
	verifyTestExportFolderExists: verifyTestExportFolderPathExists
};