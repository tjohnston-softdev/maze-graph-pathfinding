const valuePrep = require("../../../common/value-prep");


// Checks whether 'optional arguments' were passed as an object.
function verifyOptionalObjectPassed(optObj)
{
	var objectTypeUsed = valuePrep.checkObjectType(optObj);
	return objectTypeUsed;
}


// Sets toggle argument.
function setToggleItem(optObj, optName, resObject, prepName)
{
	var argumentPassed = valuePrep.checkPropertyExists(optObj, optName);
	var givenValue = null;
	
	if (argumentPassed === true)
	{
		resObject[prepName] = true;
	}
	
}


module.exports =
{
	verifyObjectPassed: verifyOptionalObjectPassed,
	setToggle: setToggleItem
};