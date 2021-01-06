// These functions write error text for parsing image files.

function writeDimensionsErrorText(vMaxPixels, vWidth, vHeight)
{
	var fullText = "";
	
	fullText += "Image dimensions cannot be any larger than ";
	fullText += vMaxPixels;
	fullText += " pixels. ";
	fullText += showDimensions(vWidth, vHeight);
	
	return fullText;
}


function writeUnknownOriginText(vOriginX, vOriginY)
{
	var fullText = "";
	
	fullText += "Image origin point does not exist. ";
	fullText += showCoordinates(vOriginX, vOriginY);
	
	return fullText;
}


function writeBadPixelText(vPixelX, vPixelY)
{
	var fullText = "";
	
	fullText += "Invalid Pixel. Colour is too distant from the target colours given. ";
	fullText += showCoordinates(vPixelX, vPixelY);
	
	return fullText;
}


function writeMaxRowsText(vLimit, vOriginX, vRowY)
{
	var fullText = "";
	
	fullText += "Only ";
	fullText += vLimit;
	fullText += " rows of tiles can be parsed from an image. ";
	fullText += showRowStartCoordinates(vOriginX, vRowY);
	
	return fullText;
}


function writeMaxColsText(vLimit, vOriginX, vRowY)
{
	var fullText = "";
	
	fullText += "Only "
	fullText += vLimit;
	fullText += " tiles can be parsed from a single row of pixels. ";
	fullText += showRowStartCoordinates(vOriginX, vRowY);
	
	return fullText;
	
}


function writeEmptyRowText(vOriginX, vOriginY)
{
	var fullText = "";
	
	fullText += "No tiles were successfully parsed from the pixel row starting at coordinates: ";
	fullText += showRowStartCoordinates(vOriginX, vRowY);
	fullText += ".";
	
	return fullText;
}


function writeTileConversionText(vTileX, vTileY)
{
	var fullText = "";
	
	fullText += "Invalid tiles present on grid. ";
	fullText += showCoordinates(vTileX, vTileY);
	
	return fullText;
}





function showDimensions(tWidth, tHeight)
{
	// (123x456)
	var dPart = ["(", tWidth, "x", tHeight, ")"].join("");
	return dPart;
}


function showCoordinates(tCoordX, tCoordY)
{
	// (123,456)
	var cPart = ["(", tCoordX, ",", tCoordY, ")"].join("");
	return cPart;
}


function showRowStartCoordinates(tCoordX, tCoordX)
{
	// (123,456 onwards)
	var cPart = ["(", tCoordX, ",", tCoordY, " onwards)"].join("");
	return cPart;
}



module.exports =
{
	writeDimensionsError: writeDimensionsErrorText,
	writeUnknownOrigin: writeUnknownOriginText,
	writeBadPixel: writeBadPixelText,
	writeMaxRows: writeMaxRowsText,
	writeMaxCols: writeMaxColsText,
	writeEmptyRow: writeEmptyRowText,
	writeTileConversion: writeTileConversionText
};