const fs = require("fs");
const ora = require("ora-classic");
const streamExceptions = require("../common/sub-files/stream-exceptions");
const folderOptions = {recursive: true};

/*
	* Creates the output folder before any files are written.
	* Folder creation is done recursively
	* If the target folder already exists, there is no error.
*/



// Main function.
function performOutputFolderCreate(oFolderPath, folderCreateCallback)
{
	var folderSpinner = ora("Creating Output Folder").start();
	
	handleDirectories(oFolderPath, "Output", function (cError, cResult)
	{
		if (cError !== null)
		{
			folderSpinner.fail("Error Creating Output Folder");
			return folderCreateCallback(cError, null);
		}
		else
		{
			folderSpinner.succeed("Output Folder Created");
			return folderCreateCallback(null, true);
		}
	});
	
}


// Make directories.
function handleDirectories(dirTarget, dirDesc, dirCallback)
{
	var invalidErrorText = "";
	
	fs.mkdir(dirTarget, folderOptions, function (fsError)
	{
		if (fsError !== null)
		{
			invalidErrorText = streamExceptions.getFolderCreate(fsError.message);
			return dirCallback(new Error(invalidErrorText), null);
		}
		else
		{
			return dirCallback(null, true);
		}
	});
}




module.exports =
{
	createOutputFolder: performOutputFolderCreate
};