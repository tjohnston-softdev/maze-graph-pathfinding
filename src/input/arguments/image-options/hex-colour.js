const valuePrep = require("../../../common/value-prep");
const errorText = require("../../../common/sub-input/error-text");

const fullRegex = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
const startCodeRegex = /^#/;


// Validates hex colour string (eg. "#123456")
function validateHexColourString(hexStr, colourName, colourDesc, resObject, validationOutcome)
{
	var preparedHex = prepareHexString(hexStr);
	var hexValid = fullRegex.test(preparedHex);
	
	var validationResult = false;
	
	
	if (hexValid === true)
	{
		// Overwrite with prepared value.
		resObject.imageItems[colourName] = preparedHex;
		validationResult = true;
	}
	else
	{
		validationResult = false;
		validationOutcome.errorMessage = errorText.writeHexColour(colourDesc);
	}
	
	return validationResult;
}


// Checks whether two hex colour strings are different.
function validateHexStringsDifferent(hexStrA, hexStrB, validationOutcome)
{
	var validationResult = true;
	
	if (hexStrA === hexStrB)
	{
		validationResult = false;
		validationOutcome.errorMessage = "Wall and Floor tiles cannot be the same colour.";
	}
	
	return validationResult;
}



// Removes spaces, case-sensitivity and '#' from hex string.
function prepareHexString(hStr)
{
	var stringTypeUsed = valuePrep.checkStringType(hStr);
	var prepRes = "";
	
	if (stringTypeUsed === true)
	{
		prepRes = valuePrep.sanitizeString(hStr);
		prepRes = prepRes.replace(startCodeRegex, "");
		prepRes = prepRes.toUpperCase();
	}
	
	return prepRes;
}




module.exports =
{
	validateHexColour: validateHexColourString,
	validateStringsDifferent: validateHexStringsDifferent,
	prepareHex: prepareHexString
};