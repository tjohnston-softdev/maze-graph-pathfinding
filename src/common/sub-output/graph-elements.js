/*
	* This file is used to convert node and edge objects into a format understood by vis.js for the output graph.
	* Default, Start, End node colours are from: https://app.diagrams.net/ (Retrieved 2020-07-13)
*/


// Element colours
const defaultNodeColour = "#7EA6E0";				// Medium Blue
const startNodeColour = "#67AB9F";					// Medium Green
const endNodeColour = "#EA6B66";					// Light Red
const blockedNodeColour = "#777777";				// Medium Grey
const edgeColour = "#000000";						// Black

// Border width
const defaultWeight = 1;
const targetWeight = 2;
const highlightWeight = 5;



// Converts a graph node object into a vis.js compatible entry.
function defineNodeElementObject(origNode)
{
	var defineRes = {};
	
	defineRes["id"] = origNode.nodeID;
	defineRes["x"] = origNode.colNumber;
	defineRes["y"] = origNode.rowNumber;
	defineRes["label"] = "";
	defineRes["fixed"] = true;
	defineRes["borderWidth"] = defaultWeight;
	defineRes["color"] = {};
	
	defineRes.color["background"] = defaultNodeColour;
	defineRes.color["border"] = edgeColour;
	
	
	return defineRes;
}


// Converts a graph edge object into a vis.js compatible entry.
function defineEdgeElementObject(origEdge)
{
	var defineRes = {};
	
	defineRes["id"] = origEdge.edgeID;
	defineRes["from"] = origEdge.origin;
	defineRes["to"] = origEdge.destination;
	defineRes["title"] = String(origEdge.distance);
	defineRes["width"] = defaultWeight;
	defineRes["color"] = edgeColour;
	defineRes["font"] = {};
	defineRes["smooth"] = {};
	
	defineRes.font["align"] = "top";
	defineRes.smooth["enabled"] = false;
	
	
	return defineRes;
}


// Sets node element text as ID number.
function setNodeNumberTextLabel(nElement, idNum)
{
	nElement.label = String(idNum);
}



// Sets colour and border width for start,end node elements.
function setNodeTargetAttributes(nElement, nType)
{
	if (nType > 0)
	{
		// End node
		nElement.color.background = endNodeColour;
		nElement.borderWidth = targetWeight;
	}
	else if (nType < 0)
	{
		// Start node
		nElement.color.background = startNodeColour;
		nElement.borderWidth = targetWeight;
	}
}


// Applies blocked colour to node element object.
function setNodeBlockedColourAttribute(nElement)
{
	nElement.color.background = blockedNodeColour;
}


// Applies heavier width to highlighted edges.
function setEdgeHighlightAttributes(eElement, eHighlighted)
{
	if (eHighlighted === true)
	{
		eElement.width = highlightWeight;
	}
}





module.exports =
{
	defineNodeElement: defineNodeElementObject,
	defineEdgeElement: defineEdgeElementObject,
	setNodeNumberLabel: setNodeNumberTextLabel,
	setNodeTarget: setNodeTargetAttributes,
	setNodeBlockedColour: setNodeBlockedColourAttribute,
	setEdgeHighlight: setEdgeHighlightAttributes
};