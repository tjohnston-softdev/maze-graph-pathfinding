const tileSet = require("../../common/sub-parse/tile-set");
const absCoordinates = require("../../common/sub-parse/abs-coordinates");
const parseObjects = require("../../common/sub-parse/parse-objects");
const graphObjects = require("../../common/sub-graph/graph-objects");
const findEdges = require("../../common/sub-graph/find-edges");
const traverseHelpTasks = require("../../common/sub-traverse/traverse-help-tasks");
const traverseErrorDisplay = require("../../common/sub-traverse/traverse-error-display");
const cellAccess = require("../../common/sub-traverse/cell-access");
const valueLimits = require("../../common/value-limits");
const mathTasks = require("../../common/math-tasks");


/*
	* Used to add graph nodes at marked coordinates when traversing grids.
	* This also adds edges between marked nodes and the origin point.
*/



// Main function.
function addNodeObjectsAtMarkedPositions(originalNode, markList, gMatrix, fullGraph, remainNodes, compNodes, cellResult)
{
	var markIndex = 0;
	var currentCoordinatesString = "";
	var currentCoordinatesObject = {};
	var currentRowIndex = -1;
	var currentColIndex = -1;
	var currentTileChar = "";
	var currentTileValid = false;
	
	var currentRowOffset = -1;
	var currentColOffset = -1;
	var currentRowPosition = -1;
	var currentColPosition = -1;
	var currentNodeSearch = {};
	var currentNodeAdded = false;
	
	var currentMarkedNode = {};
	var currentDifferentKeys = false;
	var currentEdgeAdded = false;
	
	var addSafe = true;
	
	
	// Loop through marked locations until error reached.
	while (markIndex >= 0 && markIndex < markList.length && addSafe === true)
	{
		// Read grid index position.
		currentCoordinatesString = markList[markIndex];
		currentCoordinatesObject = absCoordinates.parseCoordinates(currentCoordinatesString);
		currentRowIndex = currentCoordinatesObject.retrievedRow;
		currentColIndex = currentCoordinatesObject.retrievedCol;
		
		// Read tile from coordinates.
		currentTileChar = cellAccess.readCell(gMatrix, currentRowIndex, currentColIndex);
		currentTileValid = checkMarkTileValid(currentTileChar, currentRowIndex, currentColIndex, cellResult);
		
		currentRowOffset = -1;
		currentColOffset = -1;
		currentRowPosition = -1;
		currentColPosition = -1;
		currentNodeSearch = {};
		currentNodeAdded = false;
		
		currentMarkedNode = {};
		currentDifferentKeys = false;
		currentEdgeAdded = false;
		
		
		if (currentTileValid === true)
		{
			// Convert grid index position to graph coordinates.
			currentRowOffset = currentRowIndex + 1;
			currentColOffset = currentColIndex + 1;
			currentRowPosition = currentRowOffset * graphObjects.scaleFactor;
			currentColPosition = currentColOffset * graphObjects.scaleFactor;
			
			// Adds node at coordinates.
			currentNodeSearch = updateNodeListByCoordinates(currentRowPosition, currentColPosition, fullGraph);
			currentNodeAdded = callNodeAddValidation(currentNodeSearch, fullGraph.nodeList.length, currentRowIndex, currentColIndex, cellResult);
		}
		
		
		if (currentNodeAdded === true)
		{
			// Reads added node object.
			currentMarkedNode = fullGraph.nodeList[currentNodeSearch.matchIndex];
			currentDifferentKeys = traverseHelpTasks.checkNodeKeysDifferent(originalNode.nodeID, currentMarkedNode.nodeID, cellResult);
		}
		
		if (currentDifferentKeys === true)
		{
			// Adds edge between added node and origin point.
			currentEdgeAdded = updateEdgeList(originalNode, currentMarkedNode, fullGraph, cellResult);
		}
		
		if (currentEdgeAdded === true)
		{
			// Added node will be traversed in the future.
			traverseHelpTasks.markNodeUnvisited(currentNodeSearch.matchIndex, remainNodes, compNodes);
			cellAccess.setCell(gMatrix, currentRowIndex, currentColIndex, tileSet.nodeTile);
			cellResult.successful = true;
		}
		
		if (cellResult.successful !== true)
		{
			// Error found.
			addSafe = false;
		}
		
		
		markIndex = markIndex + 1;
	}
	
}



