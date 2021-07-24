const series = require("run-series");
const ora = require("ora");
const fsDelete = require("../../common/sub-files/fs-delete");
const spinText = require("../../common/sub-interface/spin-text/st-output-clean");

// Deletes invalid conversion output file.


// Text input.
function removeTextConversionFiles(convPathString, removeCallback)
{
	var removeSpinner = ora(spinText.conversionSingleProg).start();
	
	fsDelete.deleteFile(convPathString, "Conversion", function (removeError, removeResult)
	{
		if (removeError !== null)
		{
			removeSpinner.fail(spinText.conversionSingleFail);
			return removeCallback(removeError, null);
		}
		else
		{
			removeSpinner.succeed(spinText.conversionSingleComp);
			return removeCallback(null, true);
		}
	});
}



// Image input.
function removeImageConversionFiles(pObject, removeCallback)
{
	var removeSpinner = ora(spinText.conversionMultipleProg).start();
	
	series(
	[
		fsDelete.deleteFile.bind(null, pObject.writePath, "Conversion"),
		fsDelete.deleteFile.bind(null, pObject.saveConfig, "Image Config")
	],
	function (removeError, removeResult)
	{
		if (removeError !== null)
		{
			removeSpinner.fail(spinText.conversionMultipleFail);
			return removeCallback(removeError, null);
		}
		else
		{
			removeSpinner.succeed(spinText.conversionMultipleComp);
			return removeCallback(null, true);
		}
	});
	
}




module.exports =
{
	removeTextConversion: removeTextConversionFiles,
	removeImageConversion: removeImageConversionFiles
};