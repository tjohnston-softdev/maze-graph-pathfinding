function defineOptionText()
{
	var defineRes = {};
	
	handlePixelType("wall", "#000000", defineRes, "wallRead", "wallWrite");
	handlePixelType("floor", "#FFFFFF", defineRes, "floorRead", "floorWrite");
	
	return defineRes;
}


function handlePixelType(pixelDesc, defaultHex, parentObj, readProp, writeProp)
{
	parentObj[readProp] = writeColourDesc(pixelDesc, "input", defaultHex);
	parentObj[writeProp] = writeColourDesc(pixelDesc, "output", defaultHex);
}


function writeColourDesc(vDesc, vMode, vDefault)
{
	var writeRes = "";
	
	writeRes += "the hex colour of ";
	writeRes += vDesc;
	writeRes += " pixels in the ";
	writeRes += vMode;
	writeRes += " image. ";
	writeRes += "(default: ";
	writeRes += vDefault;
	writeRes += ")";
	
	return writeRes;
}


module.exports =
{
	defineText: defineOptionText
}