/*
	* These functions define the base node and edge data for the precompiled graph.
	* This is what you would get from parsing the input file.
*/


function setNodeEntries(gObject)
{
	gObject.nodeList =
	[
		{nodeID: 1, rowNumber: 200, colNumber: 100, typeFlag: -1},				// Start
		{nodeID: 2, rowNumber: 1000, colNumber: 1100, typeFlag: 1},				// End
		{nodeID: 3, rowNumber: 200, colNumber: 200, typeFlag: 0},				// Other (etc)
		{nodeID: 4, rowNumber: 800, colNumber: 200, typeFlag: 0},
		{nodeID: 5, rowNumber: 1000, colNumber: 200, typeFlag: 0 },
		{nodeID: 6, rowNumber: 1000, colNumber: 400, typeFlag: 0 },
		{nodeID: 7, rowNumber: 800, colNumber: 400, typeFlag: 0 },
		{nodeID: 8, rowNumber: 400, colNumber: 400, typeFlag: 0},
		{nodeID: 9, rowNumber: 400, colNumber: 600, typeFlag: 0},
		{nodeID: 10, rowNumber: 600, colNumber: 600, typeFlag: 0},
		{nodeID: 11, rowNumber: 200, colNumber: 600, typeFlag: 0},
		{nodeID: 12, rowNumber: 200, colNumber: 800, typeFlag: 0},
		{nodeID: 13, rowNumber: 200, colNumber: 1000, typeFlag: 0},
		{nodeID: 14, rowNumber: 600, colNumber: 800, typeFlag: 0},
		{nodeID: 15, rowNumber: 600, colNumber: 1000, typeFlag: 0},
		{nodeID: 16, rowNumber: 400, colNumber: 1000, typeFlag: 0},
		{nodeID: 17, rowNumber: 1000, colNumber: 1000, typeFlag: 0},
		{nodeID: 18, rowNumber: 800, colNumber: 600, typeFlag: 0},
		{nodeID: 19, rowNumber: 800, colNumber: 800, typeFlag: 0},
		{nodeID: 20, rowNumber: 1000, colNumber: 600, typeFlag: 0}
	];
}



function setEdgeEntries(gObject)
{
	gObject.edgeList =
	[
		{edgeID: 1, origin: 1, destination: 3, distance: 100, highlightedRoute: false},
		{edgeID: 2, origin: 3, destination: 4, distance: 600, highlightedRoute: false},
		{edgeID: 3, origin: 4, destination: 5, distance: 200, highlightedRoute: false},
		{edgeID: 4, origin: 5, destination: 6, distance: 200, highlightedRoute: false},
		{edgeID: 5, origin: 4, destination: 7, distance: 200, highlightedRoute: false},
		{edgeID: 6, origin: 7, destination: 8, distance: 400, highlightedRoute: false},
		{edgeID: 7, origin: 8, destination: 9, distance: 200, highlightedRoute: false},
		{edgeID: 8, origin: 9, destination: 10, distance: 200, highlightedRoute: false},
		{edgeID: 9, origin: 9, destination: 11, distance: 200, highlightedRoute: false},
		{edgeID: 10, origin: 3, destination: 11, distance: 400, highlightedRoute: false},
		{edgeID: 11, origin: 11, destination: 12, distance: 200, highlightedRoute: false},
		{edgeID: 12, origin: 12, destination: 13, distance: 200, highlightedRoute: false},
		{edgeID: 13, origin: 12, destination: 14, distance: 400, highlightedRoute: false},
		{edgeID: 14, origin: 14, destination: 15, distance: 200, highlightedRoute: false},
		{edgeID: 15, origin: 15, destination: 16, distance: 200, highlightedRoute: false},
		{edgeID: 16, origin: 15, destination: 17, distance: 400, highlightedRoute: false},
		{edgeID: 17, origin: 17, destination: 2, distance: 100, highlightedRoute: false},
		{edgeID: 18, origin: 7, destination: 18, distance: 200, highlightedRoute: false},
		{edgeID: 19, origin: 18, destination: 19, distance: 200, highlightedRoute: false},
		{edgeID: 20, origin: 18, destination: 20, distance: 200, highlightedRoute: false},
		{edgeID: 21, origin: 20, destination: 17, distance: 400, highlightedRoute: false}
	];
}




function setTargetKeys(gObject)
{
	// The start,end index numbers refer to the 'nodeList' array
	gObject.startNodeIndex = 0;
	gObject.endNodeIndex = 1;
}





module.exports =
{
	setNodes: setNodeEntries,
	setEdges: setEdgeEntries,
	setTargets: setTargetKeys
};