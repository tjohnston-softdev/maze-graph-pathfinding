const fs = require("fs");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const storedPaths = require("../../../../stored-paths");

/*
	* This file is used to dynamically write the graph layout definition into the exported HTML file.
	* Location: "../../../../templates/layouts"
*/


// Main function
function writeGraphStructure(graphWriteStream, fullGraphObject, definitionCallback)
{
	if (fullGraphObject.absolutePositions === true)
	{
		readLayout(graphWriteStream, storedPaths.absolutePath, definitionCallback);
	}
	else
	{
		readLayout(graphWriteStream, storedPaths.relativePath, definitionCallback);
	}
}


function readLayout(wStream, layoutPath, readCallback)
{
	var flaggedErrorText = "";
	
	fs.readFile(layoutPath, "utf8", function(rError, rData)
	{
		if (rError !== null)
		{
			flaggedErrorText = streamExceptions.getFileRead("Layout", rError.code);
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