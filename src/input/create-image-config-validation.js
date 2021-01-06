const defaultValues = require("../common/sub-input/default-values");
const optionalItems = require("./arguments/general/optional-items");
const targetPath = require("./arguments/config-write/target-path");
const resolvedPath = require("./arguments/general/resolved-path");


// Handles entry validation for the 'create-image-config' command.
function readCreateConfigArguments(argWritePath, optionalArgs)
{
	var argumentReadResult = definePreparedArguments();
	var targetEntryValid = targetPath.validateConfigPath(argWritePath, argumentReadResult);
	var finalPathValid = false;
	
	if (targetEntryValid === true)
	{
		// Converts output path from relative to absolute.
		targetPath.parseEntry(argumentReadResult);
		finalPathValid = resolvedPath.validateCreateImageConfigPath(argumentReadResult.resolvedTargetPath);
	}
	
	if (finalPathValid === true)
	{
		prepareOptionalArguments(optionalArgs, argumentReadResult);
		argumentReadResult.valid = true;
	}
	
	
	
	return argumentReadResult;
}


// Prepares replace toggle argument.
function prepareOptionalArguments(optArgs, readRes)
{
	var objectPassed = optionalItems.verifyObjectPassed(optArgs);
	
	if (objectPassed === true)
	{
		optionalItems.setToggle(optArgs, "replace", readRes, "replaceExistingFile");
	}
	
}


// Argument result object.
function definePreparedArguments()
{
	var defineRes = {};
	
	defineRes["enteredTargetPath"] = defaultValues.imageConfigPath;
	defineRes["resolvedTargetPath"] = "";
	defineRes["replaceExistingFile"] = defaultValues.replaceExisting;
	defineRes["outputPath"] = "";
	defineRes["imageItems"] = {};
	defineRes["valid"] = false;
	
	return defineRes;
}



module.exports =
{
	readArguments: readCreateConfigArguments
};