const ora = require("ora");
const jimp = require("jimp");

// This file is used to generate an image file from a parsed input grid.


// Main function.
function createImageFile(inpBaseObject, inpGridObject, createImageCallback)
{
	var imageSpinner = ora("Generating Image File").start();
	
	coordinateImageCreation(inpBaseObject, inpGridObject, function (createErr)
	{
		if (createErr !== null)
		{
			imageSpinner.fail("Error Generating Image");
			return createImageCallback(createErr, null);
		}
		else
		{
			imageSpinner.succeed("Image Generated Successfully");
			return createImageCallback(null, true);
		}
	});
}


// Initialize image.
function coordinateImageCreation(baseObject, gridObject, coordImgCallback)
{
	// Calculate image dimensions based on grid.
	var tileSizeNum = baseObject.imageItems.tileSize;
	var imageWidth = calculateWidth(gridObject, tileSizeNum);
	var imageHeight = gridObject.length * tileSizeNum;
	
	// Create image object.
	new jimp(imageWidth, imageHeight, "#FFFFFF", function (imageErr, imageObject)
	{
		if (imageErr !== null)
		{
			// JIMP error.
			return coordImgCallback(imageErr, null);
		}
		else
		{
			// Begin generation.
			colourImageTiles(imageObject, gridObject, baseObject.imageItems, tileSizeNum);
			saveImageFile(baseObject, imageObject, coordImgCallback);
		}
	});
}


// Saves image file after it has been generated.
function saveImageFile(baseObj, gridImageObj, saveCallback)
{
	var targetOutputPath = baseObj.preparedPaths.writePath;
	
	gridImageObj.write(targetOutputPath, function (saveErr, saveRes)
	{
		if (saveErr !== null)
		{
			// Error saving image.
			return saveCallback(saveErr, null);
		}
		else
		{
			// Successful.
			return saveCallback(null, true);
		}
	});
}



// Colours the generated image according to the grid tiles.
function colourImageTiles(outputImage, gridObj, imgOpts, inpTileSize)
{
	var rowIndex = 0;
	var currentRow = [];
	var colIndex = 0;
	var currentTile = "";
	var currentStartX = -1;
	var currentStartY = -1;
	
	// Convert chosen tile colours to hexadecimal.
	var hexadecWall = jimp.cssColorToHex(imgOpts.wallColour);
	var hexadecFloor = jimp.cssColorToHex(imgOpts.floorColour);
	
	
	// Loop grid rows.
	for (rowIndex = 0; rowIndex < gridObj.length; rowIndex = rowIndex + 1)
	{
		currentRow = gridObj[rowIndex];
		colIndex = 0;
		currentTile = "";
		currentStartX = -1;
		currentStartY = -1;
		
		// Loop grid row cells.
		while (colIndex >= 0 && colIndex < currentRow.length)
		{
			// Read current tile.
			currentTile = currentRow[colIndex];
			currentStartX = colIndex * inpTileSize;
			currentStartY = rowIndex * inpTileSize;
			
			if (currentTile === "1")
			{
				// Floor
				setTile(outputImage, currentStartX, currentStartY, hexadecFloor, inpTileSize);
			}
			else
			{
				// Wall
				setTile(outputImage, currentStartX, currentStartY, hexadecWall, inpTileSize);
			}
			
			colIndex = colIndex + 1;
		}
	}
}


// Colours a particular tile.
function setTile(outputImg, startX, startY, tColour, tSize)
{
	outputImg.scan(startX, startY, tSize, tSize, function(currentX, currentY)
	{
		this.setPixelColor(tColour, currentX, currentY);
	});
}


// Calculates total image width.
function calculateWidth(gridObj, tSize)
{
	var firstRow = gridObj[0];
	var calcRes = firstRow.length * tSize;
	return calcRes;
}



module.exports =
{
	createFile: createImageFile
};