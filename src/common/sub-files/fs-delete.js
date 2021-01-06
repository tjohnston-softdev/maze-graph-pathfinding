const fs = require("fs");
const fileErrorText = require("./errors/file-error-text");


// Attempts to delete a file from a given path.
function deleteExistingFile(targetFilePath, fileDesc, deleteCallback)
{
	var deleteErrorText = "";
	
	fs.unlink(targetFilePath, function (unlinkErr)
	{
		if (unlinkErr !== null && unlinkErr.code === "ENOENT")
		{
			// File does not exist.
			return deleteCallback(null, true);
		}
		else if (unlinkErr !== null)
		{
			// Error deleting file.
			deleteErrorText = fileErrorText.writeDelete(fileDesc);
			return deleteCallback(new Error(deleteErrorText), null);
		}
		else
		{
			// File deleted successfully.
			return deleteCallback(null, true);
		}
	});
	
}


module.exports =
{
	deleteFile: deleteExistingFile
};