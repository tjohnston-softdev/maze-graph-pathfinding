const asyncModule = require("async");
const ora = require("ora");
const fsDelete = require("../../common/sub-files/fs-delete");
const spinText = require("../../common/sub-interface/spin-text/st-output-clean");


// Deletes invalid 'create-image-config' output file.
function removeCreatedImageConfigFile(configPathString, removeCallback)
{
	var removeSpinner = ora("Removing Image Config File").start();
	
	fsDelete.deleteFile(configPathString, "Image Config", function (removeError, removeResult)
	{
		if (removeError !== null)
		{
			removeSpinner.fail("Error Removing Image Config File");
			return removeCallback(removeError, null);
		}
		else
		{
			removeSpinner.succeed("Image Config File Removed");
			return removeCallback(null, true);
		}
	});
	
}



module.exports =
{
	removeCreatedImageConfig: removeCreatedImageConfigFile
};