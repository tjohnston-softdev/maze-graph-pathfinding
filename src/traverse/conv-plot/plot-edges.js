const tileSet = require("../../common/sub-parse/tile-set");
const traverseHelpTasks = require("../../common/sub-traverse/traverse-help-tasks");
const traverseErrorDisplay = require("../../common/sub-traverse/traverse-error-display");
const graphObjects = require("../../common/sub-graph/graph-objects");
const cellAccess = require("../../common/sub-traverse/cell-access");
const findNodes = require("../../common/sub-graph/find-nodes");

const directions = {HORI: 1, VERT: 2};


/*
	* This file places floor tiles between nodes based on mapped edges.
	* Used when converting parsed graphs into tile grids.
*/


// Main function.
function plotEdgePathTiles(gObject, mapGridObj, plotCallback)
{
	var edgeIndex = 0;
	var currentEdgeObject = {};
	var currentOriginIndex = -1;
	var currentDestinationIndex = -1;
	var currentOriginExists = false;
	var currentDestinationExists = false;
	var currentOriginCoordinates = null;
	var currentDestinationCoordinates = null;
	var currentDirection = -1;
	var currentSuccessful = false;
	
	var loopObject = traverseHelpTasks.defineCellTraverse();
	loopObject.successful = true;
	
	
	// Loop edges until end reached or error caught.
	while (edgeIndex >= 0 && edgeIndex < gObject.edgeList.length && loopObject.successful === true)
	{
		// Read current edge and find connected nodes.
		currentEdgeObject = gObject.edgeList[edgeIndex];
		currentOriginIndex = findNodes.checkIdExists(currentEdgeObject.origin, gObject.nodeList);
		currentDestinationIndex = findNodes.checkIdExists(currentEdgeObject.destination, gObject.nodeList);
		
		// Validate origin node.
		currentOriginExists = verifyNodeExists(currentEdgeObject.origin, currentOriginIndex, gObject.nodeList.length, loopObject);
		
		currentDestinationExists = false;
		currentOriginCoordinates = null;
		currentDestinationCoordinates = null;
		currentDirection = {};
		
		if (currentOriginExists === true)
		{
			// Validate destination node.
			currentDestinationExists = verifyNodeExists(currentEdgeObject.destination, currentDestinationIndex, gObject.nodeList.length, loopObject);
		}
		
		if (currentDestinationExists === true)
		{
			// Read origin coordinates.
			currentOriginCoordinates = getEdgeNodeCoordinates(mapGridObj, currentOriginIndex, gObject.nodeList, loopObject);
		}
		
		if (currentOriginCoordinates !== null)
		{
			// Read destination coordinates.
			currentDestinationCoordinates = getEdgeNodeCoordinates(mapGridObj, currentDestinationIndex, gObject.nodeList, loopObject);
		}
		
		if (currentDestinationCoordinates !== null)
		{
			// Choose grid map direction.
			currentDirection = chooseDirection(currentOriginCoordinates, currentDestinationCoordinates, loopObject);
		}
		
		
		if (currentDirection.plane === directions.HORI)
		{
			// Map tiles horizontallly.
			currentSuccessful = setHorizontalPath(mapGridObj, currentOriginCoordinates, currentDestinationCoordinates, currentDirection.offset, loopObject);
		}
		else if (currentDirection.plane === directions.VERT)
		{
			// Map tiles vertically.
			currentSuccessful = setVerticalPath(mapGridObj, currentOriginCoordinates, currentDestinationCoordinates, currentDirection.offset, loopObject);
		}
		else
		{
			// Invalid edge direction.
			currentSuccessful = false;
		}
		
		
		if (currentSuccessful !== true)
		{
			// Abort loop.
			loopObject.successful = false;
		}
		
		edgeIndex = edgeIndex + 1;
	}
	
	
	if (loopObject.successful === true)
	{
		// Edge paths mapped successfully.
		return plotCallback(null, true);
	}
	else
	{
		// Error caught.
		return plotCallback(new Error(loopObject.errorText), null);
	}
	
}


