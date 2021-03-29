// Functions used to help with value preperation.

const spaceRegex = /\s/g;



// Checks if value is a valid, non-empty string.
function checkInputStringType(vString)
{
	var checkRes = (typeof vString === "string" && vString.length > 0);
	return checkRes;
}


// Checks if value is a valid object.
function checkInputObjectType(vObject)
{
	var oType = typeof vObject;
	var checkRes = (vObject !== undefined && vObject !== null && oType === "object");
	return checkRes;
}


// Checks if an object has a given property.
function checkObjectPropertyExists(vObject, tgtProp)
{
	var propVal = vObject[tgtProp];
	var checkRes = (propVal !== undefined);
	return checkRes;
}


// Checks valid number.
function checkGeneralNumberType(vSubject)
{
	var checkRes = Number.isFinite(vSubject);
	return checkRes;
}


// Checks valid whole number.
function checkWholeNumberType(vSubject)
{
	var checkRes = Number.isInteger(vSubject);
	return checkRes;
}


// Checks valid positive whole number.
function checkPositiveWholeNumberType(vSubject, allowZero)
{
	var correctType = Number.isInteger(vSubject);
	var checkRes = false;
	
	if (correctType === true && vSubject > 0)
	{
		checkRes = true;
	}
	else if (correctType === true && vSubject === 0 && allowZero === true)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
	}
	
	return checkRes;
}


// Checks valid True,False value.
function checkBooleanType(vSubject)
{
	var checkRes = (vSubject === true || vSubject === false);
	return checkRes;
}




// Checks if a number falls within a certain range.
function checkInputNumberRange(vLength, lowerLimit, upperLimit)
{
	var checkRes = (vLength >= lowerLimit && vLength <= upperLimit);
	return checkRes;
}


// Retrieves number of elements in an array.
function getArrayElementCount(vSubject)
{
	var correctType = Array.isArray(vSubject);
	var countRes = 0;
	
	if (correctType === true)
	{
		countRes = vSubject.length;
	}
	
	return countRes;
}




// Removes spaces and case-sensitivity from a given string.
function sanitizeInputString(subjectString)
{
	var sanitizedResult = subjectString;
	
	sanitizedResult = sanitizedResult.toLowerCase();
	sanitizedResult = sanitizedResult.replace(spaceRegex, "");
	
	return sanitizedResult;
}




module.exports =
{
	checkStringType: checkInputStringType,
	checkObjectType: checkInputObjectType,
	checkPropertyExists: checkObjectPropertyExists,
	checkGeneralNumber: checkGeneralNumberType,
	checkWholeNumber: checkWholeNumberType,
	checkPositiveWholeNumber: checkPositiveWholeNumberType,
	checkBoolean: checkBooleanType,
	checkNumberRange: checkInputNumberRange,
	getElementCount: getArrayElementCount,
	sanitizeString: sanitizeInputString
};