const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const findNodes = require("../../../common/sub-graph/find-nodes");
const valueLimits = require("../../../common/value-limits");
const csvAttributes = require("../../../common/sub-output/csv-attributes");


// This file writes a list of edges for relative conversion output files.


// Main function.
function writeEdgeList(cWriteStream, fullGraphObject)
{
	var positionIndex = 0;
	var lastPosition = fullGraphObject.edgeList.length - 1;
	
	var currentEdgeObject = {};
	var currentOriginID = "";
	var currentDestinationID = "";
	var currentDistance = "";
	var currentLineText = "";
	
	var cachedText = "";
	
	for (positionIndex = 0; positionIndex <= lastPosition; positionIndex = positionIndex + 1)
	{
		// Read current edge.
		currentEdgeObject = fullGraphObject.edgeList[positionIndex];
		currentOriginID = readNodeID(currentEdgeObject.origin, fullGraphObject.nodeList);
		currentDestinationID = readNodeID(currentEdgeObject.destination, fullGraphObject.nodeList);
		currentDistance = currentEdgeObject.distance;
		
		
		// Write definition text.
		currentLineText = prepareEdgeLine(currentOriginID, currentDestinationID, currentDistance, positionIndex, lastPosition);
		
		
		if (cachedText.length > valueLimits.cacheLength)
		{
			// Write cached text to file.
			cWriteStream.write(cachedText);
			cachedText = currentLineText;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentLineText;
		}
	}
	
	
	// Write remaining cache text to file.
	if (cachedText.length > 0)
	{
		cWriteStream.write(cachedText);
	}
}



// Reads node ID from edge.
function readNodeID(eNodeID, gNodeList)
{
	var matchFlag = findNodes.checkNodeNumberExists(eNodeID, gNodeList);
	var readRes = "";
	
	if (matchFlag >= 0 && matchFlag < gNodeList.length)
	{
		// Node exists.
		readRes = eNodeID;
	}
	else
	{
		// Unknown.
		readRes = csvAttributes.errorString;
	}
	
	return readRes;
}



// Writes edge definition line.
function prepareEdgeLine(originPart, destPart, distancePart, eIndex, eLast)
{
	var prepRes = [originPart, destPart, distancePart].join();
	
	if (eIndex >= 0 && eIndex < eLast)
	{
		// Add line break for next edge.
		prepRes = prepRes + charShortcuts.lineBreak;
	}
	
	return prepRes;
}




module.exports =
{
	writeEdges: writeEdgeList
};