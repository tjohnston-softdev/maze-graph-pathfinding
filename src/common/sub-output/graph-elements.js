/*
	* This file is used to convert node and edge objects into a format understood by cytoscape.js for the output graph.
	* Default, Start, End node colours are from: https://app.diagrams.net/ (Retrieved 2020-07-13)
*/



// Converts a graph node object into a cytoscape.js compatible entry.
function defineNodeElementObject(origNode)
{
	var defineRes = {};
	defineRes["data"] = {};
	defineRes["position"] = {};
	
	defineRes.data["id"] = origNode.nodeID;
	defineRes.data["typeFlag"] = origNode.typeFlag;
	defineRes.position["x"] = origNode.colNumber;
	defineRes.position["y"] = origNode.rowNumber;
	
	return defineRes;
}


// Converts a graph edge object into a cytoscape.js compatible entry.
function defineEdgeElementObject(origEdge)
{
	var defineRes = {};
	defineRes["data"] = {};
	
	defineRes.data["source"] = origEdge.origin;
	defineRes.data["target"] = origEdge.destination;
	defineRes.data["distance"] = String(origEdge.distance);
	defineRes.data["highlighted"] = origEdge.highlightedRoute;
	
	return defineRes;
}


function setNodeBlockStatus(nElement, nBlocked)
{
	nElement.data["blocked"] = nBlocked;
}





module.exports =
{
	defineNodeElement: defineNodeElementObject,
	defineEdgeElement: defineEdgeElementObject,
	setNodeBlocked: setNodeBlockStatus
};