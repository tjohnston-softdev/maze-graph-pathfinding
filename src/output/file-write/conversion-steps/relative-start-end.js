const charShortcuts = require("../../../common/sub-output/char-shortcuts");
const csvAttributes = require("../../../common/sub-output/csv-attributes");


// This file writes the start and end Node ID numbers for Relative conversion output files.


// Main function.
function writeStartEndPoints(cWriteStream, fullGraphObject)
{
	var resPointTxt = "";
	
	resPointTxt += "Start: ";
	resPointTxt += handleNodeIndex(fullGraphObject.startNodeIndex, fullGraphObject.nodeList);
	resPointTxt += charShortcuts.lineBreak;
	resPointTxt += "End: ";
	resPointTxt += handleNodeIndex(fullGraphObject.endNodeIndex, fullGraphObject.nodeList);
	
	cWriteStream.write(resPointTxt);
}


// Retrieve Node ID from array index.
function handleNodeIndex(nodeInd, nodeArray)
{
	var markedNodeObject = {};
	var handleRes = "";
	
	if (nodeInd >= 0 && nodeInd < nodeArray.length)
	{
		// Node exists.
		markedNodeObject = nodeArray[nodeInd];
		handleRes = markedNodeObject.nodeID;
	}
	else
	{
		// Unknown.
		handleRes = csvAttributes.errorString;
	}
	
	return handleRes;
}




module.exports =
{
	writePoints: writeStartEndPoints
};