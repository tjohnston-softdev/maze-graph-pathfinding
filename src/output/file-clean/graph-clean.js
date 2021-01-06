const asyncModule = require("async");
const ora = require("ora");
const fsDelete = require("../../common/sub-files/fs-delete");
const spinText = require("../../common/sub-interface/spin-text/st-output-clean");


// Deletes invalid graph output files.


// Text input.
function removeSavedTextGraphFiles(graphPathsObject, removeCallback)
{
	var removeSpinner = ora(spinText.graphProg).start();
	
	asyncModule.series(
	[
		fsDelete.deleteFile.bind(null, graphPathsObject.mainGraphFile, "Graph"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawNodesFile, "Raw Nodes Data"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawEdgesFile, "Raw Edges Data"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawSequenceFile, "Raw Path Data")
	],
	function (removeError, removeResult)
	{
		if (removeError !== null)
		{
			removeSpinner.fail(spinText.graphFail);
			return removeCallback(removeError, null);
		}
		else
		{
			removeSpinner.succeed(spinText.graphComp);
			return removeCallback(null, true);
		}
	});
}


// Image input.
function removeSavedImageGraphFiles(graphPathsObject, removeCallback)
{
	var removeSpinner = ora(spinText.graphProg).start();
	
	asyncModule.series(
	[
		fsDelete.deleteFile.bind(null, graphPathsObject.mainGraphFile, "Graph"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawNodesFile, "Raw Nodes Data"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawEdgesFile, "Raw Edges Data"),
		fsDelete.deleteFile.bind(null, graphPathsObject.rawSequenceFile, "Raw Path Data"),
		fsDelete.deleteFile.bind(null, graphPathsObject.imageConfigSaveFile, "Saved Config")
	],
	function (removeError, removeResult)
	{
		if (removeError !== null)
		{
			removeSpinner.fail(spinText.graphFail);
			return removeCallback(removeError, null);
		}
		else
		{
			removeSpinner.succeed(spinText.graphComp);
			return removeCallback(null, true);
		}
	});
}




module.exports =
{
	removeTextGraphFiles: removeSavedTextGraphFiles,
	removeImageGraphFiles: removeSavedImageGraphFiles
};