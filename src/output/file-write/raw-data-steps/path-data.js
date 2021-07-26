const fs = require("fs");
const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");
const writeOptions = require("../../../common/sub-files/write-options");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const writtenFile = require("../../../common/sub-output/written-file");
const commaItems = require("../../../common/sub-output/comma-items");


// Writes pathfinding result data as a JSON file.
function createRawPathDataFile(destPaths, fullPathObject, pathCountNumber, dataFileCallback)
{
	var fileResultObject = writtenFile.initializeWriteResult();
	var dataFileStream = fs.createWriteStream(destPaths.rawSequenceFile, writeOptions.streamSettings);
	
	
	// Write error.
	dataFileStream.on('error', function (wError)
	{
		var flaggedMessageText = streamExceptions.getFileWrite("Path Data", fileResultObject.created);
		
		fileResultObject.successful = false;
		fileResultObject.errorMessageText = flaggedMessageText;
		
		dataFileStream.end();
	});
	
	
	// Created successfully.
	dataFileStream.on('ready', function()
	{
		fileResultObject.created = true;
		writePathContents(dataFileStream, fullPathObject, pathCountNumber);
		dataFileStream.end();
	});
	
	
	// Write complete.
	dataFileStream.on('finish', function()
	{
		if (fileResultObject.successful === true)
		{
			return dataFileCallback(null, true);
		}
		else
		{
			return dataFileCallback(new Error(fileResultObject.errorMessageText), null);
		}
	});
	
	
}


// Decides how to write JSON data based on number of paths saved.
function writePathContents(dfsStream, fullPathObj, pathCount)
{
	if (pathCount === 1)
	{
		// Single
		handleOpen(dfsStream);
		handleSinglePathLoop(dfsStream, fullPathObj);
		handleSingleDistance(dfsStream, fullPathObj);
		handleOutcomeProperties(dfsStream, fullPathObj);
		handleClose(dfsStream);
	}
	else if (pathCount >= 2)
	{
		// Multiple
		handleOpen(dfsStream);
		handleMultiplePathLoop(dfsStream, fullPathObj);
		handleOutcomeProperties(dfsStream, fullPathObj);
		handleClose(dfsStream);
	}
	else
	{
		// None
		handleBlankPlaceholder(dfsStream, fullPathObj);
	}
}


// Writes result object definition automatically.
function handleBlankPlaceholder(dStream, pathObj)
{
	var definitionSyntax = JSON.stringify(pathObj, null, 4);
	dStream.write(definitionSyntax);
}



// Opens result object.
function handleOpen(dStream)
{
	var openTxt = "{" + charShortcuts.lineBreak;
	dStream.write(openTxt);
}


// Writes node route sequence for single path.
function handleSinglePathLoop(dStream, pathObj)
{
	var positionIndex = 0;
	var lastPosition = pathObj.sequence.length - 1;
	
	var currentNumber = -1;
	var currentString = "";
	var currentLine = "";
	
	var cacheText = "";
	
	
	// Opens sequence array
	cacheText += charShortcuts.firstIndent;
	cacheText += '"sequence":';
	cacheText += charShortcuts.lineBreak;
	
	cacheText += charShortcuts.firstIndent;
	cacheText += "[";
	cacheText += charShortcuts.lineBreak;
	
	
	// Loop writes Node IDs line-by-line for sequence array.
	for (positionIndex = 0; positionIndex <= lastPosition; positionIndex = positionIndex + 1)
	{
		// Read current Node ID.
		currentNumber = pathObj.sequence[positionIndex];
		currentString = commaItems.writeSequenceNodeNumber(currentNumber, positionIndex, lastPosition);
		currentLine = "";
		
		
		// Append text.
		currentLine += charShortcuts.secondIndent;
		currentLine += currentString;
		currentLine += charShortcuts.lineBreak;
		
		
		if (cacheText.length >= valueLimits.cacheLength)
		{
			// Writes cached text to file.
			dStream.write(cacheText);
			cacheText = currentLine;
		}
		else
		{
			// Add to cache.
			cacheText = cacheText + currentLine;
		}
	}
	
	
	// Closes sequence array.
	cacheText += charShortcuts.firstIndent;
	cacheText += "],";
	cacheText += charShortcuts.lineBreak;
	
	dStream.write(cacheText);
}



