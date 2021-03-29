const valuePrep = require("../../../common/value-prep");
const pathContext = require("../../../common/sub-input/path-context");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Validates entered pathfinding mode string.
function validatePathfindingModeString(pModeStr, resObject)
{
	var stringTypeUsed = valuePrep.checkStringType(pModeStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		// Read string.
		validationResult = handleStringEntry(pModeStr, resObject);
	}
	else
	{
		// Skip pathfinding by default.
		resObject.mapModeFlag = -1;
		validationResult = true;
	}
	
	
	return validationResult;
}

// Parses entered string into mode flag.
function handleStringEntry(mString, rObj)
{
	var preparedText = valuePrep.sanitizeString(mString);
	var safeLength = checkModeLength(preparedText);
	var derivedFlag = -1;
	
	var handleSuccessful = false;
	
	if (safeLength === true)
	{
		// Parse string into mode flag.
		derivedFlag = pathContext.getModeFlag(preparedText);
		rObj.mapModeFlag = derivedFlag;
		handleSuccessful = true;
	}
	
	return handleSuccessful;
}


// Checks string length.
function checkModeLength(cNumber)
{
	var lengthRes = true;
	var invalidMessage = "";
	
	if (cNumber > valueLimits.maxModeLength)
	{
		// Too long.
		invalidMessage = errorText.writeStringTooLong("Pathfinding mode", valueLimits.maxModeLength);
		exitProgram.callExit(invalidMessage);
	}
	
	return lengthRes;
}




module.exports =
{
	validatePathfindingMode: validatePathfindingModeString
};