const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const graphObjects = require("../../../common/sub-graph/graph-objects");
const findNodes = require("../../../common/sub-graph/find-nodes");
const valueLimits = require("../../../common/value-limits");
const csvAttributes = require("../../../common/sub-output/csv-attributes");


// This file writes a list of edge coordinates for conversion output files.


// Main function
function writeEdgeCoordinatesList(cWriteStream, fullGraphObject)
{
	var positionIndex = 0;
	var lastPosition = fullGraphObject.edgeList.length - 1;
	
	var currentEdgeObject = {};
	var currentOriginCoordinates = "";
	var currentDestinationCoordinates = "";
	var currentLineString = "";
	
	var cachedText = "";
	
	// Loop iterates through all graph edges.
	for (positionIndex = 0; positionIndex <= lastPosition; positionIndex = positionIndex + 1)
	{
		// Reads edge coordinates.
		currentEdgeObject = fullGraphObject.edgeList[positionIndex];
		currentOriginCoordinates = readEdgeCoordinates(currentEdgeObject.origin, fullGraphObject.nodeList);
		currentDestinationCoordinates = readEdgeCoordinates(currentEdgeObject.destination, fullGraphObject.nodeList);
		
		// Writes edge coordinates as text line.
		currentLineString = prepareEdgeLine(currentOriginCoordinates, currentDestinationCoordinates, positionIndex, lastPosition);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			cWriteStream.write(cachedText);
			cachedText = currentLineString;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentLineString;
		}
		
	}
	
	// Write remaining cache text to file.
	if (cachedText.length > 0)
	{
		cWriteStream.write(cachedText);
	}
	
	
}


// Gets coordinates from Node ID.
function readEdgeCoordinates(eNodeID, gNodeList)
{
	var matchFlag = findNodes.checkNodeNumberExists(eNodeID, gNodeList);
	var retrievedNodeObject = {};
	var readRes = "";
	
	if (matchFlag >= 0 && matchFlag < gNodeList.length)
	{
		// Node exists. Write coordinates.
		retrievedNodeObject = gNodeList[matchFlag];
		readRes = graphObjects.stringifyNodeCoordinates(retrievedNodeObject);
	}
	else
	{
		// Node does not exist. Unknown coordinates.
		readRes = csvAttributes.errorString;
	}
	
	return readRes;
}


// Writes the edge node coordinates into a line of text.
function prepareEdgeLine(originPart, destPart, eIndex, eLast)
{
	var prepRes = originPart + " - " + destPart;
	
	if (eIndex >= 0 && eIndex < eLast)
	{
		prepRes = prepRes + charShortcuts.lineBreak;
	}
	
	return prepRes;
	
	
	// eg. "1,2 - 3,4"
}




module.exports =
{
	writeEdgeList: writeEdgeCoordinatesList
};