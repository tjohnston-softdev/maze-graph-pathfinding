const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const htmlShortcuts = require("../../../common/sub-output/html-shortcuts");
const currentTime = require("../../../common/sub-output/current-time");
const pathContext = require("../../../common/sub-input/path-context");


/*
	* This file is used to dynamically write the main body contents for a graph HTML file.
	* Example file: "../../../../templates/web-output/d-body.html"
*/


// Main function.
function writeBodyText(graphWriteStream, inpTypeText, inpPathFlag, bodyTxtCallback)
{
	var pathModeText = pathContext.getModeString(inpPathFlag);
	var creationTime = currentTime.prepareString();
	
	handleHeading(graphWriteStream);
	handleInfoField(graphWriteStream, "Input Type:", inpTypeText);
	handleInfoField(graphWriteStream, "Pathfinding Mode:", pathModeText);
	handleInfoField(graphWriteStream, "File Created:", creationTime);
	handleGraphWidget(graphWriteStream);
	
	return bodyTxtCallback(null, true);
}


// Initial text.
function handleHeading(wStream)
{
	var headingTxt = "";
	
	// End head element.
	headingTxt += charShortcuts.firstIndent;
	headingTxt += "</head>";
	headingTxt += charShortcuts.lineBreak;
	
	// Begin body element.
	headingTxt += charShortcuts.firstIndent;
	headingTxt += "<body>";
	headingTxt += charShortcuts.lineBreak;
	
	// Main heading.
	headingTxt += charShortcuts.secondIndent;
	headingTxt += "<h1>Maze Graph Pathfinding</h1>";
	headingTxt += charShortcuts.lineBreak;
	
	// Begin header information.
	headingTxt += charShortcuts.secondIndent;
	headingTxt += '<div id="graphInfo">';
	headingTxt += charShortcuts.lineBreak;
	
	wStream.write(headingTxt);
}


// Information field.
function handleInfoField(wStream, labelTxt, valueTxt)
{
	var typeTxt = "";
	
	// <span class="infoLabel">Input Type:</span>
	typeTxt += charShortcuts.thirdIndent;
	typeTxt += htmlShortcuts.openInfoLabel;
	typeTxt += labelTxt;
	typeTxt += htmlShortcuts.closeSpan;
	typeTxt += charShortcuts.lineBreak;
	
	// <span class="infoValue">Example</span>
	typeTxt += charShortcuts.thirdIndent;
	typeTxt += htmlShortcuts.openInfoValue;
	typeTxt += valueTxt;
	typeTxt += htmlShortcuts.closeSpan;
	typeTxt += charShortcuts.lineBreak;
	
	// <br>
	typeTxt += charShortcuts.thirdIndent;
	typeTxt += htmlShortcuts.br;
	typeTxt += charShortcuts.lineBreak;
	
	// Field seperator.
	typeTxt += charShortcuts.thirdIndent;
	typeTxt += charShortcuts.lineBreak;
	
	wStream.write(typeTxt);
}


// Vis.js graph container.
function handleGraphWidget(wStream)
{
	var widgetTxt = "";
	
	// Seperator.
	widgetTxt += charShortcuts.thirdIndent;
	widgetTxt += charShortcuts.lineBreak;
	
	// End header information.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += "</div>";
	widgetTxt += charShortcuts.lineBreak;
	
	// Seperator.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += charShortcuts.lineBreak;
	
	// Line break before graph.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += htmlShortcuts.br;
	widgetTxt += charShortcuts.lineBreak;
	
	// Graph container.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '<div id="graphContainer"></div>';
	widgetTxt += charShortcuts.lineBreak;
	
	// Line break before loading spinner.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += htmlShortcuts.br;
	widgetTxt += charShortcuts.lineBreak;
	
	// Loading spinner containers.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '<div id="loadContainer">';
	widgetTxt += charShortcuts.lineBreak;
	widgetTxt += charShortcuts.thirdIndent;
	widgetTxt += '<div class="loadSpinner"></div>';
	widgetTxt += charShortcuts.lineBreak;
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '</div>'
	widgetTxt += charShortcuts.lineBreak;
	
	
	// End graph-body.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += charShortcuts.lineBreak;
	
	wStream.write(widgetTxt);
}



module.exports =
{
	writeBody: writeBodyText
};