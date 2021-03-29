const lineErrorText = require("./errors/line-error-text");
const generalErrorText = require("./errors/general-error-text");


// Checks whether a text input line has a safe length.
function checkSafeLineLengthNumber(lengthNum, upperLimit, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (lengthNum >= 0 && lengthNum <= upperLimit)
	{
		checkRes = true;
	}
	else
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeLineTooLong(upperLimit, lineLocationNumber);
	}
	
	return checkRes;
}


// Splits input line into colon-separated substrings. Used for field-value pairs.
function splitTextByColon(origTxt)
{
	var splitRes = origTxt.split(":");
	return splitRes;
}



// Checks whether a node was successfully added or retrieved when parsing.
function checkNodeRetrievedSuccessfully(retObj, nCount, maxNodeLimit, fieldDesc, correctFormat, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (retObj.matchIndex >= 0 && retObj.matchIndex < nCount)
	{
		// Node retrieved successfully.
		checkRes = true;
	}
	else if (retObj.overflow === true)
	{
		// Graph has too many nodes.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeMaximumNodes(maxNodeLimit, lineLocationNumber);
	}
	else
	{
		// Search unsuccessful. Invalid format.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeInvalidFormat(fieldDesc, correctFormat, lineLocationNumber);
	}
	
	return checkRes;
}



// Checks if two Node numbers are different when reading edges in absolute input.
function checkAbsoluteNodeKeyNumbersDifferent(pointA, pointB, lineLocationNumber, outcomeObj)
{
	var checkRes = true;
	
	if (pointA === pointB)
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeAbsoluteZeroDistance(lineLocationNumber);
	}
	
	return checkRes;
}



// Checks whether there is distance between two nodes when reading edges in absolute input.
function checkAbsoluteDistanceNumberValid(dNumber, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (dNumber > 0)
	{
		checkRes = true;
	}
	else
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeAbsoluteZeroDistance(lineLocationNumber);
	}
	
	return checkRes;
	
}


// Checks whether it is possible to add a new edge to the graph.
function checkEdgeAddPossible(availabilityState, eCount, maxEdgeLimit, lineLocationNumber, outcomeObj)
{
	var checkRes = false;
	
	if (availabilityState === true && eCount >= 0 && eCount < maxEdgeLimit)
	{
		// Edge can be added.
		checkRes = true;
	}
	else if (availabilityState === true && eCount >= maxEdgeLimit)
	{
		// Too many edges.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeMaximumEdges(maxEdgeLimit, lineLocationNumber);
	}
	else
	{
		// Connection already taken.
		checkRes = false;
		outcomeObj.messageText = lineErrorText.writeEdgeTaken(lineLocationNumber);
	}
	
	return checkRes;
}



// Used to validate whether the graph has a valid number of objects.
function checkObjectTypeCountNumber(cNum, maxObjectLimit, oType, outcomeObj)
{
	var checkRes = false;
	
	if (cNum > 0 && cNum <= maxObjectLimit)
	{
		// Safe, non-empty amount.
		checkRes = true;
	}
	else if (cNum > maxObjectLimit)
	{
		// Too many objects.
		checkRes = false;
		outcomeObj.messageText = generalErrorText.writeMaximumObject(oType, maxObjectLimit);
	}
	else
	{
		// Object type empty.
		checkRes = false;
		outcomeObj.messageText = generalErrorText.writeEmptyType(oType);
	}
	
	return checkRes;
}



// Checks whether a target point on the graph has been successfully defined.
function checkTargetPointDefined(pNum, nCount, pDesc, outcomeObj)
{
	var wholeNumber = Number.isInteger(pNum);
	var checkRes = false;
	
	if (wholeNumber === true && pNum >= 0 && pNum < nCount)
	{
		// Index valid
		checkRes = true;
	}
	else
	{
		// Target point missing.
		checkRes = false;
		outcomeObj.messageText = generalErrorText.writeTargetPointMissing(pDesc);
	}
	
	return checkRes;
}



// Used to check if the start,end node indicies are different.
function checkStartEndPointsDifferent(sPoint, ePoint, outcomeObj)
{
	var checkRes = true;
	
	if (sPoint === ePoint)
	{
		// Invalid.
		checkRes = false;
		outcomeObj.messageText = "Start and End points cannot be the same.";
	}
	
	return checkRes;
}






module.exports =
{
	checkSafeLength: checkSafeLineLengthNumber,
	splitColon: splitTextByColon,
	checkNodeRetrieved: checkNodeRetrievedSuccessfully,
	checkAbsoluteNodeKeysDifferent: checkAbsoluteNodeKeyNumbersDifferent,
	checkAbsoluteDistanceValid: checkAbsoluteDistanceNumberValid,
	checkEdgePossible: checkEdgeAddPossible,
	checkObjectTypeCount: checkObjectTypeCountNumber,
	checkTargetDefined: checkTargetPointDefined,
	checkStartEndDifferent: checkStartEndPointsDifferent
};