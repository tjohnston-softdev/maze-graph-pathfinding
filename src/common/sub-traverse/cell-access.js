// Functions used to read and update grid cells.


// Read cell.
function readGridCell(matrixObj, tgtRowIndex, tgtColIndex)
{
	var rowObject = [];
	var cellValue = "";
	
	if (tgtRowIndex >= 0 && tgtRowIndex < matrixObj.length)
	{
		rowObject = matrixObj[tgtRowIndex];
	}
	
	if (tgtColIndex >= 0 && tgtColIndex < rowObject.length)
	{
		cellValue = rowObject[tgtColIndex];
	}
	
	return cellValue;
}


// Update cell.
function setGridCell(matrixObj, tgtRowIndex, tgtColIndex, newTile)
{
	var rowObject = [];
	
	if (tgtRowIndex >= 0 && tgtRowIndex < matrixObj.length)
	{
		rowObject = matrixObj[tgtRowIndex];
	}
	
	if (tgtColIndex >= 0 && tgtColIndex < rowObject.length)
	{
		rowObject[tgtColIndex] = newTile;
	}
	
	
}



module.exports =
{
	readCell: readGridCell,
	setCell: setGridCell
};