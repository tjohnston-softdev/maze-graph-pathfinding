const fs = require("fs");
const yieldableJSON = require("yieldable-json");
const streamExceptions = require("../../common/sub-files/stream-exceptions");


// Opens and reads image config file.
function readImageConfigFile(cFilePath, readCallback)
{
	var flaggedErrorText = "";
	
	fs.readFile(cFilePath, "utf8", function(rError, rData)
	{
		if (rError !== null)
		{
			flaggedErrorText = streamExceptions.getFileRead("Load Image Config", rError.code);
			return readCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			return readCallback(null, rData);
		}
	});
	
}


// Parses image config file contents into a JSON object.
function parseImageConfigContents(cStringData, parseCallback)
{
	var flaggedErrorText = "";
	
	yieldableJSON.parseAsync(cStringData, function (pError, pObj)
	{
		if (pError !== null)
		{
			flaggedErrorText = writeInvalidJsonText();
			return parseCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			return parseCallback(null, pObj);
		}
	});
}



function writeInvalidJsonText()
{
	var writeRes = "Load Config is not a valid JSON file.";
	return writeRes;
}



module.exports =
{
	readConfig: readImageConfigFile,
	parseConfig: parseImageConfigContents
};