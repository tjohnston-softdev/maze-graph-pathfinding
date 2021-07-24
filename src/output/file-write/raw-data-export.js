const series = require("run-series");
const ora = require("ora");
const spinText = require("../../common/sub-interface/spin-text/st-output-raw");
const pathContext = require("../../common/sub-input/path-context");
const graphPoints = require("./raw-data-steps/graph-points");
const edgeData = require("./raw-data-steps/edge-data");
const pathData = require("./raw-data-steps/path-data");


/*
	* This file is used to initiate raw data export.
	* Nodes and Edges are exported as .csv tables.
	* Path results are exported as a JSON file.
	* These files will be written differently depending on the pathfinding mode.
*/



// Main function.
function performNodeRawDataExport(inpPathMode, destPathsObject, completedGraphObject, completedPathObject, dataExportCallback)
{	
	var exportData = destPathsObject.rawPathsDefined;
	
	if (exportData === true && inpPathMode === pathContext.modes.DIJKSTRA)
	{
		// Dijkstra
		coordinateSinglePathDataExport(inpPathMode, destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else if (exportData === true && inpPathMode === pathContext.modes.A_STAR)
	{
		// A*Star
		coordinateSinglePathDataExport(inpPathMode, destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else if (exportData === true && inpPathMode === pathContext.modes.ALL_POSSIBLE)
	{
		// All Possible
		coordinateMultiplePathsDataExport(inpPathMode, destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else if (exportData === true && inpPathMode === pathContext.modes.ANY_POSSIBLE)
	{
		// Any Possible
		coordinateSinglePathDataExport(inpPathMode, destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else if (exportData === true && inpPathMode === pathContext.modes.BLOCK)
	{
		// Block
		coordinateBlockedRoutesDataExport(destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else if (exportData === true)
	{
		// Pathfinding skipped.
		coordinateBlankDataExport(destPathsObject, completedGraphObject, completedPathObject, dataExportCallback);
	}
	else
	{
		// Skip raw data export.
		coordinateDataExportSkip(dataExportCallback);
	}
	
	
}


// Raw data export with single path.
function coordinateSinglePathDataExport(pMode, destPathsObj, completedGraph, completedPath, modeCallback)
{
	var exportSpinner = ora(spinText.rawDataProg).start();
	
	series(
	[
		graphPoints.createNodeFile.bind(null, pMode, destPathsObj, completedGraph),
		edgeData.createEdgeFile.bind(null, destPathsObj, true, completedGraph),
		pathData.createPathFile.bind(null, destPathsObj, completedPath, 1)
	],
	function (mError)
	{
		if (mError !== null)
		{
			exportSpinner.fail(spinText.rawDataFail);
			return modeCallback(mError, null);
		}
		else
		{
			exportSpinner.succeed(spinText.rawDataComp);
			return modeCallback(null, true);
		}
	});
	
}



// Raw data export with multiple saved paths.
function coordinateMultiplePathsDataExport(pMode, destPathsObj, completedGraph, completedPath, modeCallback)
{
	var exportSpinner = ora(spinText.rawDataProg).start();
	
	series(
	[
		graphPoints.createNodeFile.bind(null, pMode, destPathsObj, completedGraph),
		edgeData.createEdgeFile.bind(null, destPathsObj, false, completedGraph),
		pathData.createPathFile.bind(null, destPathsObj, completedPath, 2)
	],
	function (mError)
	{
		if (mError !== null)
		{
			exportSpinner.fail(spinText.rawDataFail);
			return modeCallback(mError, null);
		}
		else
		{
			exportSpinner.succeed(spinText.rawDataComp);
			return modeCallback(null, true);
		}
	});
}





// Raw data export with blocked nodes.
function coordinateBlockedRoutesDataExport(destPathsObj, completedGraph, completedPath, modeCallback)
{
	var exportSpinner = ora(spinText.rawDataProg).start();
	
	series(
	[
		graphPoints.createNodeFile.bind(null, pathContext.modes.BLOCK, destPathsObj, completedGraph),
		edgeData.createEdgeFile.bind(null, destPathsObj, false, completedGraph),
		pathData.createPathFile.bind(null, destPathsObj, completedPath, 0)
	],
	function (mError)
	{
		if (mError !== null)
		{
			exportSpinner.fail(spinText.rawDataFail);
			return modeCallback(mError, null);
		}
		else
		{
			exportSpinner.succeed(spinText.rawDataComp);
			return modeCallback(null, true);
		}
	});
	
}



// Raw data export with no pathfinding.
function coordinateBlankDataExport(destPathsObj, completedGraph, completedPath, modeCallback)
{
	var exportSpinner = ora(spinText.rawDataProg).start();
	
	series(
	[
		graphPoints.createNodeFile.bind(null, -1, destPathsObj, completedGraph),
		edgeData.createEdgeFile.bind(null, destPathsObj, false, completedGraph),
		pathData.createPathFile.bind(null, destPathsObj, completedPath, 0)
	],
	function (mError)
	{
		if (mError !== null)
		{
			exportSpinner.fail(spinText.rawDataFail);
			return modeCallback(mError, null);
		}
		else
		{
			exportSpinner.succeed(spinText.rawDataComp);
			return modeCallback(null, true);
		}
	});
}



// Skip raw data export.
function coordinateDataExportSkip(modeCallback)
{
	var skipSpinner = ora(spinText.rawDataSkip).start();
	skipSpinner.info();
	return modeCallback(null, true);
}




module.exports =
{
	performRawDataExport: performNodeRawDataExport
};