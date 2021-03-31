const asyncModule = require("async");
const exitProgram = require("../common/exit-program");
const graphFileExport = require("./file-write/graph-file-export");
const rawDataExport = require("./file-write/raw-data-export");
const imageConfigSaveExport = require("./file-write/image-config-save-export");
const graphClean = require("./file-clean/graph-clean");


/*
	* Coordinates the creation of output files for the 'map-image' command.
	* If there are any errors when creating output files, they will be deleted.
*/


// Main Function
function callOutputTasks(cPreparedInput, cGraphObject, cPathObject, outputLabel)
{
	
	asyncModule.series(
	[
		graphFileExport.performGraphExport.bind(null, cPreparedInput.mapModeFlag, cPreparedInput.preparedPaths, cGraphObject, cPathObject, outputLabel),
		rawDataExport.performRawDataExport.bind(null, cPreparedInput.mapModeFlag, cPreparedInput.preparedPaths, cGraphObject, cPathObject),
		imageConfigSaveExport.performFileExport.bind(null, cPreparedInput.preparedPaths.imageConfigSaveFile, cPreparedInput.imageItems)
	],
	function (outputError, outputRes)
	{
		if (outputError !== null)
		{
			handleImageFileClean(cPreparedInput.preparedPaths, outputError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
	
}




// Deletes invalid output files.
function handleImageFileClean(oPaths, eMsg)
{
	graphClean.removeImageGraphFiles(oPaths, function(cleanError, cleanRes)
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
	callOutput: callOutputTasks
};