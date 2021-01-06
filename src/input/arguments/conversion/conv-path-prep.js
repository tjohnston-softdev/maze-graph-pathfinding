const path = require("path");
const exitProgram = require("../../../common/exit-program");
const valuePrep = require("../../../common/value-prep");
const errorText = require("../../../common/sub-input/error-text");


// Parses conversion path from relative to absolute.
function resolvePathString(resObject, entryName, prepName)
{
	var entryPath = resObject[entryName];
	var resolvedPath = path.resolve(entryPath);
	var resolveSuccessful = valuePrep.checkStringType(resolvedPath);
	
	var preparedPath = "";
	
	if (resolveSuccessful === true && resolvedPath.length > 0)
	{
		preparedPath = valuePrep.sanitizeString(resolvedPath);
	}
	
	
	resObject.preparedPaths[prepName] = preparedPath;
}



// Checks if input and output paths are different.
function validateIoPathsDifferent(resObject)
{
	var inputPath = resObject.preparedPaths.inputPath;
	var writePath = resObject.preparedPaths.writePath;
	
	var validationResult = true;
	var invalidMessage = "";
	
	if (inputPath === writePath)
	{
		validationResult = false;
		invalidMessage = errorText.writeSame("Input and Output file paths");
		exitProgram.callExit(invalidMessage);
	}
	
	return validationResult;
}



module.exports =
{
	resolvePath: resolvePathString,
	validateDifferent: validateIoPathsDifferent
};