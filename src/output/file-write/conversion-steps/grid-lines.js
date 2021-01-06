const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const valueLimits = require("../../../common/value-limits");

// This file writes grid row lines for conversion output files.


// Main function
function writeGridLines(cWriteStream, fullGridObject)
{
	var rowIndex = 0;
	var lastRow = fullGridObject.length - 1;
	
	var currentRowObject = [];
	var currentRowString = "";
	
	var cachedText = "";
	
	// Loop iterates through each row in prepared grid.
	for (rowIndex = 0; rowIndex <= lastRow; rowIndex = rowIndex + 1)
	{
		currentRowObject = fullGridObject[rowIndex];
		currentRowString = prepareRow(currentRowObject, rowIndex, lastRow);
		
		
		if (cachedText.length >= valueLimits.cacheLength)
		{
			// Write cached text to file.
			cWriteStream.write(cachedText);
			cachedText = currentRowString;
		}
		else
		{
			// Add to cache.
			cachedText = cachedText + currentRowString;
		}
		
	}
	
	// Write remaining cached text to file.
	if (cachedText.length > 0)
	{
		cWriteStream.write(cachedText);
	}
}



// Converts grid row object to text string.
function prepareRow(rObj, rPosition, lastPosition)
{
	var prepRes = rObj.join("");
	
	if (rPosition >= 0 && rPosition < lastPosition)
	{
		// Adds line break for next row.
		prepRes = prepRes + charShortcuts.lineBreak;
	}
	
	return prepRes;
}




module.exports =
{
	writeLines: writeGridLines
};