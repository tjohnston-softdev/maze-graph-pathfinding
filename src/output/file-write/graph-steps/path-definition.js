const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");
const graphElements = require("../../../common/sub-output/graph-elements");
const commaItems = require("../../../common/sub-output/comma-items");

const objectNameShortcut = "var pathContents =";


/*
	* This file is used to dynamically write the result object definition into the exported HTML file.
	* Example file: "../../../../templates/web-output/b-data.html"
*/



// Main function - Single path.
function writeSinglePathDefinition(graphWriteStream, fullPathObject, definitionCallback)
{
	handleResultOpen(graphWriteStream);
	handleShortestPathSequence(graphWriteStream, fullPathObject.sequence);
	handleShortestPathDistance(graphWriteStream, fullPathObject);
	handleOutcomeProperties(graphWriteStream, fullPathObject);
	handleResultClose(graphWriteStream);
	handleClosingText(graphWriteStream);
	
	return definitionCallback(null, true);
}


// Main function - Multiple paths.
function writeMultiplePathDefinition(graphWriteStream, multPathsObject, definitionCallback)
{
	handleResultOpen(graphWriteStream);
	handleAllPathsSequence(graphWriteStream, multPathsObject.completedPaths);
	handleAllPossibleOverflow(graphWriteStream, multPathsObject.overflow);
	handleOutcomeProperties(graphWriteStream, multPathsObject);
	handleResultClose(graphWriteStream);
	handleClosingText(graphWriteStream);
	
	return definitionCallback(null, true);
}


// Main function - Blocked nodes.
function writeBlockPathDefinition(graphWriteStream, bPathsObject, definitionCallback)
{
	handleResultOpen(graphWriteStream);
	handleBlockedNodesCount(graphWriteStream, bPathsObject);
	handleOutcomeProperties(graphWriteStream, bPathsObject);
	handleResultClose(graphWriteStream);
	handleClosingText(graphWriteStream);
	
	return definitionCallback(null, true);
}



// Main function - Blank pathfinding.
function writeBlankPathDefinition(graphWriteStream, definitionCallback)
{
	handleBlankResult(graphWriteStream);
	handleClosingText(graphWriteStream);
	return definitionCallback(null, true);
}


// Open result object.
function handleResultOpen(wStream)
{
	var resOpenTxt = "";
	
	resOpenTxt += charShortcuts.thirdIndent;
	resOpenTxt += objectNameShortcut;
	resOpenTxt += charShortcuts.lineBreak;
	
	resOpenTxt += charShortcuts.thirdIndent;
	resOpenTxt += "{";
	resOpenTxt += charShortcuts.lineBreak;
	
	wStream.write(resOpenTxt);
	
	
	/*
		var pathContents =
		{
	*/
	
}

// Close result object.
function handleResultClose(wStream)
{
	var resCloseTxt = charShortcuts.thirdIndent + "};";
	wStream.write(resCloseTxt);
}

// End definition script. Graph Structure complete.
function handleClosingText(wStream)
{
	var closeTxt = "";
	
	closeTxt += charShortcuts.lineBreak;
	closeTxt += charShortcuts.secondIndent;
	closeTxt += charShortcuts.lineBreak;
	
	closeTxt += charShortcuts.secondIndent;
	closeTxt += "</script>";
	closeTxt += charShortcuts.lineBreak;
	
	wStream.write(closeTxt);
}



// Blank result object.
function handleBlankResult(wStream)
{
	var blankResTxt = "";
	
	blankResTxt += charShortcuts.thirdIndent;
	blankResTxt += objectNameShortcut;
	blankResTxt += " {};";
	
	wStream.write(blankResTxt);
}


// Writes 'sequence' property for single path.
function handleShortestPathSequence(wStream, seqArr)
{
	var positionIndex = 0;
	var lastPosition = seqArr.length - 1;
	
	var currentNumber = -1;
	var currentString = "";
	
	var cachedText = "";
	
	// Open sequence array.
	cachedText += charShortcuts.fourthIndent;
	cachedText += "sequence: [";
	
	
	// Loops through all Node IDs in the completed route.
	for (positionIndex = 0; positionIndex <= lastPosition; positionIndex = positionIndex + 1)
	{
		currentNumber = seqArr[positionIndex];
		currentString = commaItems.writeSequenceNodeNumber(currentNumber, positionIndex, lastPosition);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			wStream.write(cachedText);
			cachedText = currentString;
		}
		else
		{
			// Add text to cache.
			cachedText = cachedText + currentString;
		}
	}
	
	// Close sequence array.
	cachedText += "],";
	cachedText += charShortcuts.lineBreak;
	wStream.write(cachedText);
}



