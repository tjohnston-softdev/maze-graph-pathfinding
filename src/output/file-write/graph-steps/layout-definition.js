const charShortcuts = require("../../../common/sub-output/char-shortcuts");

function writeGraphStructure(graphWriteStream, fullGraphObject, definitionCallback)
{
	handleStructure(graphWriteStream, fullGraphObject.absolutePositions);
	handleClosingText(graphWriteStream);
	return definitionCallback(null, true);
}


function handleStructure(wStream, positionsSet)
{
	var resStructure = "";
	var preparedObject = {};
	
	resStructure += charShortcuts.thirdIndent;
	resStructure += "var graphStructure = ";
	
	if (positionsSet === true)
	{
		preparedObject = {name: "preset"};
	}
	else
	{
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