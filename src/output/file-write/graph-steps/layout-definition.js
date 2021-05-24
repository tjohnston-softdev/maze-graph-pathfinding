const fs = require("fs");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const storedPaths = require("../../../../stored-paths");

/*
	* This file is used to dynamically write the graph layout definition into the exported HTML file.
	* Location: "../../../../templates/web-output/relative-layout.js
*/


// Main function
function writeGraphStructure(graphWriteStream, fullGraphObject, definitionCallback)
{
	if (fullGraphObject.absolutePositions === true)
	{
		return definitionCallback(null, true);
	}
	else
	{
		readRelativeLayout(graphWriteStream, definitionCallback);
	}
}


function readRelativeLayout(wStream, readCallback)
{
	var flaggedErrorText = "";
	
	fs.readFile(storedPaths.relativeLayoutPath, "utf8", function(rError, rData)
	{
		if (rError !== null)
		{
			flaggedErrorText = streamExceptions.getFileRead("Relative Layout", rError.code);
			return readCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			wStream.write(rData);
			return readCallback(null, true);
		}
	});
}



module.exports =
{
	writeStructure: writeGraphStructure
};