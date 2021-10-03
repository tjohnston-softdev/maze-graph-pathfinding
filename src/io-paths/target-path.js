const ora = require("ora-classic");
const spinText = require("../common/sub-interface/spin-text/st-io-paths");
const fsPathExist = require("../common/sub-files/fs-path-exist");

/*
	* This checks whether the target output file path is available.
	* Used for conversion and 'create-image-config' commands.
	* Unlike most io-paths, an existing file can be replaced.
*/


function verifyTargetPathSafe(resOutputPath, replaceAllowed, ioPathCallback)
{
	var pathCheckSpinner = ora(spinText.targetPathProg).start();
	
	fsPathExist.checkPathExists(resOutputPath, function (pathExistError, pathExistResult)
	{
		if (pathExistResult === true && replaceAllowed === true)
		{
			// File already exists. Will be overwritten.
			pathCheckSpinner.succeed(spinText.targetPathComp);
			return ioPathCallback(null, true);
		}
		else if (pathExistResult === true)
		{
			// File already exists. Overwrite not allowed.
			pathCheckSpinner.fail(spinText.targetPathExists);
			return ioPathCallback(new Error(spinText.targetPathExists), null);
		}
		else
		{
			// File does not exist. Can be created.
			pathCheckSpinner.succeed(spinText.targetPathComp);
			return ioPathCallback(null, true);
		}
		
	});
	
}



module.exports =
{
	verifySafe: verifyTargetPathSafe
};