const fs = require("fs");
const fileErrorText = require("./errors/file-error-text");


// Checks whether a given path refers to a valid file.
function checkFilePathExists(targetFilePath, fileDesc, allowEmpty, existCallback)
{
	var missingErrorText = "";
	
	// 'stat' used to retrieve path information
	fs.stat(targetFilePath, function (pathError, infoObject)
	{
		if (pathError !== null)
		{
			// Path does not exist
			missingErrorText = fileErrorText.writeMissing(fileDesc);
			return existCallback(new Error(missingErrorText), null);
		}
		else
		{
			// Validate information
			confirmFileExists(infoObject, fileDesc, allowEmpty, existCallback);
		}
	});
	
}



function confirmFileExists(pInfo, pDesc, aEmpty, eCallback)
{
	var confirmErrorText = "";
	var fileDesigination = pInfo.isFile();
	
	if (fileDesigination === true && pInfo.size > 0)
	{
		// Valid, non-empty file.
		return eCallback(null, true);
	}
	else if (fileDesigination === true && aEmpty === true)
	{
		// Valid, empty file.
		return eCallback(null, true);
	}
	else if (fileDesigination === true)
	{
		// Empty file error.
		confirmErrorText = fileErrorText.writeEmpty(pDesc);
		return eCallback(new Error(confirmErrorText), null);
	}
	else
	{
		// Invalid file error.
		confirmErrorText = fileErrorText.writeInvalidFile(pDesc);
		return eCallback(new Error(confirmErrorText), null);
	}
}




module.exports =
{
	checkFileExists: checkFilePathExists
};