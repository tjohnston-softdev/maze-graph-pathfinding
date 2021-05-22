const tileSet = require("../../common/sub-parse/tile-set");
const traverseHelpTasks = require("../../common/sub-traverse/traverse-help-tasks");
const graphObjects = require("../../common/sub-graph/graph-objects");
const cellAccess = require("../../common/sub-traverse/cell-access");

// This file places floor tiles on nodes when converting parsed graphs into tile grids.


function plotNodeTiles(gNodeList, mapGridObj, plotCallback)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentRowIndex = -1;
	var currentColIndex = -1;
	var currentCellExists = false;
	
	var loopObject = traverseHelpTasks.defineCellTraverse();
	loopObject.successful = true;
	
	
	// Loop nodes until end reached or error caught.
	while (nodeIndex >= 0 && nodeIndex < gNodeList.length && loopObject.successful === true)
	{
		// Read current node.
		currentNodeObject = gNodeList[nodeIndex];
		
		// Convert coordinates to tile index.
		currentRowIndex = graphObjects.convertCoordinatesToIndex(currentNodeObject.rowNumber);
		currentColIndex = graphObjects.convertCoordinatesToIndex(currentNodeObject.colNumber);
		currentCellExists = traverseHelpTasks.checkCellExists(mapGridObj, currentRowIndex, currentColIndex, loopObject);
		
		if (currentCellExists === true)
		{
			// Place floor tile on node location.
			cellAccess.setCell(mapGridObj, currentRowIndex, currentColIndex, tileSet.floorTile);
		}
		else
		{
			// Cell does not exist.
			loopObject.successful = false;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	
	if (loopObject.successful === true)
	{
		// Nodes placed successfully.
		return plotCallback(null, true);
	}
	else
	{
		// Error caught.
		return plotCallback(new Error(loopObject.errorText), null);
	}
}



module.exports =
{
	plotTiles: plotNodeTiles
};