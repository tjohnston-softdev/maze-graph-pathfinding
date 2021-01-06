const path = require("path");
const inputPath = require("./arguments/general/input-path");
const resolvedPath = require("./arguments/general/resolved-path");


// Handles input validation for the 'read-image-config' command.
function readEnteredArguments(argInputPath)
{
	var argumentReadResult = definePreparedArguments();
	
	var inputPathValid = inputPath.validateInputFilePath(argInputPath, argumentReadResult);
	var preparedPathValid = false;
	
	if (inputPathValid === true)
	{
		preparedPathValid = prepareInputPath(argumentReadResult);
	}
	
	if (preparedPathValid === true)
	{
		argumentReadResult.valid = true;
	}
	
	return argumentReadResult;
}


// Converts entered path from relative to absolute.
function prepareInputPath(readRes)
{
	var absolutePath = path.resolve(readRes.inputFilePath);
	var absoluteValid = resolvedPath.validateReadImageConfigPath(absolutePath);
	
	var prepRes = false;
	
	if (absoluteValid === true)
	{
		readRes.preparedFilePath = absolutePath;
		prepRes = true;
	}
	
	return prepRes;
}


// Argument result object.
function definePreparedArguments()
{
	var defineRes = {};
	
	defineRes["inputFilePath"] = "";
	defineRes["preparedFilePath"] = "";
	defineRes["imageItems"] = {};
	defineRes["valid"] = false;
	
	return defineRes;
}





module.exports =
{
	readArguments: readEnteredArguments
};