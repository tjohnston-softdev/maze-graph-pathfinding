const ora = require("ora");
const tileSet = require("../common/sub-parse/tile-set");
const imageErrorText = require("../common/sub-parse/errors/image-error-text");

/*
	* This file is used to convert parsed grid objects into binary input format.
	* Used in the 'image-to-grid' command.
*/



// Main function.
function convertGridTilesToBinary(inpMatrixGrid, binaryCallback)
{
	var binarySpinner = ora("Preparing Grid Tiles").start();
	
	loopGridTiles(inpMatrixGrid, function (loopErr, loopRes)
	{
		if (loopErr !== null)
		{
			binarySpinner.fail("Error Preparing Grid Tiles");
			return binaryCallback(loopErr, null);
		}
		else
		{
			binarySpinner.succeed("Grid Tiles Prepared");
			return binaryCallback(null, true);
		}
	});
	
}


// Grid tiles loop.
function loopGridTiles(gMatrixObj, loopCallback)
{
	var rowIndex = 0;
	var currentRow = [];
	
	var colIndex = 0;
	var currentTile = "";
	
	var canContinue = true;
	var flaggedErrorMessage = "";
	
	
	// Primary loop iterates through grid rows.
	while (rowIndex >= 0 && rowIndex < gMatrixObj.length && canContinue === true)
	{
		currentRow = gMatrixObj[rowIndex];
		
		colIndex = 0;
		currentTile = "";
		
		// Sub loop iterates through row cells.
		while (colIndex >= 0 && colIndex < currentRow.length && canContinue === true)
		{
			currentTile = currentRow[colIndex];
			
			if (currentTile === tileSet.wallTile)
			{
				// Wall tiles are changed to Zero.
				currentRow[colIndex] = "0";
			}
			else if (currentTile === tileSet.floorTile || currentTile === tileSet.nodeTile)
			{
				// Floor and Node tiles are changed to One.
				currentRow[colIndex] = "1";
			}
			else
			{
				// Unknown tile. Abort loop.
				canContinue = false;
				flaggedErrorMessage = imageErrorText.writeTileConversion(rowIndex, colIndex);
			}
			
			colIndex = colIndex + 1;
		}
		
		rowIndex = rowIndex + 1;
	}
	
	
	if (canContinue === true)
	{
		return loopCallback(null, true);
	}
	else
	{
		return loopCallback(new Error(flaggedErrorMessage), null);
	}
	
}




module.exports =
{
	convertTiles: convertGridTilesToBinary
};