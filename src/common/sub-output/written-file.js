// This function defines the result object for writing an output file.

function initializeWriteResultObject()
{
	var intlRes = {};
	
	intlRes["created"] = false;
	intlRes["successful"] = true;
	intlRes["errorMessageText"] = "UNDEFINED";
	
	return intlRes;
}



module.exports =
{
	initializeWriteResult: initializeWriteResultObject
};