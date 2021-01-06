const fs = require("fs");
const fileErrorText = require("./errors/file-error-text");



// Checks whether a given path refers to a valid file. Limited to a certain size.
function checkFileSizeLimit(targetFilePath, fileDesc, limitObject, allowEmpty, sizeCallback)
{
	var missingErrorText = "";
	
	// Retrieves path information.
	fs.stat(targetFilePath, function (pathError, infoObject)
	{
		if (pathError !== null)
		{
			// Path does not exist
			missingErrorText = fileErrorText.writeMissing(fileDesc);
			return sizeCallback(new Error(missingErrorText), null);
		}
		else
		{
			// Validate path information
			confirmFileSize(infoObject, fileDesc, limitObject, allowEmpty, sizeCallback);
		}
	});
	
}




function confirmFileSize(pInfo, pDesc, limitObj, aEmpty, sCallback)
{
	var invalidErrorText = "";
	var fileDesigination = pInfo.isFile();
	
	if (fileDesigination === true && pInfo.size > 0 && pInfo.size <= limitObj.maxBytes)
	{
		// Valid, non-empty file of an accepted size.
		return sCallback(null, true);
	}
	else if (fileDesigination === true && pInfo.size > limitObj.maxBytes)
	{
		// File too large error.
		invalidErrorText = fileErrorText.writeFileSizeLimit(pDesc, limitObj.descLabel);
		return sCallback(new Error(invalidErrorText), null);
	}
	else if (fileDesigination === true && aEmpty === true)
	{
		// Valid, empty file.
		return sCallback(null, true);
	}
	else if (fileDesigination === true)
	{
		// Empty file error
		invalidErrorText = fileErrorText.writeEmpty(pDesc);
		return sCallback(new Error(invalidErrorText), null);
	}
	else
	{
		// Invalid file error.
		invalidErrorText = fileErrorText.writeInvalidFile(pDesc);
		return sCallback(new Error(invalidErrorText), null);
	}
	
}




module.exports =
{
	checkFileSize: checkFileSizeLimit
};