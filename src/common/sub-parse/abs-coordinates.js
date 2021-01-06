// This file contains functions for working with coordinates when parsing absolute text files and traversing grids.



// Used to read coordinate value substrings from prepared input text.
function readEnteredCoordinatesText(splitObj, cIndex)
{
	var enteredStringRes = "";
	
	// If there is a substring at the given index, retrieve it.
	if (splitObj.length > cIndex)
	{
		enteredStringRes = splitObj[cIndex];
	}
	
	return enteredStringRes;
}




// Used to parse coordinates string into an object.
function parseCoordinatesString(sText)
{
	var splitObject = sText.split(",");
	var rowPart = "";
	var colPart = "";
	
	var coordRes = {"retrievedRow": -1, "retrievedCol": -1};
	
	if (splitObject.length >= 2)
	{
		rowPart = splitObject[0];
		colPart = splitObject[1];
		
		coordRes.retrievedRow = Number(rowPart);
		coordRes.retrievedCol = Number(colPart);
	}
	
	
	return coordRes;
}


// Checks whether a prepared coordinates object is valid.
function checkCoordinatesObjectValid(cObject)
{
	var checkRes = false;
	
	if (cObject.retrievedRow > 0 && cObject.retrievedCol > 0)
	{
		checkRes = true;
	}
	
	return checkRes;
}


// Writes coordinates into a string.
function writeBasicCoordinatesString(rPart, cPart)
{
	var stringRes = rPart + "," + cPart;
	return stringRes;
}




module.exports =
{
	readEnteredCoordinates: readEnteredCoordinatesText,
	parseCoordinates: parseCoordinatesString,
	checkCoordinatesValid: checkCoordinatesObjectValid,
	writeBasicCoordinates: writeBasicCoordinatesString
};