const exitProgram = require("../common/exit-program");
const imageConfigSaveExport = require("./file-write/image-config-save-export");
const imageConfigClean = require("./file-clean/image-config-clean");



/*
	* Coordinates the creation of output files for the 'create-image-config' command.
	* If there are any errors when creating output files, they will be deleted.
*/



// Main Function.
function callOutputTask(cPreparedInput)
{
	imageConfigSaveExport.performFileCreate(cPreparedInput.resolvedTargetPath, cPreparedInput.imageItems, function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleCreateImageConfigFileClean(cPreparedInput.resolvedTargetPath);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}


// Deletes invalid output file.
function handleCreateImageConfigFileClean(oPath, eMsg)
{
	imageConfigClean.removeCreatedImageConfig(oPath, function (cleanError, cleanRes)
	{
		if (cleanError !== null)
		{
			exitProgram.callExit(cleanError.message);
		}
		else
		{
			exitProgram.callExit(eMsg);
		}
	});
}



module.exports =
{
	callOutput: callOutputTask
};