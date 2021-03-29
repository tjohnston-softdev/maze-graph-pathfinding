const lineErrorText = require("./errors/line-error-text");


// Splits text into an array of comma-separated substrings.
function splitTextByComma(origTxt)
{
	var splitRes = origTxt.split(",");
	return splitRes;
}


// Checks whether a minimum amount of substrings has been read from the current input line.
function checkSplitLineLength(splitObj, minLength, lineDesc, correctFormat, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (splitObj.length >= minLength)
	{
		// Minimum reached.
		checkRes = true;
	}
	else
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeInvalidFormat(lineDesc, correctFormat, lineLocationNumber);
	}
	
	
	return checkRes;
}


// Reads target substring as a required number value.
function readEnteredNumberValue(splitObj, cIndex)
{
	var stringTxt = "";
	var castNum = NaN;
	
	// If there is a substring at the given index, convert it into a number.
	if (splitObj.length > cIndex)
	{
		stringTxt = splitObj[cIndex];
		castNum = Number(stringTxt);
	}
	
	return castNum;
}


// Reads target substring as an optional node heuristic.
function readEnteredHeuristicValue(splitObj, cIndex)
{
	var stringTxt = "";
	var castNum = 0;
	
	if (splitObj.length > cIndex)
	{
		// If there is a substring at the given index, convert to number.
		stringTxt = splitObj[cIndex];
		castNum = Number(stringTxt);
	}
	else
	{
		// Otherwise, use default.
		stringTxt = "";
		castNum = 0;
	}
	
	return castNum;
}




// Checks whether entered Node ID number is valid.
function checkNodeIDValid(idNum, idDesc, lineLocationNumber, outcomeObj)
{
	var correctType = Number.isInteger(idNum);
	var checkRes = false;
	
	if (correctType === true && idNum > 0)
	{
		checkRes = true;
	}
	else
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeNodeNumberInvalid(idDesc, lineLocationNumber);
	}
	
	return checkRes;
}


// Checks whether entered Node heuristic is valid.
function checkNodeHeuristicValid(heuristicNum, lineLocationNumber, outcomeObj)
{
	var correctType = Number.isInteger(heuristicNum);
	var checkRes = false;
	
	if (correctType === true && heuristicNum >= 0)
	{
		// Valid number.
		checkRes = true;
	}
	else if (correctType === true)
	{
		// Negative value.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeHeuristicNegative(lineLocationNumber);
	}
	else
	{
		// Invalid type.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeHeuristicInvalid(lineLocationNumber);
	}
	
	return checkRes;
}


// Checks whether entered edge distance is valid.
function checkEdgeDistanceValid(edgeNum, lineLocationNumber, outcomeObj)
{
	var correctType = Number.isInteger(edgeNum);
	var checkRes = false;
	
	if (correctType === true && edgeNum > 0)
	{
		// Valid positive number.
		checkRes = true;
	}
	else if (correctType === true && edgeNum === 0)
	{
		// Zero value.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeZeroDistance(lineLocationNumber);
	}
	else
	{
		// Invalid type.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeDistanceInvalid(lineLocationNumber);
	}
	
	return checkRes;
}




// Checks whether node index number is valid.
function checkNodeExistFlagValid(eFlag, nCount, idDesc, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (eFlag >= 0 && eFlag < nCount)
	{
		checkRes = true;
	}
	else
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeRelativeMissingNode(idDesc, lineLocationNumber);
	}
	
	return checkRes;
}


// Checks whether two node ID numbers are different.
function checkEdgeKeyNumbersDifferent(pointA, pointB, lineLocationNumber, outcomeObj)
{
	var checkRes = true;
	
	if (pointA === pointB)
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeEdgeNumbersSame(lineLocationNumber);
	}
	
	return checkRes;
}



module.exports =
{
	splitComma: splitTextByComma,
	checkSplitLength: checkSplitLineLength,
	readEnteredNumber: readEnteredNumberValue,
	readEnteredHeuristic: readEnteredHeuristicValue,
	checkNodeID: checkNodeIDValid,
	checkNodeHeuristic: checkNodeHeuristicValid,
	checkEdgeDistance: checkEdgeDistanceValid,
	checkNodeExistFlag: checkNodeExistFlagValid,
	checkEdgeNumbersDifferent: checkEdgeKeyNumbersDifferent
};