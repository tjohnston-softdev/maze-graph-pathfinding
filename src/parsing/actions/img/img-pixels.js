const jimp = require("jimp");
const imageHelpTasks = require("../../../common/sub-parse/image-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const tileSet = require("../../../common/sub-parse/tile-set");
const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");
const mathTasks = require("../../../common/math-tasks");


// Parses input image file into a grid matrix object.


// Main function.
function parseImagePixelsLoop(tgtImageObj, tgtImageSettings, tgtImageColours, ignoreImgErrs, loopCallback)
{
	var rowPosition = tgtImageSettings.originY;
	var rowCutoff = tgtImageObj.bitmap.height;
	
	var currentRowOutcome = {};
	var currentRowRead = false;
	var currentAddPossible = false;
	
	var retrievedGridObject = parseObjects.initializeGrid();
	var canContinue = true;
	var flaggedErrorMessage = "";
	
	// Loops through image pixels row-by-row, starting from the origin point.
	while (rowPosition >= 0 && rowPosition >= tgtImageSettings.originY && rowPosition < rowCutoff && canContinue === true)
	{
		currentRowOutcome = parseObjects.definePixelRowOutcome();
		currentRowRead = readCurrentPixelRow(rowPosition, tgtImageObj, tgtImageSettings, tgtImageColours, ignoreImgErrs, currentRowOutcome);
		currentAddPossible = false;
		
		if (currentRowRead === true)
		{
			// Checks whether parsed row can be added to the grid.
			currentAddPossible = callAddValidation(rowPosition, tgtImageSettings.originX, retrievedGridObject, currentRowOutcome);
		}
		
		if (currentAddPossible === true)
		{
			// Add row to grid.
			retrievedGridObject.gridMatrix.push(currentRowOutcome.tileList);
			retrievedGridObject.successful = true;
		}
		
		if (retrievedGridObject.successful !== true)
		{
			// Parse error detected.
			canContinue = false;
			flaggedErrorMessage = currentRowOutcome.messageText;
		}
		
		// Moves to next tile row.
		rowPosition = rowPosition + tgtImageSettings.tileSize;
	}
	
	
	
	if (canContinue === true)
	{
		return loopCallback(null, retrievedGridObject);
	}
	else
	{
		return loopCallback(new Error(flaggedErrorMessage), null);
	}
	
}


// Row pixel loop.
function readCurrentPixelRow(rowPos, tgtImage, tgtSettings, tgtColours, ignoreErrs, rowOutcomeObject)
{
	var colPosition = tgtSettings.originX;
	var colCutoff = tgtImage.bitmap.width;
	
	var currentPixelData = null;
	var currentPixelRGB = {};
	var currentWall = -1;
	var currentFloor = -1;
	var currentTileValid = false;
	
	var loopSuccessful = true;
	var requiredSimilarity = tgtSettings.tolerancePercent;
	
	
	// Reads individual pixels on the current row, starting from X origin.
	while (colPosition >= 0 && colPosition >= tgtSettings.originX && colPosition < colCutoff && loopSuccessful === true)
	{
		// Reads current pixel colour as RGB.
		currentPixelData = tgtImage.getPixelColor(colPosition, rowPos);
		currentPixelRGB = jimp.intToRGBA(currentPixelData);
		
		// Measures difference between pixel and target colours.
		currentFloor = mathTasks.calculateColourDifference(currentPixelRGB, tgtColours.floorRGB);
		currentWall = mathTasks.calculateColourDifference(currentPixelRGB, tgtColours.wallRGB);
		currentTileValid = false;
		
		
		if (currentWall >= valueLimits.minPercentage && currentWall <= requiredSimilarity && currentWall <= valueLimits.maxPercentage)
		{
			// Wall tile found.
			rowOutcomeObject.tileList.push(tileSet.wallTile);
			currentTileValid = true;
		}
		else if (currentFloor >= valueLimits.minPercentage && currentFloor <= requiredSimilarity && currentFloor <= valueLimits.maxPercentage)
		{
			// Floor tile found.
			rowOutcomeObject.tileList.push(tileSet.floorTile);
			currentTileValid = true;
		}
		else if (ignoreErrs === true)
		{
			// Ignore safely.
			currentTileValid = true;
		}
		else
		{
			// Pixel error.
			currentTileValid = imageHelpTasks.flagInvalidPixel(colPosition, rowPos, rowOutcomeObject);
			loopSuccessful = false;
		}
		
		// Move to next tile on pixel row.
		colPosition = colPosition + tgtSettings.tileSize;
	}
	
	
	return loopSuccessful;
}



// Row add validation.
function callAddValidation(rowPos, colPos, retrievedGrid, rowOutcomeObject)
{
	var pixelsRead = rowOutcomeObject.tileList.length;
	var safeRowCount = valuePrep.checkNumberRange(retrievedGrid.gridMatrix.length, 0, valueLimits.maxGridDimension);
	var addPossible = imageHelpTasks.checkRowAddPossible(pixelsRead, valueLimits.maxGridDimension, safeRowCount, colPos, rowPos, rowOutcomeObject);
	
	return addPossible;
}




module.exports =
{
	parseImagePixels: parseImagePixelsLoop
};