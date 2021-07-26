// Text shortcuts. Used for writing output files.

function defineShortcuts()
{
	var defineRes = {};
	
	defineRes["lineBreak"] = "\r\n";
	defineRes["firstIndent"] = "\t";
	defineRes["secondIndent"] = "\t\t";
	defineRes["thirdIndent"] = "\t\t\t";
	defineRes["fourthIndent"] = "\t\t\t\t";
	defineRes["fifthIndent"] = "\t\t\t\t\t";
	defineRes["quote"] = "'";
	defineRes["divider"] = "---";
	
	return defineRes;
}


module.exports = defineShortcuts();