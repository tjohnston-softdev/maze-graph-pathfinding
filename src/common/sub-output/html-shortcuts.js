// HTML text shortcuts. Used when writing HTML for exported graph file.


function defineShortcuts()
{
	var defineRes = {};
	
	defineRes["openInfoLabel"] = '<span class="infoLabel">';
	defineRes["openInfoValue"] = '<span class="infoValue">';
	defineRes["closeSpan"] = "</span>";
	defineRes["br"] = "<br>";
	
	return defineRes;
}


module.exports = defineShortcuts();