function updateEdgeList(nOrig, nMarked, gObject, cellRes)
{
	var updateRequired = findEdges.checkEdgeAvailable(nOrig.nodeID, nMarked.nodeID, gObject.edgeList);
	var updateRes = false;
	
	if (updateRequired === true)
	{
		// Create edge.
		updateRes = createNewEdge(nOrig, nMarked, gObject.edgeList, cellRes);
	}
	else
	{
		// Edge already exists.
		updateRes = true;
	}
	
	return updateRes;
}


// Adds edge between two nodes.
function createNewEdge(originObj, destObj, gEdgeList, cRes)
{
	var projectedDistance = mathTasks.calculateNodeDistance(originObj, destObj);
	var distanceValid = traverseHelpTasks.checkEdgeDistance(originObj.nodeID, destObj.nodeID, projectedDistance);
	var edgePossible = traverseHelpTasks.checkEdgePossible(originObj.nodeID, destObj.nodeID, distanceValid, gEdgeList.length, valueLimits.maxEdgeCount, cRes);
	
	var newID = -1;
	var newEdgeObject = {};
	var createRes = false;
	
	if (edgePossible === true)
	{
		// Create object.
		newID = gEdgeList.length + 1;
		newEdgeObject = graphObjects.defineEdge(newID, originObj.nodeID, destObj.nodeID, projectedDistance);
		gEdgeList.push(newEdgeObject);
		
		createRes = true;
	}
	
	
	return createRes;
}





// Adds or retrieves graph node from coordinates.
function updateNodeListByCoordinates(rowPos, colPos, gObject)
{
	var existFlag = graphObjects.checkCoordinatesExist(rowPos, colPos, gObject.nodeList);
	
	var newID = -1;
	var newNodeObject = {};
	var addRes = parseObjects.defineNodeSearch();
	
	
	if (existFlag >= 0 && existFlag < gObject.nodeList.length)
	{
		// Node already exists.
		addRes.matchIndex = existFlag;
		addRes.overflow = false;
	}
	else if (gObject.nodeList.length >= 0 && gObject.nodeList.length < valueLimits.maxNodeCount)
	{
		// Create new node.
		newID = gObject.nodeList.length + 1;
		newNodeObject = graphObjects.defineNode(newID, rowPos, colPos, undefined);
		gObject.nodeList.push(newNodeObject);
		
		addRes.matchIndex = gObject.nodeList.length - 1;
		addRes.overflow = false;
	}
	else if (gObject.nodeList.length >= valueLimits.maxNodeCount)
	{
		// Too many nodes.
		addRes.matchIndex = -1;
		addRes.overflow = true;
	}
	else
	{
		// Error.
		addRes.matchIndex = -1;
		addRes.overflow = false;
	}
	
	return addRes;
}



// Validates whether node was added successfully at marked coordinates.
function callNodeAddValidation(sObj, rNodeCount, rowInd, colInd, cellRes)
{
	var addSuccessful = traverseHelpTasks.checkNodeAdded(sObj, rNodeCount, valueLimits.maxNodeCount, rowInd, colInd, cellRes);
	return addSuccessful;
}



// Double checks whether node can be placed on given tile.
function checkMarkTileValid(subjectTile, rowInd, colInd, cellRes)
{
	var mTileValid = false;
	
	if (subjectTile === tileSet.floorTile || subjectTile === tileSet.nodeTile)
	{
		// Valid.
		mTileValid = true;
	}
	else if (subjectTile.length > 0)
	{
		// Bad position.
		traverseErrorDisplay.showBadNodePositionError(rowInd, colInd, cellRes);
		mTileValid = false;
	}
	else
	{
		// Missing cell.
		traverseErrorDisplay.showMissingCellError(rowInd, colInd, cellRes);
		mTileValid = false;
	}
	
	return mTileValid;
}





module.exports =
{
	addNodesAtPositions: addNodeObjectsAtMarkedPositions
};