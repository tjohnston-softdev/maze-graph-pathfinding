const fileErrorText = require("./errors/file-error-text");
const prefixSyntax = /^.+: /gi;


// Prepares error text when reading files using the 'line-by-line' library.
function getFileReadErrorText(fileDesc, eCode)
{
	var eTextRes = "";
	
	if (eCode === "ENOENT")
	{
		// No such file or directory
		eTextRes = fileErrorText.writeMissing(fileDesc);
	}
	else if (eCode === "EISDIR")
	{
		// Path is directory when expecting file
		eTextRes = fileErrorText.writeUnexpectedFolder(fileDesc);
	}
	else if (eCode === "EACCES" || eCode === "EPERM")
	{
		// Operation not permitted
		eTextRes = fileErrorText.writeReadNotPermitted(fileDesc);
	}
	else if (eCode === "EMFILE")
	{
		// Too many open files in system
		eTextRes = fileErrorText.writeManyFiles(fileDesc);
	}
	else
	{
		// Unknown
		eTextRes = "Error reading " + fileDesc + " file.";
	}
	
	return eTextRes;
}




// Prepares error text when writing files using 'fs.createWriteStream'
function getFileWriteErrorText(fileDesc, fileCreated)
{
	var eTextRes = "";
	
	if (fileCreated === true)
	{
		eTextRes = "Error writing " + fileDesc + " file.";
	}
	else
	{
		eTextRes = "Error creating " + fileDesc + " file.";
	}
	
	return eTextRes;
}



// Prepares error text when creating folders using 'fs.mkdir'
function getFolderCreateErrorText(eMsg)
{
	// Removes the error code from the beginning of the message.
	var bodyText = eMsg.replace(prefixRegex, "");
	var firstChar = "";
	var otherChars = "";
	
	var eTextRes = "";
	
	if (bodyText.length > 0)
	{
		// Capitalizes first character.
		firstChar = bodyText.charAt(0);
		otherChars = bodyText.substring(1);
		firstChar = firstChar.toUpperCase();
		
		eTextRes = firstChar + otherChars;
	}
	
	
	return eTextRes;
}





module.exports =
{
	getFileRead: getFileReadErrorText,
	getFileWrite: getFileWriteErrorText,
	getFolderCreate: getFolderCreateErrorText
};