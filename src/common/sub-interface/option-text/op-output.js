function defineOptionText()
{
	var defineRes = {};
	
	defineRes["folder"] = "specifies the folder path where output result files will be written.";
	defineRes["exportGraph"] = "indicates whether to export the resulting graph diagram.";
	defineRes["exportRaw"] = "exports raw graph and path data to separate files.";
	defineRes["replace"] = "specifies whether existing files will be replaced.";
	
	return defineRes;
}


module.exports =
{
	defineText: defineOptionText
}