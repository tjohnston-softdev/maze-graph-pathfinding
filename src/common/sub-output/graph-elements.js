/*
	* This file is used to convert node and edge objects into a format understood by cytoscape.js for the output graph.
	* Default, Start, End node colours are from: https://app.diagrams.net/ (Retrieved 2020-07-13)
*/

const highlightWeight = 5;



// Converts a graph node object into a cytoscape.js compatible entry.
function defineNodeElementObject(origNode)
{
	var defineRes = {};
	defineRes["data"] = {};
	
	defineRes.data["id"] = origNode.nodeID;
	defineRes.data["x"] = origNode.colNumber;
	defineRes.data["y"] = origNode.rowNumber;
	defineRes.data["typeFlag"] = origNode.typeFlag;
	
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





module.exports =
{
	defineNodeElement: defineNodeElementObject,
	defineEdgeElement: defineEdgeElementObject
};