// Writes node route sequence for multiple paths.
function handleMultiplePathLoop(dStream, pathObj)
{
	var pathIndex = 0;
	var lastPath = pathObj.completedPaths.length - 1;
	var currentPathObject = {};
	var currentSequence = [];
	var currentDistance = "";
	
	var positionIndex = 0;
	var lastPosition = -1;
	var currentNumber = -1;
	var currentString = "";
	var currentLine = "";
	
	var cacheText = "";
	
	
	// Opens completed paths array.
	cacheText += charShortcuts.firstIndent;
	cacheText += '"completedPaths":';
	cacheText += charShortcuts.lineBreak;
	
	cacheText += charShortcuts.firstIndent;
	cacheText += "[";
	cacheText += charShortcuts.lineBreak;
	
	
	// Outer loop iterates through all saved paths.
	for (pathIndex = 0; pathIndex <= lastPath; pathIndex = pathIndex + 1)
	{
		// Reads current path object.
		currentPathObject = pathObj.completedPaths[pathIndex];
		currentSequence = currentPathObject.sequence;
		currentDistance = String(currentPathObject.totalDistance);
		
		positionIndex = 0;
		lastPosition = currentSequence.length - 1;
		currentNumber = -1;
		currentString = "";
		currentLine = "";
		
		// Opens route sequence array.
		cacheText += charShortcuts.secondIndent;
		cacheText += "{";
		cacheText += charShortcuts.lineBreak;
		
		cacheText += charShortcuts.thirdIndent;
		cacheText += '"sequence":';
		cacheText += charShortcuts.lineBreak;
		
		cacheText += charShortcuts.thirdIndent;
		cacheText += "[";
		cacheText += charShortcuts.lineBreak;
		
		// Inner loop writes Node IDs line-by-line for sequence array.
		while (positionIndex >= 0 && positionIndex <= lastPosition)
		{
			currentNumber = currentSequence[positionIndex];
			currentString = commaItems.writeSequenceNodeNumber(currentNumber, positionIndex, lastPosition);
			currentLine = "";
			
			currentLine += charShortcuts.fourthIndent;
			currentLine += currentString;
			currentLine += charShortcuts.lineBreak;
			
			if (cacheText.length >= valueLimits.cacheLength)
			{
				// Write cached text to file.
				dStream.write(cacheText);
				cacheText = currentLine;
			}
			else
			{
				// Add to cache.
				cacheText = cacheText + currentLine;
			}
			
			positionIndex = positionIndex + 1;
		}
		
		
		// Close route sequence array.
		cacheText += charShortcuts.thirdIndent;
		cacheText += "],";
		cacheText += charShortcuts.lineBreak;
		
		// Write route distance.
		cacheText += charShortcuts.thirdIndent;
		cacheText += '"totalDistance": ';
		cacheText += currentDistance;
		cacheText += charShortcuts.lineBreak;
		
		// Current route complete.
		cacheText += charShortcuts.secondIndent;
		cacheText += commaItems.writePathObjectClose(pathIndex, lastPath);
		cacheText += charShortcuts.lineBreak;
	}
	
	
	// Closes route array.
	cacheText += charShortcuts.firstIndent;
	cacheText += "],";
	cacheText += charShortcuts.lineBreak;
	
	
	dStream.write(cacheText);
}



// Writes 'totalDistance' property for single path.
function handleSingleDistance(dStream, pathObj)
{
	var distString = String(pathObj.totalDistance);
	var detailsTxt = "";
	
	detailsTxt += charShortcuts.firstIndent;
	detailsTxt += '"totalDistance": ';
	detailsTxt += distString;
	detailsTxt += commaItems.com;
	detailsTxt += charShortcuts.lineBreak;
	
	dStream.write(detailsTxt);
}


// Writes 'successful' and 'messageText' properties.
function handleOutcomeProperties(dStream, pathObj)
{
	var detailsTxt = "";
	
	
	// Successful.
	detailsTxt += charShortcuts.firstIndent;
	detailsTxt += '"successful": ';
	detailsTxt += pathObj.successful;
	detailsTxt += commaItems.com;
	detailsTxt += charShortcuts.lineBreak;
	
	
	// Message text.
	detailsTxt += charShortcuts.firstIndent;
	detailsTxt += '"messageText": "';
	detailsTxt += pathObj.messageText;
	detailsTxt += '"';
	detailsTxt += charShortcuts.lineBreak;
	
	dStream.write(detailsTxt);
}


// Closes result object.
function handleClose(dStream)
{
	dStream.write("}");
}


module.exports =
{
	createPathFile: createRawPathDataFile
};