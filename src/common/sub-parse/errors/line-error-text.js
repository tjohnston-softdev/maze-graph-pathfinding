/*
	* These functions write error text for parsing text files.
	* This file is named so as text files are parsed line-by-line. Displaying the line number is important.
*/

function writeSameKeysText(vLoc)
{
	var fullText = "";
	
	fullText += "Node ID numbers cannot be the same when defining an edge ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}



function writeAbsoluteZeroDistanceText(vLoc)
{
	var fullText = "";
	
	fullText += "Edge coordinates cannot be the same. ";
	fullText += "There must be at least some distance between nodes. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeRelativeZeroDistanceText(vLoc)
{
	var fullText = "";
	
	fullText += "Edge distance cannot be zero. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}



function writeEdgeTakenText(vLoc)
{
	var fullText = "";
	
	fullText += "Edges between nodes must be unique. The same edge cannot be defined twice. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}




function writeLineTooLongText(vLimit, vLoc)
{
	var fullText = "";
	
	fullText += "Input text line cannot be longer than ";
	fullText += vLimit;
	fullText += " characters. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}



function writeMaximumNodesText(vLimit, vLoc)
{
	var fullText = "";
	
	fullText += "Graph cannot contain more than "
	fullText += vLimit;
	fullText += " nodes. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeMaximumEdgesText(vLimit, vLoc)
{
	var fullText = "";
	
	fullText += "Graph cannot contain more than ";
	fullText += vLimit;
	fullText += " edges between nodes. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}




function writeInvalidFormatText(vDesc, vFormat, vLoc)
{
	var fullText = "";
	
	fullText += "Invalid ";
	fullText += vDesc;
	fullText += " line. Must follow the format: '";
	fullText += vFormat;
	fullText += "' ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}



function writeGridMaxDimensionText(vDesc, vLimit, vLoc)
{
	var fullText = "";
	
	fullText += "Input Grid cannot have more than ";
	fullText += vLimit;
	fullText += " ";
	fullText += vDesc;
	fullText += ". ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}



function writeGridLineEmptyText(vLoc)
{
	var fullText = "";
	
	fullText += "Input Grid line cannot be empty. There must be 0s or 1s. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeGridLineInvalidText(vLoc)
{
	var fullText = "";
	
	fullText += "Grid line must only consist of '1' and '0' characters. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeRelativeNodeNumberInvalidText(vDesc, vLoc)
{
	var fullText = "";
	
	fullText += vDesc;
	fullText += " Node ID must be a valid, positive, whole number. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeRelativeHeuristicNegativeText(vLoc)
{
	var fullText = "";
	
	fullText += "Node Heuristic cannot be negative. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeRelativeHeuristicInvalidText(vLoc)
{
	var fullText = "";
	
	fullText += "Node Heuristic must be a valid whole number. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}




function writeRelativeMissingNodeText(vDesc, vLoc)
{
	var fullText = "";
	
	fullText += vDesc;
	fullText += " Node ID does not exist. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeRelativeDistanceInvalidText(vLoc)
{
	var fullText = "";
	
	fullText += "Edge distance must be a valid, positive, whole number. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}


function writeEdgeNumbersSameText(vLoc)
{
	var fullText = "";
	
	fullText += "Origin and Destination Node IDs cannot be the same when defining an edge. ";
	fullText += showTextLineNumber(vLoc);
	
	return fullText;
}




function showTextLineNumber(tLineNum)
{
	// (LINE: 123)
	var nPart = "(LINE: " + tLineNum + ")";
	return nPart;
}




module.exports =
{
	writeSameKeys: writeSameKeysText,
	writeAbsoluteZeroDistance: writeAbsoluteZeroDistanceText,
	writeRelativeZeroDistance: writeRelativeZeroDistanceText,
	writeEdgeTaken: writeEdgeTakenText,
	writeLineTooLong: writeLineTooLongText,
	writeMaximumNodes: writeMaximumNodesText,
	writeMaximumEdges: writeMaximumEdgesText,
	writeInvalidFormat: writeInvalidFormatText,
	writeGridMaxDimension: writeGridMaxDimensionText,
	writeGridLineEmpty: writeGridLineEmptyText,
	writeGridLineInvalid: writeGridLineInvalidText,
	writeRelativeNodeNumberInvalid: writeRelativeNodeNumberInvalidText,
	writeRelativeHeuristicNegative: writeRelativeHeuristicNegativeText,
	writeRelativeHeuristicInvalid: writeRelativeHeuristicInvalidText,
	writeRelativeMissingNode: writeRelativeMissingNodeText,
	writeRelativeDistanceInvalid: writeRelativeDistanceInvalidText,
	writeEdgeNumbersSame: writeEdgeNumbersSameText
};