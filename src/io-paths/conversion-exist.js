const ora = require("ora");
const spinText = require("../common/sub-interface/spin-text/st-io-paths");
const fsFileSize = require("../common/sub-files/fs-file-size");
const sizeLimits = require("../common/sub-files/size-limits");

// These functions check whether the input file exists with an accepted size for conversion commands.


// Text input files
function verifyTextConversionInputPathExists(inpFilePath, ioPathCallback)
{
	var pathCheckSpinner = ora(spinText.conversionInputPathProg).start();
	
	fsFileSize.checkFileSize(inpFilePath, "Input", sizeLimits.maxTextSize, false, function (cPathError, cPathRes)
	{
		if (cPathError !== null)
		{
			pathCheckSpinner.fail(spinText.conversionInputPathFail);
			return ioPathCallback(cPathError, null);
		}
		else
		{
			pathCheckSpinner.succeed(spinText.conversionInputPathComp);
			return ioPathCallback(null, true);
		}
	});
	
}


// Image input files
function verifyImageConversionInputPathExists(inpFilePath, ioPathCallback)
{
	var pathCheckSpinner = ora(spinText.conversionInputPathProg).start();
	
	fsFileSize.checkFileSize(inpFilePath, "Input", sizeLimits.maxImageFileSize, false, function (cPathError, cPathRes)
	{
		if (cPathError !== null)
		{
			pathCheckSpinner.fail(spinText.conversionInputPathFail);
			return ioPathCallback(cPathError, null);
		}
		else
		{
			pathCheckSpinner.succeed(spinText.conversionInputPathComp);
			return ioPathCallback(null, true);
		}
	});
}




module.exports =
{
	verifyTextConvertInputExists: verifyTextConversionInputPathExists,
	verifyImageConvertInputExists: verifyImageConversionInputPathExists
};