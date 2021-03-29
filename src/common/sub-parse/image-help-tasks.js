const imageErrorText = require("./errors/image-error-text");



// Checks whether image dimensions are valid.
function checkImageDimensionNumbersValid(widthNumber, heightNumber, minPixels, maxPixels, outcomeObj)
{
	var widthValid = false;
	var heightValid = false;
	
	var checkRes = false;
	
	
	// Check width.
	if (widthNumber >= minPixels && widthNumber <= maxPixels)
	{
		widthValid = true;
	}
	
	
	// Check height.
	if (heightNumber >= minPixels && heightNumber <= maxPixels)
	{
		heightValid = true;
	}
	
	
	if (widthValid === true && heightValid === true)
	{
		// Dimensions valid.
		checkRes = true;
	}
	else
	{
		// Invalid dimensions.
		checkRes = false;
		outcomeObj.messageText = imageErrorText.writeDimensionsError(maxPixels, widthNumber, heightNumber);
	}
	
	
	return checkRes;
}


// Checks whether the target origin coordnates exist on the image.
function checkOriginPointCoordinatesExist(originPointX, originPointY, imgWidth, imgHeight, outcomeObj)
{
	var xExists = false;
	var yExists = false;
	
	var checkRes = false;
	
	
	// X point.
	if (originPointX >= 0 && originPointX < imgWidth)
	{
		xExists = true;
	}
	
	
	// Y point.
	if (originPointY >= 0 && originPointY < imgHeight)
	{
		yExists = true;
	}
	
	
	
	if (xExists === true && yExists === true)
	{
		// Origin exists.
		checkRes = true;
	}
	else
	{
		// Origin missing.
		checkRes = false;
		outcomeObj.messageText = imageErrorText.writeUnknownOrigin(originPointX, originPointY);
	}
	
	
	return checkRes;
}


// Displays image pixel colour error.
function flagInvalidPixelColour(badPixelX, badPixelY, outcomeObj)
{
	var flagRes = false;
	outcomeObj.messageText = imageErrorText.writeBadPixel(badPixelX, badPixelY);
	return flagRes;
}


// Checks whether it is possible to add a new parsed row of image pixels to the tile grid.
function checkImageRowAddPossible(pCount, maxDimension, safeRowCount, originPointX, rowPointY, outcomeObj)
{
	var checkRes = false;
	
	if (pCount > 0 && pCount <= maxDimension && safeRowCount === true)
	{
		// Row add possible.
		checkRes = true;
	}
	else if (pCount > 0 && pCount <= maxDimension)
	{
		// Too many existing rows.
		checkRes = false;
		outcomeObj.messageText = imageErrorText.writeMaxRows(maxDimension, originPointX, rowPointY);
	}
	else if (pCount > maxDimension)
	{
		// Parsed row too long.
		checkRes = false;
		outcomeObj.messageText = imageErrorText.writeMaxCols(maxDimension, originPointX, rowPointY);
	}
	else
	{
		// No pixels parsed.
		checkRes = false;
		outcomeObj.messageText = imageErrorText.writeEmptyRow(originPointX, rowPointY);
	}
	
	return checkRes;
}




module.exports =
{
	checkImageDimensionsValid: checkImageDimensionNumbersValid,
	checkOriginPointExists: checkOriginPointCoordinatesExist,
	flagInvalidPixel: flagInvalidPixelColour,
	checkRowAddPossible: checkImageRowAddPossible
};