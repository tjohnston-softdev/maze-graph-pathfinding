const errorStringText = "#ERROR";


// These functions are used to prepare cell values for .csv files when exporting raw data.


// Positive numbers.
function addPositiveNumberAttribute(origValue, allowOptional, aList)
{
	var numberCast = castValueToNumber(origValue);
	var correctType = Number.isInteger(numberCast);
	var attributeString = "";
	
	if (correctType === true && numberCast > 0)
	{
		attributeString = String(numberCast);
	}
	else if (allowOptional === true)
	{
		attributeString = "";
	}
	else
	{
		attributeString = errorStringText;
	}
	
	// Adds prepared string to .csv row.
	aList.push(attributeString);
}


// Zero-Positive numbers.
function addZeroPositiveNumberAttribute(origValue, allowOptional, aList)
{
	var numberCast = castValueToNumber(origValue);
	var correctType = Number.isInteger(numberCast);
	var attributeString = "";
	
	if (correctType === true && numberCast >= 0)
	{
		attributeString = String(numberCast);
	}
	else if (allowOptional === true)
	{
		attributeString = "";
	}
	else
	{
		attributeString = errorStringText;
	}
	
	aList.push(attributeString);
}


// Flag numbers.
function addFlagNumberAttribute(origValue, allowOptional, aList)
{
	var numberCast = castValueToNumber(origValue);
	var correctType = Number.isFinite(numberCast);
	var attributeString = "";
	
	if (correctType === true && numberCast > 0)
	{
		attributeString = "1";
	}
	else if (correctType === true && numberCast < 0)
	{
		attributeString = "-1";
	}
	else if (correctType === true && numberCast === 0)
	{
		attributeString = "0";
	}
	else if (allowOptional === true)
	{
		attributeString = "";
	}
	else
	{
		attributeString = errorStringText;
	}
	
	aList.push(attributeString);
}



// Booleans.
function addTrueFalseAttribute(origValue, allowOptional, aList)
{
	var attributeString = "";
	
	if (origValue === true)
	{
		attributeString = "true";
	}
	else if (origValue === false)
	{
		attributeString = "false";
	}
	else if (allowOptional === true)
	{
		attributeString = "";
	}
	else
	{
		attributeString = errorStringText;
	}
	
	aList.push(attributeString);
}



// Node type flag.
function addNodeTypeAttribute(origValue, aList)
{
	var numberCast = castValueToNumber(origValue);
	var correctType = Number.isFinite(numberCast);
	var attributeString = "";
	
	if (correctType === true && numberCast > 0)
	{
		attributeString = "End";
	}
	else if (correctType === true && numberCast < 0)
	{
		attributeString = "Start";
	}
	else if (correctType === true)
	{
		attributeString = "";
	}
	else
	{
		attributeString = errorStringText;
	}
	
	aList.push(attributeString);
}


// Converts given value to number.
function castValueToNumber(oVal)
{
	var castRes = NaN;
	
	if (oVal !== undefined && oVal !== null)
	{
		castRes = Number(oVal);
	}
	
	return castRes;
}




module.exports =
{
	errorString: errorStringText,
	addPositiveNumber: addPositiveNumberAttribute,
	addZeroPositiveNumber: addZeroPositiveNumberAttribute,
	addFlagNumber: addFlagNumberAttribute,
	addTrueFalse: addTrueFalseAttribute,
	addNodeType: addNodeTypeAttribute
};