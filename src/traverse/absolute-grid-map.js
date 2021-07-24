const series = require("run-series");
const ora = require("ora");
const plotDimensions = require("./conv-plot/plot-dimensions");
const plotNodes = require("./conv-plot/plot-nodes");
const plotEdges = require("./conv-plot/plot-edges");


/*
	* This file converts a parsed graph into a tile grid.
	* Written for the 'absolute-to-grid' command.
*/


// Main function.
function performAbsoluteGridMapping(inpGraphObject, mappingCallback)
{
	var mapSpinner = ora("Converting Graph").start();
	
	coordinateMap(inpGraphObject, function(gridMapErr, gridMapRes)
	{
		if (gridMapErr !== null)
		{
			mapSpinner.fail("Graph Conversion Error");
			return mappingCallback(gridMapErr, null);
		}
		else
		{
			mapSpinner.succeed("Graph Converted");
			return mappingCallback(null, gridMapRes);
		}
	});
}



// Calculate grid dimensions.
function coordinateMap(mGraphObject, coordCallback)
{
	plotDimensions.getDimensions(mGraphObject.nodeList, function(dimErr, dimRes)
	{
		if (dimErr !== null)
		{
			return coordCallback(dimErr, null);
		}
		else
		{
			carveGridPaths(mGraphObject, dimRes, coordCallback);
		}
	});
}


// Carve grid maze.
function carveGridPaths(mGraphObj, mDimensions, carveCallback)
{
	var mappedGrid = plotDimensions.initializeGrid(mDimensions);
	
	series(
	[
		plotNodes.plotTiles.bind(null, mGraphObj.nodeList, mappedGrid),
		plotEdges.plotTiles.bind(null, mGraphObj, mappedGrid)
	],
	function (carvePathErr)
	{
		if (carvePathErr !== null)
		{
			return carveCallback(carvePathErr, null);
		}
		else
		{
			return carveCallback(null, mappedGrid);
		}
	});
}


module.exports =
{
	performMapping: performAbsoluteGridMapping
};