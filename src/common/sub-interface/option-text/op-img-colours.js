function defineOptionText()
{
	var defineRes = {};
	
	defineRes["wallColour"] = writeColourDesc("wall", "#000000");
	defineRes["floorColour"] = writeColourDesc("floor", "#FFFFFF");
	
	return defineRes;
}


function writeColourDesc(pixelDesc, defaultHex)
{
	var writeRes = "";
	
	writeRes += "the hex colour of ";
	writeRes += pixelDesc;
	writeRes += " pixels in the target image. ";
	writeRes += "(default: ";
	writeRes += defaultHex;
	writeRes += ")";
	
	return writeRes;
}


module.exports =
{
	defineText: defineOptionText
}