// Check if edge node exists based on index value.
function verifyNodeExists(idNumber, nIndex, nCount, loopObj)
{
	var verifyRes = false;
	
	if (nIndex >= 0 && nIndex < nCount)
	{
		// Exists.
		verifyRes = true;
	}
	else
	{
		// Error.
		traverseErrorDisplay.showUnknownNodeNumberError(idNumber, loopObj);
	}
	
	return verifyRes;
}


// Get tile coordinates from graph node.
function getEdgeNodeCoordinates(gridObj, nIndex, nList, loopObj)
{
	var edgeNodeObject = nList[nIndex];
	
	var rowCellIndex = graphObjects.convertCoordinatesToIndex(edgeNodeObject.rowNumber);
	var colCellIndex = graphObjects.convertCoordinatesToIndex(edgeNodeObject.colNumber);
	var cellExists = traverseHelpTasks.checkCellExists(gridObj, rowCellIndex, colCellIndex, loopObj);
	
	var coordRes = null;
	
	if (cellExists === true)
	{
		coordRes = {"row": rowCellIndex, "col": colCellIndex};
	}
	
	return coordRes;
}



// Calculate edge direction between target nodes.
function chooseDirection(originCoord, destCoord, loopObj)
{
	var directionRes = {plane: -1, offset: null};
	var flaggedMessage = "";
	
	if (originCoord.row === destCoord.row && destCoord.col > originCoord.col)
	{
		// Right
		directionRes.plane = directions.HORI;
		directionRes.offset = 1;
	}
	else if (originCoord.row === destCoord.row && destCoord.col < originCoord.col)
	{
		// Left
		directionRes.plane = directions.HORI;
		directionRes.offset = -1;
	}
	else if (originCoord.col === destCoord.col && destCoord.row > originCoord.row)
	{
		// Down
		directionRes.plane = directions.VERT;
		directionRes.offset = 1;
	}
	else if (originCoord.col === destCoord.col && destCoord.row < originCoord.row)
	{
		// Up
		directionRes.plane = directions.VERT;
		directionRes.offset = -1;
	}
	else
	{
		// Invalid
		traverseErrorDisplay.showInvalidEdgeDirectionError(originCoord, destCoord, loopObj);
	}
	
	return directionRes;
}


// Add floor tiles along horizontal edge.
function setHorizontalPath(gridObj, originCoord, destCoord, moveOffset, loopObj)
{
	var rowIndex = originCoord.row;
	var colIndex = originCoord.col;
	var colTarget = destCoord.col;
	
	var currentExists = false;
	var pathLoopFlag = 0;
	var setRes = false;
	
	
	// Loop until destination node reached or end of plane.
	while (pathLoopFlag === 0)
	{
		// Checks if current tile exists.
		currentExists = traverseHelpTasks.checkCellExists(gridObj, rowIndex, colIndex, loopObj);
		
		if (currentExists === true && colIndex === colTarget)
		{
			// Target found.
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			pathLoopFlag = 1;
		}
		else if (currentExists === true)
		{
			// Keep going.
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			colIndex = colIndex + moveOffset;
		}
		else
		{
			// End of plane.
			pathLoopFlag = -1;
		}
	}
	
	setRes = (pathLoopFlag > 0);
	return setRes;
}


// Add floor tiles along vertical edge.
function setVerticalPath(gridObj, originCoord, destCoord, moveOffset, loopObj)
{
	var colIndex = originCoord.col;
	var rowIndex = originCoord.row;
	var rowTarget = destCoord.row;
	
	var currentExists = false;
	var pathLoopFlag = 0;
	var setRes = false;
	
	// Loop until destination node reached or end of plane.
	while (pathLoopFlag === 0)
	{
		// Checks if current tile exists.
		currentExists = traverseHelpTasks.checkCellExists(gridObj, rowIndex, colIndex, loopObj);
		
		if (currentExists === true && rowIndex === rowTarget)
		{
			// Target found.
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			pathLoopFlag = 1;
		}
		else if (currentExists === true)
		{
			// Keep going.
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			rowIndex = rowIndex + moveOffset;
		}
		else
		{
			// End of plane.
			pathLoopFlag = -1;
		}
	}
	
	setRes = (pathLoopFlag > 0);
	return setRes;
}



module.exports =
{
	plotTiles: plotEdgePathTiles
};