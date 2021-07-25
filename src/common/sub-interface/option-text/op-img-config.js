function defineOptionText()
{
	var defineRes = {};
	
	defineRes["loadImageConfig"] = writeLoadSaveImageConfigDesc("file path of an existing", "loaded.");
	defineRes["saveImageConfig"] = writeLoadSaveImageConfigDesc("name of a saved", "saved.");
	defineRes["saveImageConvConfig"] = writeSaveImageConvConfigDesc();
	
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


module.exports = defineOptionText();