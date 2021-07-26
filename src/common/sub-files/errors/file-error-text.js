// These functions are used to write error message text for file system related tasks.


// Path missing.
function writeMissingError(vDesc)
{
	var writeRes = vDesc + " path does not exist.";
	return writeRes;
}


// File empty.
function writeEmptyError(vDesc)
{
	var writeRes = vDesc + " file cannot be empty.";
	return writeRes;
}


// Invalid file.
function writeInvalidFileError(vDesc)
{
	var writeRes = vDesc + " is not a valid file.";
	return writeRes;
}


// Invalid folder path.
function writeFolderSafetyError(vDesc)
{
	var writeRes = vDesc + " must not refer to an existing file.";
	return writeRes;
}


// File too large.
function writeFileSizeLimitError(vFileDesc, vMaxSize)
{
	var writeRes = vFileDesc + " file size must not exceed " + vMaxSize;
	return writeRes;
}


// File delete error.
function writeDeleteError(vDesc)
{
	var writeRes = "Error deleting " + vDesc + " file";
	return writeRes;
}


// Invalid file path.
function writeUnexpectedFolderError(vDesc)
{
	var writeRes = vDesc + " path does not refer to a valid file.";
	return writeRes;
}


// Read permission error.
function writeReadNotPermittedError(vDesc)
{
	var writeRes = vDesc + " file is not allowed to be read.";
	return writeRes;
}


// Too many files open.
function writeManyFilesError(vDesc)
{
	var writeRes = "Cannot open " + vDesc + " file. Too many files are currently open already.";
	return writeRes;
}


module.exports =
{
	writeMissing: writeMissingError,
	writeEmpty: writeEmptyError,
	writeInvalidFile: writeInvalidFileError,
	writeFolderSafety: writeFolderSafetyError,
	writeFileSizeLimit: writeFileSizeLimitError,
	writeDelete: writeDeleteError,
	writeUnexpectedFolder: writeUnexpectedFolderError,
	writeReadNotPermitted: writeReadNotPermittedError,
	writeManyFiles: writeManyFilesError
};