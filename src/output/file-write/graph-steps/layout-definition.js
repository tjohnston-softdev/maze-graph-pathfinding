const charShortcuts = require("../../../common/sub-output/char-shortcuts");

/*
	* This file is used to dynamically write the graph layout definition into the exported HTML file.
	* Example file: "../../../../templates/web-output/b-data.html"
*/


// Main function
function writeGraphStructure(graphWriteStream, fullGraphObject, definitionCallback)
{
	handleStructure(graphWriteStream, fullGraphObject.absolutePositions);
	handleClosingText(graphWriteStream);
	return definitionCallback(null, true);
}


// Layout structure.
function handleStructure(wStream, positionsSet)
{
	var resStructure = "";
	var preparedObject = {};
	
	// Declare variable.
	resStructure += charShortcuts.thirdIndent;
	resStructure += "var graphStructure = ";
	
	if (positionsSet === true)
	{
		// Fixed layout.
		preparedObject = {name: "preset"};
	}
	else
	{
		// Dynamic layout.
		preparedObject = {name: "cose", fit: false, animate: false};
	}
	
	resStructure += JSON.stringify(preparedObject);
	wStream.write(resStructure);
}


// End definition script. graph-structure complete.
function handleClosingText(wStream)
{
	var closeTxt = "";
	
	closeTxt += charShortcuts.lineBreak;
	closeTxt += charShortcuts.secondIndent;
	closeTxt += charShortcuts.lineBreak;
	
	closeTxt += charShortcuts.secondIndent;
	closeTxt += "</script>";
	closeTxt += charShortcuts.lineBreak;
	
	wStream.write(closeTxt);
}



module.exports =
{
	writeStructure: writeGraphStructure
};