const fs = require("fs");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");


/*
	* Reads template file and writes its contents into an existing output stream.
	* Location: "../../../../templates/web-output"
*/


function addTemplateFile(wStream, tFilePath, addCallback)
{
	var flaggedErrorText = "";
	
	fs.readFile(tFilePath, "utf8", function(rError, rData)
	{
		if (rError !== null)
		{
			flaggedErrorText = streamExceptions.getFileRead("Template", rError.code);
			return addCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			wStream.write(rData);
			return addCallback(null, true);
		}
	});
}



module.exports =
{
	addTemplate: addTemplateFile
};