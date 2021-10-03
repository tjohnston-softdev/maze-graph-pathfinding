const parallel = require("run-parallel");
const ora = require("ora-classic");
const spinText = require("../common/sub-interface/spin-text/st-io-paths");
const fsFileSize = require("../common/sub-files/fs-file-size");
const fsFolderSafe = require("../common/sub-files/fs-folder-safe");
const sizeLimits = require("../common/sub-files/size-limits");


/*
	These functions check whether:
		* Input file exists, with an accepted size.
		* Output folder path can be used.
	for map commands.
*/



// Text input files (Absolute, Grid)
function verifyTextInputOutputPathsExist(inpFilePath, resFolderPath, ioPathCallback)
{
	var pathCheckSpinner = ora(spinText.ioPathsProg).start();
	
	parallel(
	[
		fsFileSize.checkFileSize.bind(null, inpFilePath, "Input", sizeLimits.maxTextSize, false),
		fsFolderSafe.checkFolderSafe.bind(null, resFolderPath, "Output")
	],
	function (overallError)
	{
		if (overallError !== null)
		{
			pathCheckSpinner.fail(spinText.ioPathsFail);
			return ioPathCallback(overallError, null);
		}
		else
		{
			pathCheckSpinner.succeed(spinText.ioPathsComp);
			return ioPathCallback(null, true);
		}
	});
	
}


// Image input file
function verifyImageInputOutputPathsExist(inpFilePath, resFolderPath, ioPathCallback)
{
	var pathCheckSpinner = ora(spinText.ioPathsProg).start();
	
	parallel(
	[
		fsFileSize.checkFileSize.bind(null, inpFilePath, "Input Image", sizeLimits.maxImageFileSize, false),
		fsFolderSafe.checkFolderSafe.bind(null, resFolderPath, "Output")
	],
	function (overallError)
	{
		if (overallError !== null)
		{
			pathCheckSpinner.fail(spinText.ioPathsFail);
			return ioPathCallback(overallError, null);
		}
		else
		{
			pathCheckSpinner.succeed(spinText.ioPathsComp);
			return ioPathCallback(null, true);
		}
	});
	
}



module.exports =
{
	verifyTextPathsExist: verifyTextInputOutputPathsExist,
	verifyImagePathsExist: verifyImageInputOutputPathsExist
};