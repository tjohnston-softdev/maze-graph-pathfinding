const gridHelpTasks = require("../../../common/sub-parse/grid-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const valueLimits = require("../../../common/value-limits");


// Used to validate the dimensions of a parsed grid object, trimming uneven rows if allowed.


function verifyGridDimensions(gridMatrixObject, allowMatrixTrim, dimensionCallback)
{
	var outcomeResultObject = parseObjects.defineLineOutcome();
	var rowCountValid = gridHelpTasks.checkDimensionNumber(gridMatrixObject.length, valueLimits.maxGridDimension, "Rows", outcomeResultObject);
	
	var columnLimitsObject = {};
	var columnLimitsValid = false;
	
	var colCountValid = false;
	
	
	if (rowCountValid === true)
	{
		// Checks whether column lengths are even. Uneven rows will be trimmed if allowed.
		columnLimitsObject = gridHelpTasks.getColumnLimits(gridMatrixObject);
		columnLimitsValid = gridHelpTasks.checkColumnLimits(gridMatrixObject, columnLimitsObject, allowMatrixTrim, outcomeResultObject);
	}
	
	if (columnLimitsValid === true)
	{
		colCountValid = gridHelpTasks.checkDimensionNumber(columnLimitsObject.shortest, valueLimits.maxGridDimension, "Columns", outcomeResultObject);
	}
	
	if (colCountValid === true)
	{
		// Dimensions valid.
		outcomeResultObject.valid = true;
	}
	
	
	if (outcomeResultObject.valid === true)
	{
		return dimensionCallback(null, true);
	}
	else
	{
		return dimensionCallback(new Error(outcomeResultObject.messageText), null);
	}
	
}




module.exports =
{
	verifyDimensions: verifyGridDimensions
};