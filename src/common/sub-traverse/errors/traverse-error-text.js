// Writes error text related to grid traversal.


// Missing node object.
function writeMissingNodeObjectText()
{
	var fullText = "Node object is missing.";
	return fullText;
}


// Missing node at coordinates.
function writeMissingNodeCoordinatesText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "There is no Node located at the coordinates ";
	fullText += showCoordinates(vRow, vCol);
	
	return fullText;
}


// Cell does not exist.
function writeMissingCellText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "Cell does not exist. ";
	fullText += showCoordinates(vRow, vCol);
	
	return fullText;
}


// Maximum traversed objects.
function writeMaximumTraversedObjectsText(vType, vCount)
{
	var fullText = "";
	
	fullText += "Graph cannot contain more than ";
	fullText += vCount;
	fullText += " traversed ";
	fullText += vType;
	fullText += " objects.";
	
	return fullText;
}


// Invalid node location.
function writeNodeBadPositionText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "The coordinates ";
	fullText += showCoordinates(vRow, vCol);
	fullText += " is not a valid location to add a graph Node.";
	
	return fullText;
}


// Node add error.
function writeNodeAddErrorText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "Could not successfully add Node object at cell ";
	fullText += showCoordinates(vRow, vCol);
	fullText += ".";
	
	return fullText;
}


// Node same ID error.
function writeNodeKeyErrorText(vNum)
{
	var fullText = "";
	
	fullText += "Two Node objects cannot have the same ID: ";
	fullText += vNum;
	fullText += ".";
	
	return fullText;
}


// Edge same coordinates error.
function writeEdgeDistanceErrorText(vKeyA, vKeyB)
{
	var fullText = "";
	
	fullText += "Nodes ";
	fullText += vKeyA;
	fullText += " and ";
	fullText += vKeyB;
	fullText += " cannot use the same coordinates. ";
	fullText += "There must be some distance between them.";
	
	return fullText;
}


// Node number does not exist error.
function writeNodeNumberDoesNotExistText(vNodeNumber)
{
	var writeRes = "Node ID " + vNodeNumber + " does not exist.";
	return writeRes;
}


// Invalid edge direction error.
function writeInvalidEdgeDirectionText(vOriginCoord, vDestCoord)
{
	var writeRes = "";
	
	writeRes += "Node edge paths may not be diagonal. ";
	writeRes += showCoordinates(vOriginCoord.row, vOriginCoord.col);
	writeRes += " - ";
	writeRes += showCoordinates(vDestCoord.row, vDestCoord.col);
	
	return writeRes;
}



// Writes coordinates.
function showCoordinates(shRow, shCol)
{
	// (100,200)
	var joinedNumbers = [shRow, shCol].join();
	var cPart = "(" + joinedNumbers + ")";
	return cPart;
}



module.exports =
{
	writeMissingNodeObject: writeMissingNodeObjectText,
	writeMissingNodeCoordinates: writeMissingNodeCoordinatesText,
	writeMissingCell: writeMissingCellText,
	writeMaximumTraversedObjects: writeMaximumTraversedObjectsText,
	writeNodeBadPosition: writeNodeBadPositionText,
	writeNodeAddError: writeNodeAddErrorText,
	writeNodeKeyError: writeNodeKeyErrorText,
	writeEdgeDistanceError: writeEdgeDistanceErrorText,
	writeNodeNumberDoesNotExist: writeNodeNumberDoesNotExistText,
	writeInvalidEdgeDirection: writeInvalidEdgeDirectionText
};