const tileSet = require("../../common/sub-parse/tile-set");
const traverseHelpTasks = require("../../common/sub-traverse/traverse-help-tasks");
const graphObjects = require("../../common/sub-graph/graph-objects");
const cellAccess = require("../../common/sub-traverse/cell-access");



function plotNodeTiles(gNodeList, mapGridObj, plotCallback)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentRowIndex = -1;
	var currentColIndex = -1;
	var currentCellExists = false;
	
	var loopObject = traverseHelpTasks.defineCellTraverse();
	loopObject.successful = true;
	
	
	while (nodeIndex >= 0 && nodeIndex < gNodeList.length && loopObject.successful === true)
	{
		currentNodeObject = gNodeList[nodeIndex];
		currentRowIndex = graphObjects.convertCoordinatesToIndex(currentNodeObject.rowNumber);
		currentColIndex = graphObjects.convertCoordinatesToIndex(currentNodeObject.colNumber);
		currentCellExists = traverseHelpTasks.checkCellExists(mapGridObj, currentRowIndex, currentColIndex, loopObject);
		
		if (currentCellExists === true)
		{
			cellAccess.setCell(mapGridObj, currentRowIndex, currentColIndex, tileSet.floorTile);
		}
		else
		{
			loopObject.successful = false;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	
	if (loopObject.successful === true)
	{
		return plotCallback(null, true);
	}
	else
	{
		return plotCallback(new Error(loopObject.errorText), null);
	}
}



module.exports =
{
	plotTiles: plotNodeTiles
};