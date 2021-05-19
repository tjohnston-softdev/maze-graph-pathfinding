const parseHelpTasks = require("../../../common/sub-parse/parse-help-tasks");
const gridHelpTasks = require("../../../common/sub-parse/grid-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const tileSet = require("../../../common/sub-parse/tile-set");
const valueLimits = require("../../../common/value-limits");
const graphObjects = require("../../../common/sub-graph/graph-objects");


/*
	* Automatically searches for the entry and exit points on a parsed grid object.
	* This is done by checking the grid boundaries for any open tiles.
	* The entry point is the first open tile. The exit point is the second.
	* Graph object is returned.
*/


// Main function.
function setGridEntryExitPoints(gridMatrixObject, pointCallback)
{
	var graphResultObject = parseObjects.initializeResultObject(true);
	var pointOutcomeObject = parseObjects.defineLineOutcome();
	
	var startDefined = false;
	var endDefined = false;
	
	
	// Searches for entry and exit points.
	loopFirstRow(gridMatrixObject, graphResultObject);
	loopMiddleRows(gridMatrixObject, graphResultObject);
	loopLastRow(gridMatrixObject, graphResultObject);
	
	
	// Checks start node defined.
	startDefined = parseHelpTasks.checkTargetDefined(graphResultObject.startNodeIndex, graphResultObject.nodeList.length, "Start", pointOutcomeObject);
	
	
	if (startDefined === true)
	{
		// Checks end node defined.
		endDefined = parseHelpTasks.checkTargetDefined(graphResultObject.endNodeIndex, graphResultObject.nodeList.length, "End", pointOutcomeObject);
	}
	
	if (endDefined === true)
	{
		pointOutcomeObject.valid = true;
	}
	
	
	
	if (pointOutcomeObject.valid === true)
	{
		return pointCallback(null, graphResultObject);
	}
	else
	{
		return pointCallback(new Error(pointOutcomeObject.messageText), null);
	}
	
}



// First row.
function loopFirstRow(gMatrixObj, gResultObj)
{
	var firstRowObject = gMatrixObj[0];
	var colIndex = 0;
	
	var canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	
	// Loops through all tiles on first row.
	while (colIndex >= 0 && colIndex < firstRowObject.length && canContinue === true)
	{
		readCurrentCell(firstRowObject, 1, colIndex, gResultObj);
		colIndex = colIndex + 1;
		canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	}
	
}


// Middle rows (First and last tiles)
function loopMiddleRows(gMatrixObj, gResultObj)
{
	var rowIndex = 1;
	var lastIndex = gMatrixObj.length - 1;
	var currentRowObject = [];
	var currentRowOffset = -1;
	var currentLastCol = -1;
	
	var positionFlag = -1;
	var canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	
	// Loop iterates twice for each row, reading the first and last cells.
	while (rowIndex > 0 && rowIndex < lastIndex && canContinue === true)
	{
		currentRowObject = gMatrixObj[rowIndex];
		currentRowOffset = rowIndex + 1;
		currentLastCol = -1;
		
		if (positionFlag > 0)
		{
			// Positive flag reads last cell.
			currentLastCol = currentRowObject.length - 1;
			readCurrentCell(currentRowObject, currentRowOffset, currentLastCol, gResultObj);
			rowIndex = rowIndex + 1;
			positionFlag = -1;
		}
		else
		{
			// Otherwise, read first cell.
			readCurrentCell(currentRowObject, currentRowOffset, 0, gResultObj);
			positionFlag = 1;
		}
		
		
		canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	}
	
}


// Last row
function loopLastRow(gMatrixObj, gResultObj)
{
	var totalRowCount = gMatrixObj.length;
	var lastRowObject = gMatrixObj[totalRowCount - 1];
	var colIndex = 0;
	
	var canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	
	// Loops through all tiles on last row.
	while (colIndex >= 0 && colIndex < lastRowObject.length && canContinue === true)
	{
		readCurrentCell(lastRowObject, totalRowCount, colIndex, gResultObj);
		colIndex = colIndex + 1;
		
		canContinue = gridHelpTasks.checkTargetLoopContinue(gResultObj);
	}
	
}





// Read current cell tile.
function readCurrentCell(rowObj, rowOffset, cIndex, graphRes)
{
	var cellValue = rowObj[cIndex];
	var colOffset = cIndex + 1;
	
	var rowCoord = -1;
	var colCoord = -1;
	var assignedID = -1;
	var newNodeObject = {};
	var canAdd = false;
	
	var readRes = false;
	
	// IF current cell is a floor tile:
	if (cellValue === tileSet.floorTile)
	{
		// Convert grid coordinates to graph coordinates.
		rowCoord = rowOffset * graphObjects.scaleFactor;
		colCoord = colOffset * graphObjects.scaleFactor;
		
		// Create target node object.
		assignedID = graphRes.nodeList.length + 1;
		newNodeObject = graphObjects.defineNode(assignedID, rowCoord, colCoord, undefined);
		canAdd = true;
	}
	
	
	if (canAdd === true && graphRes.startNodeIndex === -1)
	{
		// Start node.
		graphRes.nodeList.push(newNodeObject);
		graphRes.startNodeIndex = graphRes.nodeList.length - 1;
		rowObj[cIndex] = tileSet.nodeTile;
		readRes = true;
	}
	else if (canAdd === true && graphRes.endNodeIndex === -1)
	{
		// End node.
		graphRes.nodeList.push(newNodeObject);
		graphRes.endNodeIndex = graphRes.nodeList.length - 1;
		rowObj[cIndex] = tileSet.nodeTile;
		readRes = true;
	}
	else
	{
		// Ignore.
		readRes = false;
	}
	
	return readRes;
}




module.exports =
{
	setEntryExit: setGridEntryExitPoints
};