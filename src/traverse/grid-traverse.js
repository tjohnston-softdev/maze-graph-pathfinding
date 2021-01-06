const ora = require("ora");
const tileSet = require("../common/sub-parse/tile-set");
const graphObjects = require("../common/sub-graph/graph-objects");
const traverseHelpTasks = require("../common/sub-traverse/traverse-help-tasks");
const traverseErrorDisplay = require("../common/sub-traverse/traverse-error-display");
const cellAccess = require("../common/sub-traverse/cell-access");
const cellMovement = require("./visit/cell-movement");
const markPoints = require("./visit/mark-points");



/*
	* This file is used to map out nodes on a parsed grid of tiles.
	* Used when parsing grid and image input files.
*/



// Main function.
function performGridNodeTraverse(inpMatrixGrid, inpGraphObject, traverseCallback)
{
	var traverseSpinner = ora("Traversing Grid").start();
	
	coordinateTraversal(inpMatrixGrid, inpGraphObject, function (gnTraverseError, gnTraverseResult)
	{
		if (gnTraverseError !== null)
		{
			traverseSpinner.fail("Traverse Failed");
			return traverseCallback(gnTraverseError, null);
		}
		else
		{
			traverseSpinner.succeed("Grid Traversed Successfully");
			return traverseCallback(null, true);
		}
	});
	
}


// Visit Nodes Loop.
function coordinateTraversal(tMatrixGrid, tGraphObject, loopCallback)
{
	var unvisitedNodes = [tGraphObject.startNodeIndex];
	var visitedNodes = [];
	
	var currentUnvisitedIndex = -1;
	var currentCellResult = {};
	var currentNodeExists = false;
	
	var currentNodeObject = {};
	var currentOriginRow = -1;
	var currentOriginCol = -1;
	var currentBoundsValid = false;
	
	var currentVisited = false;
	var canContinue = true;
	var flaggedErrorMessage = "";
	
	
	// Loops until all nodes are visited or error is flagged.
	while (unvisitedNodes.length > 0 && canContinue === true)
	{
		// Retrieves current unvisited node.
		currentUnvisitedIndex = unvisitedNodes[0];
		currentCellResult = traverseHelpTasks.defineCellTraverse();
		currentNodeExists = traverseHelpTasks.checkUnvisitedNodeExists(currentUnvisitedIndex, tGraphObject.nodeList.length, currentCellResult);
		
		currentNodeObject = {};
		currentOriginRow = -1;
		currentOriginCol = -1;
		currentBoundsValid = false;
		
		currentVisited = false;
		
		if (currentNodeExists === true)
		{
			// Reads and validates node coordinates.
			currentNodeObject = tGraphObject.nodeList[currentUnvisitedIndex];
			currentOriginRow = graphObjects.convertCoordinatesToIndex(currentNodeObject.rowNumber);
			currentOriginCol = graphObjects.convertCoordinatesToIndex(currentNodeObject.colNumber);
			currentBoundsValid = traverseHelpTasks.checkCellExists(tMatrixGrid, currentOriginRow, currentOriginCol, currentCellResult);
		}
		
		if (currentBoundsValid === true)
		{
			// Map grid from current node.
			currentVisited = visitCurrentNode(currentNodeObject, currentOriginRow, currentOriginCol, tMatrixGrid, tGraphObject, unvisitedNodes, visitedNodes, currentCellResult);
		}
		
		if (currentVisited === true)
		{
			// Node visited successfully.
			currentCellResult.successful = true;
		}
		
		
		if (currentCellResult.successful !== true)
		{
			// Abort loop.
			canContinue = false;
			flaggedErrorMessage = currentCellResult.errorText;
		}
		
		
		// Mark current node as visited.
		visitedNodes.push(currentUnvisitedIndex);
		unvisitedNodes.splice(0, 1);
	}
	
	
	if (canContinue === true)
	{
		return loopCallback(null, true);
	}
	else
	{
		return loopCallback(new Error(flaggedErrorMessage), null);
	}
	
	
}


// Maps out grid from the current node.
function visitCurrentNode(currentNode, startRowIndex, startColIndex, gMatrixObj, fullGraphObj, remainNodesList, compNodesList, cellResultObject)
{
	var startTile = cellAccess.readCell(gMatrixObj, startRowIndex, startColIndex);
	var markedLocations = [];
	var visitRes = false;
	
	if (startTile === tileSet.nodeTile)
	{
		// Navigates different directions to find dead-ends and intersections on grid.
		cellMovement.moveVertical(startRowIndex, startColIndex, gMatrixObj, markedLocations, -1);			// Up
		cellMovement.moveVertical(startRowIndex, startColIndex, gMatrixObj, markedLocations, 1);			// Down
		cellMovement.moveHorizontal(startRowIndex, startColIndex, gMatrixObj, markedLocations, -1);			// Left
		cellMovement.moveHorizontal(startRowIndex, startColIndex, gMatrixObj, markedLocations, 1);			// Right
		
		// Adds marked locations as nodes on graph.
		visitRes = markPoints.addNodesAtPositions(currentNode, markedLocations, gMatrixObj, fullGraphObj, remainNodesList, compNodesList, cellResultObject);
	}
	else if (startTile.length > 0)
	{
		// Node does not exist at coordinates.
		traverseErrorDisplay.showMissingNodeLocationError(startRowIndex, startColIndex, cellResultObject);
		visitRes = false;
	}
	else
	{
		// Cell does not exist at coordinates.
		traverseErrorDisplay.showMissingCellError(startRowIndex, startColIndex, cellResultObject);
		visitRes = false;
	}
	
	return visitRes;
}




module.exports =
{
	performGridTraverse: performGridNodeTraverse,
};