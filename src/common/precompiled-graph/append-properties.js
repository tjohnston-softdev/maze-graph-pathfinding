/*
	* This file is used to define the node sub-properties on the precompiled graph.
	* These sub-properties are relevant to pathfinding.
	* 'gObject' refers to the full graph object. (../sub-parse/parse-objects.js)
	* Node sub-property definitions are from: (../sub-graph/graph-objects.js)
*/



// Adds completed Dijkstra algorithm data to nodes.
function appendDsktraNodeAttributes(gObject)
{
	var propList = defineDsktraAttributes();
	
	var nodeIndex = 0;
	var loopCutoff = Math.min(gObject.nodeList.length, propList.length);
	
	var currentNodeObject = {};
	var currentPropertiesObject = {};
	var currentDistance = null;
	var currentPrevious = null;
	var currentVisited = null;
	
	for (nodeIndex = 0; nodeIndex < loopCutoff; nodeIndex = nodeIndex + 1)
	{
		// Reads current node and data row objects.
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentPropertiesObject = propList[nodeIndex];
		
		// Reads pathfinding sub-properties
		currentDistance = currentPropertiesObject.distanceFromStart;
		currentPrevious = currentPropertiesObject.previous;
		currentVisited = currentPropertiesObject.visited;
		
		// Appends sub-properties to current node object.
		currentNodeObject["distanceFromStart"] = currentDistance;
		currentNodeObject["previous"] = currentPrevious;
		currentNodeObject["visited"] = currentVisited;
	}
}


// Adds completed A*Star algorithm data to nodes.
function appendAstarNodeAttributes(gObject)
{
	var propList = defineAstarAttributes();
	
	var nodeIndex = 0;
	var loopCutoff = Math.min(gObject.nodeList.length, propList.length);
	
	var currentNodeObject = {};
	var currentPropertiesObject = {};
	var currentHeuristic = null;
	var currentDistance = null;
	var currentTotalCost = null;
	var currentPrevious = null;
	var currentVisited = null;
	
	for (nodeIndex = 0; nodeIndex < loopCutoff; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentPropertiesObject = propList[nodeIndex];
		
		currentHeuristic = currentPropertiesObject.heuristic;
		currentDistance = currentPropertiesObject.distanceFromStart;
		currentTotalCost = currentPropertiesObject.totalCost;
		currentPrevious = currentPropertiesObject.previous;
		currentVisited = currentPropertiesObject.visitFlag;
		
		currentNodeObject["heuristic"] = currentHeuristic;
		currentNodeObject["distanceFromStart"] = currentDistance;
		currentNodeObject["totalCost"] = currentTotalCost;
		currentNodeObject["previous"] = currentPrevious;
		currentNodeObject["visitFlag"] = currentVisited;
	}
	
}


// Adds completed 'any possible' algorithm data to nodes.
function appendAnyPossibleAttributes(gObject)
{
	var propList = defineAnyPossibleAttributes();
	
	var nodeIndex = 0;
	var loopCutoff = Math.min(gObject.nodeList.length, propList.length);
	
	var currentNodeObject = {};
	var currentPropertiesObject = {};
	var currentPrevious = null;
	var currentVisited = null;
	
	for (nodeIndex = 0; nodeIndex < loopCutoff; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentPropertiesObject = propList[nodeIndex];
		
		currentPrevious = currentPropertiesObject.previous;
		currentVisited = currentPropertiesObject.visitFlag;
		
		currentNodeObject["previous"] = currentPrevious;
		currentNodeObject["visitFlag"] = currentVisited;
	}
	
	
}



// This function adds completed 'block' data to nodes.
function appendBlockNodeAttributes(gObject)
{
	var propList = defineBlockAttributes();
	
	var nodeIndex = 0;
	var loopCutoff = Math.min(gObject.nodeList.length, propList.length);
	
	var currentNodeObject = {};
	var currentPropertiesObject = {};
	var currentBlocked = false;
	
	for (nodeIndex = 0; nodeIndex < loopCutoff; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentPropertiesObject = propList[nodeIndex];
		currentBlocked = currentPropertiesObject.blocked;
		currentNodeObject["blocked"] = currentBlocked;
	}
	
}





/*
	* This function defines Dijkstra pathfinding node data.
	* The properties of each row are copied onto the corresponding node in the graph.
*/

function defineDsktraAttributes()
{	
	var defineRes =
	[
		{nodeID: 1, distanceFromStart: 0, previous: null, visited: true},										// Start node
		{nodeID: 2, distanceFromStart: 1800, previous: 17, visited: true},										// End node
		{nodeID: 3, distanceFromStart: 100, previous: 1, visited: true},										// Other (etc)
		{nodeID: 4, distanceFromStart: 700, previous: 3, visited: true},
		{nodeID: 5, distanceFromStart: 900, previous: 4, visited: true},
		{nodeID: 6, distanceFromStart: 1100, previous: 5, visited: true},
		{nodeID: 7, distanceFromStart: 900, previous: 4, visited: true},
		{nodeID: 8, distanceFromStart: 900, previous: 9, visited: true},
		{nodeID: 9, distanceFromStart: 700, previous: 11, visited: true},
		{nodeID: 10, distanceFromStart: 900, previous: 9, visited: true},
		{nodeID: 11, distanceFromStart: 500, previous: 3, visited: true},
		{nodeID: 12, distanceFromStart: 700, previous: 11, visited: true},
		{nodeID: 13, distanceFromStart: 900, previous: 12, visited: true},
		{nodeID: 14, distanceFromStart: 1100, previous: 12, visited: true},
		{nodeID: 15, distanceFromStart: 1300, previous: 14, visited: true},
		{nodeID: 16, distanceFromStart: 1500, previous: 15, visited: true},
		{nodeID: 17, distanceFromStart: 1700, previous: 15, visited: true},
		{nodeID: 18, distanceFromStart: 1100, previous: 7, visited: true},
		{nodeID: 19, distanceFromStart: 1300, previous: 18, visited: true},
		{nodeID: 20, distanceFromStart: 1300, previous: 18, visited: true}
	];
	
	return defineRes;
}


