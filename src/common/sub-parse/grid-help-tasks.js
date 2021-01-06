const generalErrorText = require("./errors/general-error-text");
const lineErrorText = require("./errors/line-error-text");
const nonBinaryChars = /[^01]/g;											// Regex captures all characters except 0 and 1.


// Checks whether a given string contains only 0s and 1s.
function checkBinaryCharactersOnly(lineTxt)
{
	var matchFlag = lineTxt.search(nonBinaryChars);
	var checkRes = true;
	
	if (matchFlag >= 0 && matchFlag < lineTxt.length)
	{
		checkRes = false;
	}
	
	return checkRes;
}


// Removes all characters from a string except for 0s and 1s.
function removeNonBinaryCharacters(lineTxt)
{
	var removeRes = lineTxt.replace(nonBinaryChars, "");
	return removeRes;
}


// Checks whether it is possible to add a new parsed row to the grid.
function checkGridRowAddPossible(lineLength, maxDimension, safeRowCount, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (lineLength > 0 && lineLength <= maxDimension && safeRowCount === true)
	{
		// Row add possible.
		checkRes = true;
	}
	else if (lineLength > 0 && lineLength <= maxDimension)
	{
		// Too many existing rows.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeGridMaxDimension("Rows", maxDimension, lineLocationNumber);
	}
	else if (lineLength > maxDimension)
	{
		// Parsed row too long.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeGridMaxDimension("Columns", maxDimension, lineLocationNumber);
	}
	else
	{
		// Empty parsed row.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeGridLineEmpty(lineLocationNumber);
	}
	
	return checkRes;
}


// Grid row text line invalid error.
function flagInvalidGridRow(lineLocationNumber, outcomeObj)
{
	var flagRes = false;
	outcomeObj.messageText = lineErrorText.writeGridLineInvalid(lineLocationNumber);
	return flagRes;
}



// Validates grid dimension number.
function checkGridDimensionNumber(dNumber, maxDimension, dDesc, outcomeObj)
{
	var checkRes = false;
	
	if (dNumber >= 0 && dNumber <= maxDimension)
	{
		checkRes = true;
	}
	else if (dNumber > maxDimension)
	{
		checkRes = false;
		outcomeObj.messageText = generalErrorText.writeMaximumDimension(dDesc, maxDimension);
	}
	else
	{
		checkRes = false;
		outcomeObj.messageText = generalErrorText.writeMissingDimension(dDesc);
	}
	
	return checkRes;
}



// Retrieves the shortest and longest row sizes from a matrix object.
function getGridColumnLimits(matrixObj)
{
	var rowIndex = 0;
	var currentRowObject = [];
	var currentRowLength = -1;
	
	var statRes = {"shortest": null, "longest": null};
	
	
	for (rowIndex = 0; rowIndex < matrixObj.length; rowIndex = rowIndex + 1)
	{
		// Reads current row length
		currentRowObject = matrixObj[rowIndex];
		currentRowLength = currentRowObject.length;
		
		// Update shortest
		if (statRes.shortest === null || currentRowLength < statRes.shortest)
		{
			statRes.shortest = currentRowLength;
		}
		
		// Update longest
		if (statRes.longest === null || currentRowLength > statRes.longest)
		{
			statRes.longest = currentRowLength;
		}
		
		
	}
	
	return statRes;
}



// Used to validate whether all rows in a matrix are the same length.
function checkGridColumnLimits(matrixObj, limitObj, allowTrim, outcomeObj)
{
	var checkRes = false;
	
	if (limitObj.shortest === limitObj.longest)
	{
		// All row sizes are the same.
		checkRes = true;
	}
	else if (allowTrim === true)
	{
		// Trim to shortest length if allowed.
		trimRowsToLength(matrixObj, limitObj.shortest);
		checkRes = true;
	}
	else
	{
		// Error
		checkRes = false;
		outcomeObj.messageText = "Invalid grid dimensions. All rows must be the same length.";
	}
	
	return checkRes;
}


// Checks whether both target points on a graph have been defined when searching for entry,exit.
function checkTargetPointLoopContinue(graphObj)
{
	var checkRes = false;
	
	if (graphObj.startNodeIndex === -1 || graphObj.endNodeIndex === -1)
	{
		// If either point is undefined, keep searching.
		checkRes = true;
	}
	
	return checkRes;
}






// Trims all rows in a matrix to a specified length.
function trimRowsToLength(fullGrid, targetLength)
{
	var rowIndex = 0;
	var currentRow = [];
	var currentTrim = -1;
	
	for (rowIndex = 0; rowIndex < fullGrid.length; rowIndex = rowIndex + 1)
	{
		currentRow = fullGrid[rowIndex];
		currentTrim = currentRow.length - targetLength;
		
		if (currentTrim > 0)
		{
			currentRow.splice(targetLength, currentTrim);
		}
		
	}
	
}







module.exports =
{
	checkBinaryCharsOnly: checkBinaryCharactersOnly,
	removeNonBinaryChars: removeNonBinaryCharacters,
	checkRowAdd: checkGridRowAddPossible,
	flagInvalidRow: flagInvalidGridRow,
	checkDimensionNumber: checkGridDimensionNumber,
	getColumnLimits: getGridColumnLimits,
	checkColumnLimits: checkGridColumnLimits,
	checkTargetLoopContinue: checkTargetPointLoopContinue
};