// Checks whether a given path exists on the file system.

const fs = require("fs");

function checkGeneralPathExists(targetPath, existCallback)
{
	fs.access(targetPath, fs.constants.F_OK, function (pathError)
	{
		if (pathError !== null)
		{
			return existCallback(null, false);
		}
		else
		{
			return existCallback(null, true);
		}
	});
}


module.exports =
{
	checkPathExists: checkGeneralPathExists
};