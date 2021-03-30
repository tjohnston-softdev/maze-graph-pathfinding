const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");


// This file writes a list of nodes for relative conversion output files.


// Main function.
function writeNodesList(cWriteStream, nList)
{
	var positionIndex = 0;
	var lastPosition = nList.length - 1;
	
	var currentNodeObject = {};
	var currentLineString = "";
	
	var cachedText = "";
	
	for (positionIndex = 0; positionIndex <= lastPosition; positionIndex = positionIndex + 1)
	{
		// Reads node and writes definition.
		currentNodeObject = nList[positionIndex];
		currentLineString = prepareNodeLine(currentNodeObject, positionIndex, lastPosition);
		
		
		if (cachedText.length > valueLimits.cacheLength)
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



// Writes node definition line.
function prepareNodeLine(nodeObject, loopIndex, lastIndex)
{
	var prepRes = [nodeObject.nodeID, nodeObject.calculatedHeuristic].join();
	
	if (loopIndex >= 0 && loopIndex < lastIndex)
	{
		// Add line break for next node.
		prepRes = prepRes + charShortcuts.lineBreak;
	}
	
	return prepRes;
}





module.exports =
{
	writeNodes: writeNodesList
};