const lineByLine = require("line-by-line");
const gridHelpTasks = require("../../../common/sub-parse/grid-help-tasks");
const parseHelpTasks = require("../../../common/sub-parse/parse-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const lineTypes = require("../../../common/sub-parse/line-types");
const tileSet = require("../../../common/sub-parse/tile-set");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");


// Parses input text file into a grid matrix object.



// Main function.
function parseGridTextFile(tgtInputPath, ignoreTxtErrs, gridCallback)
{
	var lineCountNumber = 0;											// Current line number.
	var retrievedGridObject = parseObjects.initializeGrid();			// Result grid.
	var canContinue = true;												// Parse successful.
	var flaggedErrorMessage = "";										// Error text
	var lineStreamObject = new lineByLine(tgtInputPath);				// Opens input file and reads by line.
	
	
	// File read error.
	lineStreamObject.on('error', function(rError)
	{
		canContinue = false;
		flaggedErrorMessage = streamExceptions.getFileRead("Grid Input", rError.code);
		lineStreamObject.close();
	});
	
	
	// Read text line.
	lineStreamObject.on('line', function(currentLineText)
	{
		lineStreamObject.pause();
		lineCountNumber = lineCountNumber + 1;
		var lineObject = readCurrentLine(currentLineText, ignoreTxtErrs, lineCountNumber, retrievedGridObject);
		
		if (lineObject.valid === true || ignoreTxtErrs === true)
		{
			// Continue reading lines.
			lineStreamObject.resume();
		}
		else if (canContinue === true)
		{
			// Stop reading lines.
			canContinue = false;
			flaggedErrorMessage = lineObject.messageText;
			lineStreamObject.close();
			lineStreamObject.resume();
		}
		else
		{
			// File closing
			canContinue = false;
			lineStreamObject.resume();
		}
		
	});
	
	
	
	// File closed.
	lineStreamObject.on('end', function()
	{
		if (canContinue === true)
		{
			return gridCallback(null, retrievedGridObject);
		}
		else
		{
			return gridCallback(new Error(flaggedErrorMessage), null);
		}
	});
}




// Reads current line text.
function readCurrentLine(origLineText, ignoreErr, lineNumber, retGridObj)
{
	var outcomeResultObject = parseObjects.defineLineOutcome();
	var safeLength = parseHelpTasks.checkSafeLength(origLineText.length, valueLimits.maxGridLineLength, lineNumber, outcomeResultObject);
	
	var prepLineText = "";
	var gridLineType = false;
	var canUse = false;
	
	var readSuccessful = false;
	
	
	if (safeLength === true)
	{
		prepLineText = valuePrep.sanitizeString(origLineText);			// Removes spaces and casing from line text.
		gridLineType = lineTypes.checkNumber(prepLineText);				// Checks if line starts with number.
		canUse = true;
	}
	
	
	if (canUse === true && gridLineType === true)
	{
		// Starts with number. Parse line text as grid.
		readSuccessful = handleGridLine(prepLineText, lineNumber, retGridObj, ignoreErr, outcomeResultObject);
	}
	else if (canUse === true)
	{
		// Does not start with number. Ignore safely.
		readSuccessful = true;
	}
	else
	{
		// Invalid line length. Error has already been flagged.
		readSuccessful = false;
	}
	
	outcomeResultObject.valid = readSuccessful;
	
	return outcomeResultObject;
}



// Parses current line into a grid row.
function handleGridLine(numberTxt, lineNum, retGrid, ignoreNonbinary, oResObj)
{
	var formatValid = gridHelpTasks.checkBinaryCharsOnly(numberTxt);
	var cleanTxt = "";
	var gridLineRes = false;
	
	if (formatValid === true)
	{
		// Create new row.
		gridLineRes = addNewGridRow(numberTxt, retGrid.gridMatrix, lineNum, oResObj);
	}
	else if (ignoreNonbinary === true)
	{
		// Remove invalid characters and create new row.
		cleanTxt = gridHelpTasks.removeNonBinaryChars(numberTxt);
		gridLineRes = addNewGridRow(cleanTxt, retGrid.gridMatrix, lineNum, oResObj);
	}
	else
	{
		// Invalid characters error.
		gridLineRes = gridHelpTasks.flagInvalidRow(lineNum, oResObj);
	}
	
	return gridLineRes;
}




function addNewGridRow(rTxt, rgMatrix, nLine, oRes)
{
	var safeRowCount = valuePrep.checkNumberRange(rgMatrix.length, 0, valueLimits.maxGridDimension);
	var addPossible = gridHelpTasks.checkRowAdd(rTxt.length, valueLimits.maxGridDimension, safeRowCount, nLine, oRes);
	
	var finalRowText = "";
	var splitTiles = [];
	
	var addSuccessful = false;
	
	if (addPossible === true)
	{
		// Add row to grid.
		finalRowText = tileSet.swapEntryCharacters(rTxt);				// Converts binary numbers to tile characters.
		splitTiles = finalRowText.split("");
		rgMatrix.push(splitTiles);
		addSuccessful = true;
	}
	
	
	return addSuccessful;
}





module.exports =
{
	parseGridFile: parseGridTextFile
};