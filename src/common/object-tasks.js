// Common object functions.


// Makes a separate copy of an existing JSON object.
function cloneExistingObject(origObject)
{
	var definitionText = JSON.stringify(origObject);
	var cloneRes = JSON.parse(definitionText);
	return cloneRes;
}


// Formats a JSON object into a readable string for output.
function quickStringifyObject(completeObject)
{
	var definitionRes = JSON.stringify(completeObject, null, 4);			// The '4' adds whitespace for easier readability.
	return definitionRes;
}



module.exports =
{
	cloneObject: cloneExistingObject,
	quickStringify: quickStringifyObject
};