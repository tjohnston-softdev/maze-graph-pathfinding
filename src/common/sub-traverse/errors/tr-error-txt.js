// Writes error text related to grid traversal.

function writeMissingNodeObjectText()
{
	var fullText = "Node object is missing.";
	return fullText;
}


function writeMissingNodeCoordinatesText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "There is no Node located at the coordinates ";
	fullText += showCoordinates(vRow, vCol);
	
	return fullText;
}



function writeMissingCellText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "Cell does not exist. ";
	fullText += showCoordinates(vRow, vCol);
	
	return fullText;
}



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


function writeNodeBadPositionText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "The coordinates ";
	fullText += showCoordinates(vRow, vCol);
	fullText += " is not a valid location to add a graph Node.";
	
	return fullText;
}



function writeNodeAddErrorText(vRow, vCol)
{
	var fullText = "";
	
	fullText += "Could not successfully add Node object at cell ";
	fullText += showCoordinates(vRow, vCol);
	fullText += ".";
	
	return fullText;
}



function writeNodeKeyErrorText(vNum)
{
	var fullText = "";
	
	fullText += "Two Node objects cannot have the same ID: ";
	fullText += vNum;
	fullText += ".";
	
	return fullText;
}


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
	writeEdgeDistanceError: writeEdgeDistanceErrorText
};