// Writes 'completedPaths' property for multiple paths.
function handleAllPathsSequence(wStream, pathArr)
{
	var pathIndex = 0;
	var lastPathNumber = pathArr.length - 1;
	var currentPathObject = {};
	
	var positionIndex = 0;
	var lastPositionNumber = -1;
	
	var currentNumber = -1;
	var currentString = "";
	
	var cachedText = "";
	
	
	// Open completed paths outer array.
	cachedText += charShortcuts.fourthIndent;
	cachedText += "completedPaths:";
	cachedText += charShortcuts.lineBreak;
	
	cachedText += charShortcuts.fourthIndent;
	cachedText += "[";
	cachedText += charShortcuts.lineBreak;
	
	
	// Loops through saved paths.
	for (pathIndex = 0; pathIndex <= lastPathNumber; pathIndex = pathIndex + 1)
	{
		currentPathObject = pathArr[pathIndex];
		
		positionIndex = 0;
		lastPositionNumber = currentPathObject.sequence.length - 1;
		
		currentNumber = -1;
		currentString = "";
		
		// Opens sequence array for current path.
		cachedText += charShortcuts.fifthIndent;
		cachedText += "{sequence: [";
		
		// Loops through all Node IDs in the current completed route.
		while (positionIndex >= 0 && positionIndex <= lastPositionNumber)
		{
			currentNumber = currentPathObject.sequence[positionIndex];
			currentString = commaItems.writeSequenceNodeNumber(currentNumber, positionIndex, lastPositionNumber);
			
			if (cachedText.length >= valueLimits.cacheLength)
			{
				// Write cached text to file.
				wStream.write(cachedText);
				cachedText = currentString;
			}
			else
			{
				// Add text to cache.
				cachedText = cachedText + currentString;
			}
			
			positionIndex = positionIndex + 1;
		}
		
		
		// Close sequence array. Current route completed.
		cachedText += "], totalDistance: ";
		cachedText += String(currentPathObject.totalDistance);
		cachedText += commaItems.writePathObjectClose(pathIndex, lastPathNumber);
		cachedText += charShortcuts.lineBreak;
	}
	
	
	// Close completed paths outer array.
	cachedText += charShortcuts.fourthIndent;
	cachedText += "],";
	cachedText += charShortcuts.lineBreak;
	
	
	// Write remaining text to file.
	wStream.write(cachedText);
	
}


// Writes 'overflow' property for multiple paths.
function handleAllPossibleOverflow(wStream, oState)
{
	var overflowTxt = "";
	
	overflowTxt += charShortcuts.fourthIndent;
	overflowTxt += "overflow: ";
	overflowTxt += oState;
	overflowTxt += commaItems.com;
	overflowTxt += charShortcuts.lineBreak;
	
	wStream.write(overflowTxt);
}




// Writes 'totalDistance' property for single path.
function handleShortestPathDistance(wStream, pthObj)
{
	var distString = String(pthObj.totalDistance);
	var detailsTxt = "";
	
	detailsTxt += charShortcuts.fourthIndent;
	detailsTxt += "totalDistance: ";
	detailsTxt += distString;
	detailsTxt += commaItems.com;
	detailsTxt += charShortcuts.lineBreak;
	
	wStream.write(detailsTxt);
}


// Writes 'blockCount' for blocked nodes result object.
function handleBlockedNodesCount(wStream, pthObj)
{
	var countString = String(pthObj.blockCount);
	var countTxt = "";
	
	countTxt += charShortcuts.fourthIndent;
	countTxt += "blockCount: ";
	countTxt += countString;
	countTxt += commaItems.com;
	countTxt += charShortcuts.lineBreak;
	
	wStream.write(countTxt);
}



// Writes 'successful' and 'messageText' properties.
function handleOutcomeProperties(wStream, pthObj)
{
	var detailsTxt = "";
	
	// Successful.
	detailsTxt += charShortcuts.fourthIndent;
	detailsTxt += "successful: ";
	detailsTxt += pthObj.successful;
	detailsTxt += commaItems.com;
	detailsTxt += charShortcuts.lineBreak;
	
	// Error message text.
	detailsTxt += charShortcuts.fourthIndent;
	detailsTxt += "messageText: '";
	detailsTxt += pthObj.messageText;
	detailsTxt += charShortcuts.quote;
	detailsTxt += charShortcuts.lineBreak;
	
	wStream.write(detailsTxt);
}





module.exports =
{
	writeSingle: writeSinglePathDefinition,
	writeMultiple: writeMultiplePathDefinition,
	writeBlock: writeBlockPathDefinition,
	writeBlank: writeBlankPathDefinition
};