// Defines A*Star pathfinding node data.
function defineAstarAttributes()
{
	var defineRes =
	[
		{nodeID: 1, heuristic: 1800, distanceFromStart: 0, totalCost: 1800, previous: null, visitFlag: 1},		// Start node
		{nodeID: 2, heuristic: 0, distanceFromStart: 1800, totalCost: 1800, previous: 17, visitFlag: 1},		// End node
		{nodeID: 3, heuristic: 1700, distanceFromStart: 100, totalCost: 1800, previous: 1, visitFlag: 1},		// Other (etc)
		{nodeID: 4, heuristic: 1100, distanceFromStart: 700, totalCost: 1800, previous: 3, visitFlag: 0},
		{nodeID: 5, heuristic: 900, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 6, heuristic: 700, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 7, heuristic: 900, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 8, heuristic: 1300, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 9, heuristic: 1100, distanceFromStart: 700, totalCost: 1800, previous: 11, visitFlag: 0},
		{nodeID: 10, heuristic: 900, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 11, heuristic: 1300, distanceFromStart: 500, totalCost: 1800, previous: 3, visitFlag: 1},
		{nodeID: 12, heuristic: 1100, distanceFromStart: 700, totalCost: 1800, previous: 11, visitFlag: 1},
		{nodeID: 13, heuristic: 900, distanceFromStart: 900, totalCost: 1800, previous: 12, visitFlag: 1},
		{nodeID: 14, heuristic: 700, distanceFromStart: 1100, totalCost: 1800, previous: 12, visitFlag: 1},
		{nodeID: 15, heuristic: 500, distanceFromStart: 1300, totalCost: 1800, previous: 14, visitFlag: 1},
		{nodeID: 16, heuristic: 700, distanceFromStart: 1500, totalCost: 2200, previous: 15, visitFlag: 0},
		{nodeID: 17, heuristic: 100, distanceFromStart: 1700, totalCost: 1800, previous: 15, visitFlag: 1},
		{nodeID: 18, heuristic: 700, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 19, heuristic: 500, distanceFromStart: null, totalCost: null, previous: null, visitFlag: -1},
		{nodeID: 20, heuristic: 500, distanceFromStart: 2100, totalCost: 2600, previous: 17, visitFlag: 0}
	];
	
	
	return defineRes;
}


// Defines 'any possible' pathfinding node data.
function defineAnyPossibleAttributes()
{
	var defineRes =
	[
		{nodeID: 1, previous: null, visitFlag: 1},																// Start node
		{nodeID: 2, previous: 17, visitFlag: 1},																// End node
		{nodeID: 3, previous: 1, visitFlag: 1},																	// Other (etc)
		{nodeID: 4, previous: 3, visitFlag: 1},
		{nodeID: 5, previous: 4, visitFlag: 1},
		{nodeID: 6, previous: 5, visitFlag: 1},
		{nodeID: 7, previous: 8, visitFlag: 1},
		{nodeID: 8, previous: 9, visitFlag: 1},
		{nodeID: 9, previous: 11, visitFlag: 1},
		{nodeID: 10, previous: 9, visitFlag: 1},
		{nodeID: 11, previous: 3, visitFlag: 1},
		{nodeID: 12, previous: 11, visitFlag: 1},
		{nodeID: 13, previous: 12, visitFlag: 1},
		{nodeID: 14, previous: 12, visitFlag: 1},
		{nodeID: 15, previous: 14, visitFlag: 1},
		{nodeID: 16, previous: 15, visitFlag: 1},
		{nodeID: 17, previous: 20, visitFlag: 1},
		{nodeID: 18, previous: 7, visitFlag: 1},
		{nodeID: 19, previous: 18, visitFlag: 0},
		{nodeID: 20, previous: 18, visitFlag: 1}
	];
	
	return defineRes;
}



// Defines 'block' pathfinding node data.
function defineBlockAttributes()
{
	var defineRes =
	[
		{nodeID: 1, blocked: false},
		{nodeID: 2, blocked: false},
		{nodeID: 3, blocked: false},
		{nodeID: 4, blocked: false},
		{nodeID: 5, blocked: true},
		{nodeID: 6, blocked: true},
		{nodeID: 7, blocked: false},
		{nodeID: 8, blocked: false},
		{nodeID: 9, blocked: false},
		{nodeID: 10, blocked: true},
		{nodeID: 11, blocked: false},
		{nodeID: 12, blocked: false},
		{nodeID: 13, blocked: true},
		{nodeID: 14, blocked: false},
		{nodeID: 15, blocked: false},
		{nodeID: 16, blocked: true},
		{nodeID: 17, blocked: false},
		{nodeID: 18, blocked: false},
		{nodeID: 19, blocked: true},
		{nodeID: 20, blocked: false}
	];
	
	return defineRes;
}



module.exports =
{
	appendDsktra: appendDsktraNodeAttributes,
	appendAstar: appendAstarNodeAttributes,
	appendAnyPossible: appendAnyPossibleAttributes,
	appendBlock: appendBlockNodeAttributes
};