const series = require("run-series");
const exitProgram = require("../common/exit-program");
const graphFileExport = require("./file-write/graph-file-export");
const rawDataExport = require("./file-write/raw-data-export");
const graphClean = require("./file-clean/graph-clean");


/*
	* Coordinates the creation of output files for these commands:
		* map-absolute
		* map-relative
		* map-grid
	* If there are any errors when creating output files, they will be deleted.
*/



// Main function.
function callOutputTasks(outputPathsObject, cMapMode, cGraphObject, cPathObject, outputLabel)
{
	series(
	[
		graphFileExport.performGraphExport.bind(null, cMapMode, outputPathsObject, cGraphObject, cPathObject, outputLabel),
		rawDataExport.performRawDataExport.bind(null, cMapMode, outputPathsObject, cGraphObject, cPathObject)
	],
	function (outputError)
	{
		if (outputError !== null)
		{
			handleTextFileClean(outputPathsObject, outputError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
	
}


// Deletes invalid output files.
function handleTextFileClean(oPaths, eMsg)
{
	graphClean.removeTextGraphFiles(oPaths, function(cleanError, cleanRes)
	{
		// Error will be displayed regardless.
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