const fs = require("fs");
const yieldableJSON = require("yieldable-json");
const streamExceptions = require("../../common/sub-files/stream-exceptions");


// Opens and reads image config file.
function readImageConfigFile(cFilePath, cMemory, readCallback)
{
	var flaggedErrorText = "";
	
	fs.readFile(cFilePath, "utf8", function(rError, rData)
	{
		if (rError !== null)
		{
			// Read error.
			flaggedErrorText = streamExceptions.getFileRead("Load Image Config", rError.code);
			return readCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			// Successful.
			cMemory.data = rData;
			return readCallback(null, true);
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
			// JSON error.
			flaggedErrorText = "Load Config is not a valid JSON file.";
			return parseCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			// Valid.
			return parseCallback(null, pObj);
		}
	});
}




module.exports =
{
	readConfig: readImageConfigFile,
	parseConfig: parseImageConfigContents
};