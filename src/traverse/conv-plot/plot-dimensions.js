const tileSet = require("../../common/sub-parse/tile-set");
const graphObjects = require("../../common/sub-graph/graph-objects");
const parseObjects = require("../../common/sub-parse/parse-objects");
const gridHelpTasks = require("../../common/sub-parse/grid-help-tasks");
const valueLimits = require("../../common/value-limits");

function getGridDimensions(gNodeList, dimensionsCallback)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentRow = -1;
	var currentCol = -1;
	
	var largestRow = null;
	var largestCol = null;
	var chosenDimensions = {"rowCount": 0, "colCount": 0};
	var dimensionOutcome = {};
	
	for (nodeIndex = 0; nodeIndex < gNodeList.length; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = gNodeList[nodeIndex];
		currentRow = currentNodeObject.rowNumber;
		currentCol = currentNodeObject.colNumber;
		
		if (largestRow === null || currentRow > largestRow)
		{
			largestRow = currentRow;
		}
		
		if (largestCol === null || currentCol > largestCol)
		{
			largestCol = currentCol;
		}
	}
	
	chosenDimensions.rowCount = Math.floor(largestRow / graphObjects.scaleFactor);
	chosenDimensions.colCount = Math.floor(largestCol / graphObjects.scaleFactor);
	dimensionOutcome = validateGridDimensions(chosenDimensions);
	
	if (dimensionOutcome.valid === true)
	{
		return dimensionsCallback(null, chosenDimensions);
	}
	else
	{
		return dimensionsCallback(new Error(dimensionOutcome.messageText), null);
	}
}



function initializeBlankGrid(dimObj)
{
	var dimensionValue = Math.max(dimObj.rowCount, dimObj.colCount);
	var rowIndex = 0;
	var currentRow = [];
	
	var intlRes = [];
	
	
	for (rowIndex = 0; rowIndex < dimensionValue; rowIndex = rowIndex + 1)
	{
		currentRow = [];
		colIndex = 0;
		
		while (currentRow.length < dimensionValue)
		{
			currentRow.push(tileSet.wallTile);
		}
		
		intlRes.push(currentRow);
	}
	
	return intlRes;
}



function validateGridDimensions(dimObj)
{
	var validationRes = parseObjects.defineLineOutcome();
	var rowCountValid = gridHelpTasks.checkDimensionNumber(dimObj.rowCount, valueLimits.maxGridDimension, "Rows", validationRes);
	var colCountValid = false;
	
	if (rowCountValid === true)
	{
		colCountValid = gridHelpTasks.checkDimensionNumber(dimObj.colCount, valueLimits.maxGridDimension, "Columns", validationRes);
	}
	
	if (colCountValid === true)
	{
		validationRes.valid = true;
	}
	
	return validationRes;
}



module.exports =
{
	getDimensions: getGridDimensions,
	initializeGrid: initializeBlankGrid
};