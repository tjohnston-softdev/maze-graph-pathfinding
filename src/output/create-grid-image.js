const ora = require("ora");
const jimp = require("jimp");


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


function coordinateImageCreation(baseObject, gridObject, coordImgCallback)
{
	var tileSizeNum = baseObject.imageItems.tileSize;
	var imageWidth = calculateWidth(gridObject, tileSizeNum);
	var imageHeight = gridObject.length * tileSizeNum;
	
	new jimp(imageWidth, imageHeight, "#FFFFFF", function (imageErr, imageObject)
	{
		if (imageErr !== null)
		{
			return coordImgCallback(imageErr, null);
		}
		else
		{
			colourImageTiles(imageObject, gridObject, baseObject.imageItems, tileSizeNum);
			saveImageFile(baseObject, imageObject, coordImgCallback);
		}
	});
}


function saveImageFile(baseObj, gridImageObj, saveCallback)
{
	var targetOutputPath = baseObj.preparedPaths.writePath;
	
	gridImageObj.write(targetOutputPath, function (saveErr, saveRes)
	{
		if (saveErr !== null)
		{
			return saveCallback(saveErr, null);
		}
		else
		{
			return saveCallback(null, true);
		}
	});
}



function colourImageTiles(outputImage, gridObj, imgOpts, inpTileSize)
{
	var rowIndex = 0;
	var currentRow = [];
	var colIndex = 0;
	var currentTile = "";
	var currentStartX = -1;
	var currentStartY = -1;
	
	var hexadecWall = jimp.cssColorToHex(imgOpts.wallColour);
	var hexadecFloor = jimp.cssColorToHex(imgOpts.floorColour);
	
	for (rowIndex = 0; rowIndex < gridObj.length; rowIndex = rowIndex + 1)
	{
		currentRow = gridObj[rowIndex];
		colIndex = 0;
		currentTile = "";
		currentStartX = -1;
		currentStartY = -1;
		
		while (colIndex >= 0 && colIndex < currentRow.length)
		{
			currentTile = currentRow[colIndex];
			currentStartX = colIndex * inpTileSize;
			currentStartY = rowIndex * inpTileSize;
			
			if (currentTile === "1")
			{
				setTile(outputImage, currentStartX, currentStartY, hexadecFloor, inpTileSize);
			}
			else
			{
				setTile(outputImage, currentStartX, currentStartY, hexadecWall, inpTileSize);
			}
			
			colIndex = colIndex + 1;
		}
	}
}


function setTile(outputImg, startX, startY, tColour, tSize)
{
	outputImg.scan(startX, startY, tSize, tSize, function(currentX, currentY)
	{
		this.setPixelColor(tColour, currentX, currentY);
	});
}


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