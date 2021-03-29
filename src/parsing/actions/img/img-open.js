const jimp = require("jimp");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");


// Opens input image file.
function openTargetImageFile(imgFilePath, openCallback)
{
	var flaggedErrorText = "";
	
	jimp.read(imgFilePath, function (oError, oRes)
	{
		if (oError !== null)
		{
			// Image error.
			flaggedErrorText = streamExceptions.getFileRead("Image", oError.code);
			return openCallback(new Error(flaggedErrorText), null);
		}
		else
		{
			// Open successful.
			return openCallback(null, oRes);
		}
	});
	
}




module.exports =
{
	openTargetFile: openTargetImageFile
};