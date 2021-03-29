const tileSet = require("../../common/sub-parse/tile-set");
const absCoordinates = require("../../common/sub-parse/abs-coordinates");
const graphObjects = require("../../common/sub-graph/graph-objects");
const cellAccess = require("../../common/sub-traverse/cell-access");


/*
	* This file is used to traverse the grid in a given direction from a start point.
	* Used in order to mark new node locations.
	* Nodes can be placed at dead-ends or intersections.
*/



// Move up or down.
function moveVerticalDirection(startRow, startCol, gMatrix, markList, verOffset)
{
	var rowPosition = startRow + verOffset;
	var colPosition = startCol;
	
	var leftCol = colPosition - 1;
	var rightCol = colPosition + 1;
	
	var currentRowOffset = -1;
	var currentTile = "";
	var currentNext = "";
	var currentLeft = "";
	var currentRight = "";
	var currentIntersection = false;
	var currentMatch = -1;
	var currentCoordinates = "";
	
	var moveAllowed = true;
	
	
	// Loops until it is no longer possible to move in given direction.
	while (moveAllowed === true)
	{
		// Next row index.
		currentRowOffset = rowPosition + verOffset;
		
		// Reads current and adjacent tiles.
		currentTile = cellAccess.readCell(gMatrix, rowPosition, colPosition);
		currentNext = cellAccess.readCell(gMatrix, currentRowOffset, colPosition);
		currentLeft = cellAccess.readCell(gMatrix, rowPosition, leftCol);
		currentRight = cellAccess.readCell(gMatrix, rowPosition, rightCol);
		
		// Checks whether node can be placed on current tile.
		currentIntersection = checkIntersectionFound(currentLeft, currentRight);
		currentMatch = checkMarkPointFound(currentTile, currentNext, currentIntersection);
		currentCoordinates = "";
		
		
		if (currentMatch > 0)
		{
			// Node placement possible. Mark coordinates.
			currentCoordinates = absCoordinates.writeBasicCoordinates(rowPosition, colPosition);
			markList.push(currentCoordinates);
			moveAllowed = false;
		}
		else if (currentMatch === 0)
		{
			// Move to next row.
			rowPosition = currentRowOffset;
		}
		else
		{
			// Not allowed.
			moveAllowed = false;
		}
		
	}
	
	
}



// Move left or right.
function moveHorizontalDirection(startRow, startCol, gMatrix, markList, horOffset)
{
	var rowPosition = startRow;
	var colPosition = startCol + horOffset;
	
	var upRow = startRow - 1;
	var downRow = startRow + 1;
	
	var currentColOffset = -1;
	var currentTile = "";
	var currentNext = "";
	var currentUp = "";
	var currentDown = "";
	var currentIntersection = false;
	var currentMatch = -1;
	var currentCoordinates = "";
	
	var moveAllowed = true;
	
	
	// Loops until it is no longer possible to move in given direction.
	while (moveAllowed === true)
	{
		// Next column index.
		currentColOffset = colPosition + horOffset;
		
		// Reads current and adjacent tiles.
		currentTile = cellAccess.readCell(gMatrix, rowPosition, colPosition);
		currentNext = cellAccess.readCell(gMatrix, rowPosition, currentColOffset);
		currentUp = cellAccess.readCell(gMatrix, upRow, colPosition);
		currentDown = cellAccess.readCell(gMatrix, downRow, colPosition);
		
		// Checks whether node can be placed on current tile.
		currentIntersection = checkIntersectionFound(currentUp, currentDown);
		currentMatch = checkMarkPointFound(currentTile, currentNext, currentIntersection);
		currentCoordinates = "";
		
		if (currentMatch > 0)
		{
			// Node placement possible. Mark coordinates.
			currentCoordinates = absCoordinates.writeBasicCoordinates(rowPosition, colPosition);
			markList.push(currentCoordinates);
			moveAllowed = false;
		}
		else if (currentMatch === 0)
		{
			// Move to next column.
			colPosition = currentColOffset;
		}
		else
		{
			// Not allowed.
			moveAllowed = false;
		}
		
	}
	
}



// Checks for intersection based on adjacent tiles.
function checkIntersectionFound(tileA, tileB)
{
	var foundA = false;
	var foundB = false;
	var interRes = false;
	
	// First
	if (tileA === tileSet.floorTile || tileA === tileSet.nodeTile)
	{
		foundA = true;
	}
	
	// Second
	if (tileB === tileSet.floorTile || tileB === tileSet.nodeTile)
	{
		foundB = true;
	}
	
	// Result
	if (foundA === true || foundB === true)
	{
		interRes = true;
	}
	
	
	
	return interRes;
}



// Checks whether node can be placed at current location.
function checkMarkPointFound(cTile, nextTile, intersectionFound)
{
	var markRes = -1;
	
	if (cTile === tileSet.nodeTile)
	{
		// Node already exists.
		markRes = 1;
	}
	else if (cTile === tileSet.floorTile && intersectionFound === true)
	{
		// Intersection.
		markRes = 1;
	}
	else if (cTile === tileSet.floorTile && nextTile === tileSet.wallTile)
	{
		// Dead end.
		markRes = 1;
	}
	else if (cTile === tileSet.floorTile)
	{
		// Keep going.
		markRes = 0;
	}
	else
	{
		// Invalid tile.
		markRes = -1;
	}
	
	return markRes;
}





module.exports =
{
	moveVertical: moveVerticalDirection,
	moveHorizontal: moveHorizontalDirection
};