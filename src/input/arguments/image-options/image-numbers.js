const numberFormat = require("../../../common/sub-input/number-format");
const valuePrep = require("../../../common/value-prep");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Validates pixel colour tolerance percentage.
function validateTolerancePercentageNumber(tolEntry, resObject, validationOutcome)
{
	var stringTypeUsed = valuePrep.checkStringType(tolEntry);
	var numberTypeUsed = valuePrep.checkGeneralNumber(tolEntry);
	var preparedNumber = numberFormat.convertInputValue(tolEntry, stringTypeUsed, numberTypeUsed);
	var safeType = valuePrep.checkGeneralNumber(preparedNumber);
	
	var validationResult = false;
	
	
	if (safeType === true && preparedNumber >= valueLimits.minPercentage && preparedNumber <= valueLimits.maxPercentage)
	{
		// Valid percentage.
		resObject.imageItems.tolerancePercent = preparedNumber;
		validationResult = true;
	}
	else
	{
		// Invalid.
		validationResult = false;
		validationOutcome.errorMessage = errorText.writePercent("Tolerance number");
	}
	
	
	return validationResult;
}

// Validates image tile size number.
function validateTileSizeNumber(sizeEntry, resObject, validationOutcome)
{
	var stringTypeUsed = valuePrep.checkStringType(sizeEntry);
	var numberTypeUsed = valuePrep.checkGeneralNumber(sizeEntry);
	var preparedNumber = numberFormat.convertInputValue(sizeEntry, stringTypeUsed, numberTypeUsed);
	var safeType = valuePrep.checkWholeNumber(preparedNumber);
	
	var validationResult = false;
	
	
	if (safeType === true && preparedNumber >= valueLimits.minTileSize && preparedNumber <= valueLimits.maxTileSize)
	{
		// Valid number.
		resObject.imageItems.tileSize = preparedNumber;
		validationResult = true;
	}
	else if (safeType === true && preparedNumber > valueLimits.maxTileSize)
	{
		// Too large.
		validationResult = false;
		validationOutcome.errorMessage = errorText.writeLargerThan("Tile size", valueLimits.maxTileSize);
	}
	else
	{
		// Invalid type.
		validationResult = false;
		validationOutcome.errorMessage = errorText.writePositiveWhole("Tile size");
	}
	
	return validationResult;
}


// Validates origin coordinates number.
function validateOriginCoordinatesNumberValue(coordValue, coordName, coordDesc, resObject, validationOutcome)
{
	var stringTypeUsed = valuePrep.checkStringType(coordValue);
	var numberTypeUsed = valuePrep.checkGeneralNumber(coordValue);
	var preparedNumber = numberFormat.convertInputValue(coordValue, stringTypeUsed, numberTypeUsed);
	var safeType = valuePrep.checkWholeNumber(preparedNumber);
	
	var validationResult = false;
	
	
	if (safeType === true && preparedNumber >= 0)
	{
		// Valid origin.
		resObject.imageItems[coordName] = preparedNumber;
		validationResult = true;
	}
	else if (safeType === true)
	{
		// Negative.
		validationResult = false;
		validationOutcome.errorMessage = errorText.writeCannotNegative(coordDesc);
	}
	else
	{
		// Invalid type.
		validationResult = false;
		validationOutcome.errorMessage = errorText.writeWhole(coordDesc);
	}
	
	return validationResult;
}


// Validates colour difference percentage compared to the allowed tolerance.
function validateColourDifferencePercentageNumber(tolPercent, diffPercent, validationOutcome)
{
	var validationResult = false;
	
	if (diffPercent > tolPercent)
	{
		// Valid colour difference.
		validationResult = true;
	}
	else
	{
		// Too small.
		validationResult = false;
		validationOutcome.errorMessage = "The difference between the Wall and Floor colours must be greater than the allowed tolerance.";
	}
	
	return validationResult;
}






module.exports =
{
	validateTolerancePercentage: validateTolerancePercentageNumber,
	validateTileSize: validateTileSizeNumber,
	validateOriginCoordinatesNumber: validateOriginCoordinatesNumberValue,
	validateColourDifference: validateColourDifferencePercentageNumber
};