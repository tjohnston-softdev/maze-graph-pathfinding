function defineOptionText()
{
	var defineRes = {};
	
	defineRes["ignoreTextParse"] = writeIgnoreParseDesc("text");
	defineRes["ignoreImageParse"] = writeIgnoreParseDesc("image");
	
	return defineRes;
}



function writeIgnoreParseDesc(typeDesc)
{
	var writeRes = "";
	
	writeRes += "ignores or corrects non-fatal errors ";
	writeRes += "when parsing input ";
	writeRes += typeDesc;
	writeRes += " files.";
	
	return writeRes;
}


module.exports =
{
	defineText: defineOptionText
}