// These functions are used to write error message text for file system related tasks.

function writeMissingError(dText)
{
	var missingRes = dText + " path does not exist.";
	return missingRes;
}


function writeEmptyError(dText)
{
	var emptyRes = dText + " file cannot be empty.";
	return emptyRes;
}


function writeInvalidFileError(dText)
{
	var emptyRes = dText + " is not a valid file.";
	return emptyRes;
}


function writeFolderSafetyError(dText)
{
	var emptyRes = dText + " must not refer to an existing file.";
	return emptyRes;
}


function writeFileSizeLimitError(dFileText, dSizeText)
{
	var sizeRes = dFileText + " file size must not exceed " + dSizeText;
	return sizeRes;
}


function writeDeleteError(dText)
{
	var copyRes = "Error deleting " + dText + " file";
	return copyRes;
}


function writeUnexpectedFolderError(dText)
{
	var unexpectedFolderRes = dText + " path does not refer to a valid file.";
	return unexpectedFolderRes;
}


function writeReadNotPermittedError(dText)
{
	var readPermitRes = dText + " file is not allowed to be read.";
	return readPermitRes;
}


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