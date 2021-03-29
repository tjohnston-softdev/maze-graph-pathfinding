// These functions are used to write error message text for file system related tasks.


// Path missing.
function writeMissingError(dText)
{
	var missingRes = dText + " path does not exist.";
	return missingRes;
}


// File empty.
function writeEmptyError(dText)
{
	var emptyRes = dText + " file cannot be empty.";
	return emptyRes;
}


// Invalid file.
function writeInvalidFileError(dText)
{
	var emptyRes = dText + " is not a valid file.";
	return emptyRes;
}


// Invalid folder path.
function writeFolderSafetyError(dText)
{
	var emptyRes = dText + " must not refer to an existing file.";
	return emptyRes;
}


// File too large.
function writeFileSizeLimitError(dFileText, dSizeText)
{
	var sizeRes = dFileText + " file size must not exceed " + dSizeText;
	return sizeRes;
}


// File delete error.
function writeDeleteError(dText)
{
	var copyRes = "Error deleting " + dText + " file";
	return copyRes;
}


// Invalid file path.
function writeUnexpectedFolderError(dText)
{
	var unexpectedFolderRes = dText + " path does not refer to a valid file.";
	return unexpectedFolderRes;
}


// Read permission error.
function writeReadNotPermittedError(dText)
{
	var readPermitRes = dText + " file is not allowed to be read.";
	return readPermitRes;
}


// Too many files open.
function writeManyFilesError(dText)
{
	var manyFilesRes = "Cannot open " + dText + " file. Too many files are currently open already.";
	return manyFilesRes;
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