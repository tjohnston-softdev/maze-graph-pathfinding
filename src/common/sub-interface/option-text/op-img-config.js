function defineOptionText()
{
	var defineRes = {};
	
	defineRes["load"] = writeLoadSaveImageConfigDesc("file path of an existing", "loaded.");
	defineRes["save"] = writeLoadSaveImageConfigDesc("name of a saved", "saved.");
	defineRes["saveConv"] = writeSaveImageConvConfigDesc();
	
	return defineRes;
}


function writeLoadSaveImageConfigDesc(valueDesc, fileAction)
{
	var writeRes = "";
	
	writeRes += "specifies the " + valueDesc;
	writeRes += " image configuration file. ";
	writeRes += " if this is blank, no file will be ";
	writeRes += fileAction;
	
	return writeRes;
}


function writeSaveImageConvConfigDesc()
{
	var writeRes = "";
	
	writeRes += "specifies the path where the ";
	writeRes += "image configuration file will be saved. ";
	writeRes += "if this is blank, no file will be saved.";
	
	return writeRes;
}


module.exports =
{
	defineText: defineOptionText
}