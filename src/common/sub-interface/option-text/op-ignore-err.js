function defineOptionText()
{
	var defineRes = {};
	
	defineRes["txtParse"] = writeIgnoreParseDesc("text");
	defineRes["imgParse"] = writeIgnoreParseDesc("image");
	
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