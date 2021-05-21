const tileSet = require("../../common/sub-parse/tile-set");
const traverseHelpTasks = require("../../common/sub-traverse/traverse-help-tasks");
const graphObjects = require("../../common/sub-graph/graph-objects");
const cellAccess = require("../../common/sub-traverse/cell-access");
const findNodes = require("../../common/sub-graph/find-nodes");

const directions = {HORI: 1, VERT: 2};


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
	
	while (edgeIndex >= 0 && edgeIndex < gObject.edgeList.length && loopObject.successful === true)
	{
		currentEdgeObject = gObject.edgeList[edgeIndex];
		currentOriginIndex = findNodes.checkNodeNumberExists(currentEdgeObject.origin, gObject.nodeList);
		currentDestinationIndex = findNodes.checkNodeNumberExists(currentEdgeObject.destination, gObject.nodeList);
		currentOriginExists = verifyNodeExists(currentEdgeObject.origin, currentOriginIndex, gObject.nodeList.length, loopObject);
		currentDestinationExists = false;
		currentOriginCoordinates = null;
		currentDestinationCoordinates = null;
		currentDirection = {};
		
		if (currentOriginExists === true)
		{
			currentDestinationExists = verifyNodeExists(currentEdgeObject.destination, currentDestinationIndex, gObject.nodeList.length, loopObject);
		}
		
		if (currentDestinationExists === true)
		{
			currentOriginCoordinates = getEdgeNodeCoordinates(mapGridObj, currentOriginIndex, gObject.nodeList, loopObject);
		}
		
		if (currentOriginCoordinates !== null)
		{
			currentDestinationCoordinates = getEdgeNodeCoordinates(mapGridObj, currentDestinationIndex, gObject.nodeList, loopObject);
		}
		
		if (currentDestinationCoordinates !== null)
		{
			currentDirection = chooseDirection(currentOriginCoordinates, currentDestinationCoordinates, loopObject);
		}
		
		if (currentDirection.plane === directions.HORI)
		{
			currentSuccessful = setHorizontalPath(mapGridObj, currentOriginCoordinates, currentDestinationCoordinates, currentDirection.offset, loopObject);
		}
		else if (currentDirection.plane === directions.VERT)
		{
			currentSuccessful = setVerticalPath(mapGridObj, currentOriginCoordinates, currentDestinationCoordinates, currentDirection.offset, loopObject);
		}
		else
		{
			currentSuccessful = false;
		}
		
		
		if (currentSuccessful !== true)
		{
			loopObject.successful = false;
		}
		
		edgeIndex = edgeIndex + 1;
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


function verifyNodeExists(idNumber, nIndex, nCount, loopObj)
{
	var verifyRes = false;
	
	if (nIndex >= 0 && nIndex < nCount)
	{
		verifyRes = true;
	}
	else
	{
		loopObj.errorText = "Node ID " + idNumber + " does not exist.";
	}
	
	return verifyRes;
}


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



function chooseDirection(originCoord, destCoord, loopObj)
{
	var directionRes = {plane: -1, offset: null};
	var flaggedMessage = "";
	
	if (originCoord.row === destCoord.row && destCoord.col > originCoord.col)
	{
		directionRes.plane = directions.HORI;
		directionRes.offset = 1;
	}
	else if (originCoord.row === destCoord.row && destCoord.col < originCoord.col)
	{
		directionRes.plane = directions.HORI;
		directionRes.offset = -1;
	}
	else if (originCoord.col === destCoord.col && destCoord.row > originCoord.row)
	{
		directionRes.plane = directions.VERT;
		directionRes.offset = 1;
	}
	else if (originCoord.col === destCoord.col && destCoord.row < originCoord.row)
	{
		directionRes.plane = directions.VERT;
		directionRes.offset = -1;
	}
	else
	{
		flaggedMessage += "Node edge paths may not be diagonal. (";
		flaggedMessage += [originCoord.row, originCoord.col].join();
		flaggedMessage += " - ";
		flaggedMessage += [destCoord.row, destCoord.col].join();
		flaggedMessage += ")";
		
		loopObj.errorText = flaggedMessage;
	}
	
	return directionRes;
}



function setHorizontalPath(gridObj, originCoord, destCoord, moveOffset, loopObj)
{
	var rowIndex = originCoord.row;
	var colIndex = originCoord.col;
	var colTarget = destCoord.col;
	
	var currentExists = false;
	var pathLoopFlag = 0;
	var setRes = false;
	
	
	while (pathLoopFlag === 0)
	{
		currentExists = traverseHelpTasks.checkCellExists(gridObj, rowIndex, colIndex, loopObj);
		
		if (currentExists === true && colIndex === colTarget)
		{
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			pathLoopFlag = 1;
		}
		else if (currentExists === true)
		{
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			colIndex = colIndex + moveOffset;
		}
		else
		{
			pathLoopFlag = -1;
		}
	}
	
	setRes = (pathLoopFlag > 0);
	return setRes;
}


function setVerticalPath(gridObj, originCoord, destCoord, moveOffset, loopObj)
{
	var colIndex = originCoord.col;
	var rowIndex = originCoord.row;
	var rowTarget = destCoord.row;
	
	var currentExists = false;
	var pathLoopFlag = 0;
	var setRes = false;
	
	
	while (pathLoopFlag === 0)
	{
		currentExists = traverseHelpTasks.checkCellExists(gridObj, rowIndex, colIndex, loopObj);
		
		if (currentExists === true && rowIndex === rowTarget)
		{
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			pathLoopFlag = 1;
		}
		else if (currentExists === true)
		{
			cellAccess.setCell(gridObj, rowIndex, colIndex, tileSet.floorTile);
			rowIndex = rowIndex + moveOffset;
		}
		else
		{
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