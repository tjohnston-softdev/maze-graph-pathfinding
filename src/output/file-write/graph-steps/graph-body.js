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
	
	handleInfoEnd(graphWriteStream);
	handleGraphWidget(graphWriteStream);
	handleLoadSpinnerWidget(graphWriteStream);
	handleExportButton(graphWriteStream);
	handleEndBody(graphWriteStream);
	
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


// End header information.
function handleInfoEnd(wStream)
{
	var infoEndTxt = "";
	
	// Seperator.
	infoEndTxt += charShortcuts.thirdIndent;
	infoEndTxt += charShortcuts.lineBreak;
	
	// End section.
	infoEndTxt += charShortcuts.secondIndent;
	infoEndTxt += "</div>";
	infoEndTxt += charShortcuts.lineBreak;
	
	// Seperator.
	infoEndTxt += charShortcuts.secondIndent;
	infoEndTxt += charShortcuts.lineBreak;
	
	// Line break before graph.
	infoEndTxt += charShortcuts.secondIndent;
	infoEndTxt += htmlShortcuts.br;
	infoEndTxt += charShortcuts.lineBreak;
	
	wStream.write(infoEndTxt);
}


// Cytoscape.js graph container.
function handleGraphWidget(wStream)
{
	var widgetTxt = "";
	
	// Graph container.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '<div id="graphContainer"></div>';
	widgetTxt += charShortcuts.lineBreak;
	
	// Line break before loading spinner.
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += htmlShortcuts.br;
	widgetTxt += charShortcuts.lineBreak;
	
	wStream.write(widgetTxt);
}


// Loading spinner containers.
function handleLoadSpinnerWidget(wStream)
{
	var widgetTxt = "";
	
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '<div id="loadContainer">';
	widgetTxt += charShortcuts.lineBreak;
	
	widgetTxt += charShortcuts.thirdIndent;
	widgetTxt += '<div class="loadSpinner"></div>';
	widgetTxt += charShortcuts.lineBreak;
	
	widgetTxt += charShortcuts.secondIndent;
	widgetTxt += '</div>'
	widgetTxt += charShortcuts.lineBreak;
	
	wStream.write(widgetTxt);
}


function handleExportButton(wStream)
{
	var buttonTxt = "";
	
	buttonTxt += charShortcuts.secondIndent;
	buttonTxt += charShortcuts.lineBreak;
	
	buttonTxt += charShortcuts.secondIndent;
	buttonTxt += htmlShortcuts.br;
	buttonTxt += charShortcuts.lineBreak;
	
	buttonTxt += charShortcuts.secondIndent;
	buttonTxt += '<button type="button" id="btnExport" onclick="exportGraphImage();">';
	buttonTxt += "Export Image";
	buttonTxt += "</button>";
	buttonTxt += charShortcuts.lineBreak;
	
	wStream.write(buttonTxt);
}


// End graph-body.
function handleEndBody(wStream)
{
	var endTxt = "";
	endTxt += charShortcuts.secondIndent;
	endTxt += charShortcuts.lineBreak;
	wStream.write(endTxt);
}



module.exports =
{
	writeBody: writeBodyText
};