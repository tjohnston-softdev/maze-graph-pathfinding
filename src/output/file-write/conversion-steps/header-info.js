const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const currentTime = require("../../../common/sub-output/current-time");
const graphObjects = require("../../../common/sub-graph/graph-objects");
const csvAttributes = require("../../../common/sub-output/csv-attributes");


// This file writes header information for conversion output files.


// Main function.
function writeConversionFileHeaderInformation(cWriteStream, titleTextString, fullGraphObject)
{
	handleIntroSection(cWriteStream, titleTextString);
	handleMarkedCoordinates(cWriteStream, "Start", fullGraphObject.nodeList, fullGraphObject.startNodeIndex);
	handleMarkedCoordinates(cWriteStream, "End", fullGraphObject.nodeList, fullGraphObject.endNodeIndex);
	handleEdgeDivide(cWriteStream);
}


// Heading and creation time.
function handleIntroSection(wStream, tTxtStr)
{
	var resTitleTxt = "";
	
	resTitleTxt += tTxtStr;
	resTitleTxt += charShortcuts.lineBreak;
	
	resTitleTxt += "File Created: ";
	resTitleTxt += currentTime.prepareString();
	resTitleTxt += charShortcuts.lineBreak;
	resTitleTxt += charShortcuts.lineBreak;
	
	resTitleTxt += charShortcuts.divider;
	resTitleTxt += charShortcuts.lineBreak;
	resTitleTxt += charShortcuts.lineBreak;
	
	wStream.write(resTitleTxt);
}


// Start and End coordinates.
function handleMarkedCoordinates(wStream, labelTxt, gNodeList, markInd)
{
	var markedNodeObject = null;
	var writtenCoordinates = "";
	
	var resMarkTxt = "";
	
	
	if (markInd >= 0 && markInd < gNodeList.length)
	{
		// Node exists. Write coordinates.
		markedNodeObject = gNodeList[markInd];
		writtenCoordinates = graphObjects.stringifyNodeCoordinates(markedNodeObject);
	}
	else
	{
		// Node does not exist. Unknown coordinates.
		writtenCoordinates = csvAttributes.errorString;
	}
	
	
	resMarkTxt += labelTxt;
	resMarkTxt += ": ";
	resMarkTxt += writtenCoordinates;
	resMarkTxt += charShortcuts.lineBreak;
	
	wStream.write(resMarkTxt);
}


// Divider between header information and edge list.
function handleEdgeDivide(wStream)
{
	var resDivideTxt = "";
	
	resDivideTxt += charShortcuts.lineBreak;
	resDivideTxt += charShortcuts.divider;
	resDivideTxt += charShortcuts.lineBreak;
	resDivideTxt += charShortcuts.lineBreak;
	
	wStream.write(resDivideTxt);
}




module.exports =
{
	writeConversionHeader: writeConversionFileHeaderInformation
};