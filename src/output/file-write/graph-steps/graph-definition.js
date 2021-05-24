const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");
const graphElements = require("../../../common/sub-output/graph-elements");
const commaItems = require("../../../common/sub-output/comma-items");

const nodeArrName = "nodeContents";				// Node array variable.
const edgeArrName = "edgeContents";				// Edge array variable.


/*
	* This file is used to dynamically write the graph contents definition into the exported HTML file.
	* Example file: "../../../../templates/web-output/b-data.html"
*/



// Main function - Common pathfinding methods.
function writeCommonDefinitionText(graphWriteStream, fullGraphObject, definitionCallback)
{
	// Begin definition script.
	handleOpeningText(graphWriteStream);
	
	// Nodes array.
	handleArrayStart(graphWriteStream, nodeArrName);
	handleCommonNodeArray(graphWriteStream, fullGraphObject.nodeList);
	handleArrayEnd(graphWriteStream);
	
	// Edges array.
	handleArrayStart(graphWriteStream, edgeArrName);
	handleEdgeArray(graphWriteStream, fullGraphObject.edgeList);
	handleArrayEnd(graphWriteStream);
	
	return definitionCallback(null, true);
}



// Main function - Blocked nodes.
function writeBlockDefinitionText(graphWriteStream, fullGraphObject, definitionCallback)
{
	handleOpeningText(graphWriteStream);
	
	handleArrayStart(graphWriteStream, nodeArrName);
	handleBlockNodeArray(graphWriteStream, fullGraphObject.nodeList);
	handleArrayEnd(graphWriteStream);
	
	handleArrayStart(graphWriteStream, edgeArrName);
	handleEdgeArray(graphWriteStream, fullGraphObject.edgeList);
	handleArrayEnd(graphWriteStream);
	
	return definitionCallback(null, true);
}



// Begin writing definition script.
function handleOpeningText(wStream)
{
	var openTxt = "";
	
	openTxt += charShortcuts.secondIndent;
	openTxt += "<script>";
	openTxt += charShortcuts.lineBreak;
	
	openTxt += charShortcuts.secondIndent;
	openTxt += charShortcuts.lineBreak;
	
	wStream.write(openTxt);
}


// Open array variable.
function handleArrayStart(wStream, aName)
{
	var startTxt = "";
	
	startTxt += charShortcuts.thirdIndent;
	startTxt += "var ";
	startTxt += aName;
	startTxt += " = ";
	startTxt += charShortcuts.lineBreak;
	
	startTxt += charShortcuts.thirdIndent;
	startTxt += "[";
	
	wStream.write(startTxt);
	
	
	/*
		var arrayName =
		[
	*/
	
}


// Close array variable.
function handleArrayEnd(wStream)
{
	var endTxt = "";
	
	endTxt += charShortcuts.lineBreak;
	endTxt += charShortcuts.thirdIndent;
	endTxt += "];";
	endTxt += charShortcuts.lineBreak;
	
	endTxt += charShortcuts.thirdIndent;
	endTxt += charShortcuts.lineBreak;
	
	wStream.write(endTxt);
}




// Prepares node graph elements.
function handleCommonNodeArray(wStream, gNodeArray)
{
	var nodeIndex = 0;
	var lastIndex = gNodeArray.length - 1;
	
	var currentNode = {};
	var currentElement = {};
	var currentLine = "";
	
	var cachedText = "";
	
	
	for (nodeIndex = 0; nodeIndex <= lastIndex; nodeIndex = nodeIndex + 1)
	{
		// Converts node object into graph element.
		currentNode = gNodeArray[nodeIndex];
		currentElement = graphElements.defineNodeElement(currentNode);
		
		// Converts graph element to text.
		currentLine = writeObjectLine(currentElement, nodeIndex, lastIndex);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			wStream.write(cachedText);
			cachedText = currentLine;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentLine;
		}
	}
	
	
	if (cachedText.length > 0)
	{
		// Write any remaining cache text to file.
		wStream.write(cachedText);
	}
}



// Prepares node graph elements, taking blocks into consideration.
function handleBlockNodeArray(wStream, gNodeArray)
{
	var nodeIndex = 0;
	var lastIndex = gNodeArray.length - 1;
	
	var currentNode = {};
	var currentElement = "";
	var currentLine = "";
	
	var cachedText = "";
	
	for (nodeIndex = 0; nodeIndex <= lastIndex; nodeIndex = nodeIndex + 1)
	{
		// Converts node object into graph element.
		currentNode = gNodeArray[nodeIndex];
		currentElement = graphElements.defineNodeElement(currentNode);
		graphElements.setNodeBlocked(currentElement, currentNode.blocked);
		
		// Converts graph element to text.
		currentLine = writeObjectLine(currentElement, nodeIndex, lastIndex);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			wStream.write(cachedText);
			cachedText = currentLine;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentLine;
		}
		
	}
	
	
	if (cachedText.length > 0)
	{
		// Write any remaining cache text to file.
		wStream.write(cachedText);
	}
	
	
}




// Prepares edge graph elements.
function handleEdgeArray(wStream, gEdgeArray)
{
	var edgeIndex = 0;
	var lastIndex = gEdgeArray.length - 1;
	
	var currentEdge = {};
	var currentElement = {};
	var currentLine = "";
	
	var cachedText = "";
	
	
	for (edgeIndex = 0; edgeIndex <= lastIndex; edgeIndex = edgeIndex + 1)
	{
		// Converts edge into graph element.
		currentEdge = gEdgeArray[edgeIndex];
		currentElement = graphElements.defineEdgeElement(currentEdge);
		
		// Converts edge element to text.
		currentLine = writeObjectLine(currentElement, edgeIndex, lastIndex);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			wStream.write(cachedText);
			cachedText = currentLine;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentLine;
		}
	}
	
	
	if (cachedText.length > 0)
	{
		// Write any remaining cache text to file.
		wStream.write(cachedText);
	}
	
	
}


// Writes given object as a line of text.
function writeObjectLine(prepObj, loopInd, lastInd)
{
	var lineRes = "";
	
	lineRes += charShortcuts.lineBreak;
	lineRes += charShortcuts.fourthIndent;
	lineRes += JSON.stringify(prepObj);
	
	
	// Adds comma to line unless this is the last object in loop.
	if (loopInd >= 0 && loopInd < lastInd)
	{
		lineRes += commaItems.com;
	}
	
	
	return lineRes;
}



module.exports =
{
	writeCommonDefinition: writeCommonDefinitionText,
	writeBlockDefinition: writeBlockDefinitionText
};