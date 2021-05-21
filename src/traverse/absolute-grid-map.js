const asyncModule = require("async");
const ora = require("ora");
const plotDimensions = require("./conv-plot/plot-dimensions");
const plotNodes = require("./conv-plot/plot-nodes");
const plotEdges = require("./conv-plot/plot-edges");


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


function carveGridPaths(mGraphObj, mDimensions, carveCallback)
{
	var mappedGrid = plotDimensions.initializeGrid(mDimensions);
	
	asyncModule.series(
	[
		plotNodes.plotTiles.bind(null, mGraphObj.nodeList, mappedGrid),
		plotEdges.plotTiles.bind(null, mGraphObj, mappedGrid)
	],
	function (carvePathErr, carvePathRes)
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