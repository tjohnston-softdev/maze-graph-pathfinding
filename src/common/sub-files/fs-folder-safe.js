const fs = require("fs");
const fileErrorText = require("./errors/file-error-text");


// Checks whether a given path refers to a valid folder.
function checkFolderPathSafe(targetFolderPath, folderDesc, folderSafeCallback)
{
	// Retrieves path information.
	fs.stat(targetFolderPath, function (pathError, infoObject)
	{
		if (pathError !== null)
		{
			// Path does not exist. Therefore, a folder can be created safely.
			return folderSafeCallback(null, true);
		}
		else
		{
			// Check valid folder.
			confirmFolderSafe(infoObject, folderDesc, folderSafeCallback);
		}
	});
}



function confirmFolderSafe(pInfo, pDesc, eCallback)
{
	var invalidErrorText = "";
	var fileDesigination = pInfo.isFile();
	
	if (fileDesigination === true)
	{
		// Path actually refers to a file. Not safe.
		invalidErrorText = fileErrorText.writeFolderSafety(pDesc);
		return eCallback(new Error(invalidErrorText), null);
	}
	else
	{
		// Folder is safe
		return eCallback(null, true);
	}
}




module.exports =
{
	checkFolderSafe: checkFolderPathSafe
};