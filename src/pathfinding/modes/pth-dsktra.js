const graphObjects = require("../../common/sub-graph/graph-objects");
const findNodes = require("../../common/sub-graph/find-nodes");
const findEdges = require("../../common/sub-graph/find-edges");
const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");
const dsktraHelpTasks = require("../../common/sub-pathfinding/dsktra-help-tasks");
const adjacentNodes = require("../../common/sub-pathfinding/adjacent-nodes");

/*
	Finds the shortest path between two nodes on a graph using Dijkstra's algorithm.
	Further Reading: https://en.wikipedia.org/wiki/Dijkstra's_algorithm
	Retrieved: 2020-10-13
*/


// Main function.
function findShortestPossiblePath(fullGraphObject, dskCallback)
{
	var shortestPathObject = pathHelpTasks.initializeShortestPathResult();
	var startNodeMarked = false;
	var endNodeMarked = false;
	
	var startPoint = -1;
	var startNodeObject = {};
	
	var endPoint = -1;
	var endNodeObject = {};
	var endReached = false;
	
	var routeComplete = false;
	var routeHighlight = {};
	
	// Initializes node properties and attempts to mark start node.
	graphObjects.initializeDsktraAttributes(fullGraphObject.nodeList);
	startNodeMarked = dsktraHelpTasks.markStart(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, shortestPathObject);
	
	
	if (startNodeMarked === true)
	{
		endNodeMarked = pathHelpTasks.markGeneralEnd(fullGraphObject.endNodeIndex, fullGraphObject.nodeList, shortestPathObject);
	}
	
	if (endNodeMarked === true)
	{
		// Retrieve start node.
		startPoint = fullGraphObject.startNodeIndex;
		startNodeObject = fullGraphObject.nodeList[startPoint];
		
		// Retrieve end node.
		endPoint = fullGraphObject.endNodeIndex;
		endNodeObject = fullGraphObject.nodeList[endPoint];
		
		// Perform pathfinding algorithm.
		loopUnvisitedNodes(startNodeObject, fullGraphObject);
		graphObjects.resetNodeSort(fullGraphObject.nodeList);
		
		// Check shortest path found successfully.
		endReached = dsktraHelpTasks.checkEndReached(endNodeObject, shortestPathObject);
	}
	
	if (endReached === true)
	{
		// Builds the complete route by backtracking from the end node.
		findNodes.plotFinalPath(endNodeObject, fullGraphObject.nodeList, shortestPathObject.sequence);
		routeComplete = pathHelpTasks.checkValidSequence(startNodeObject, endNodeObject, shortestPathObject);
	}
	
	if (routeComplete === true)
	{
		// Highlights the edges between the nodes on the completed route.
		routeHighlight = findEdges.highlightRoute(shortestPathObject, fullGraphObject.edgeList);
	}
	
	if (routeHighlight.valid === true)
	{
		// Pathfinding successful.
		shortestPathObject.totalDistance = endNodeObject.distanceFromStart;
		shortestPathObject.successful = true;
	}
	
	
	if (shortestPathObject.successful === true)
	{
		return dskCallback(null, shortestPathObject);
	}
	else
	{
		return dskCallback(new Error(shortestPathObject.messageText), null);
	}
	
}


// Node loop.
function loopUnvisitedNodes(sNodeObj, fullGraphObj)
{
	var currentVisitingNode = sNodeObj;
	var currentAdjacent = [];
	
	var canLoop = true;
	
	
	while (canLoop === true)
	{
		currentAdjacent = [];
		
		if (currentVisitingNode.visited === true)
		{
			// All nodes have been visited. Loop complete.
			canLoop = false;
		}
		else
		{
			// Find and update adjacent nodes.
			currentAdjacent = adjacentNodes.getAdjacent(currentVisitingNode.nodeID, fullGraphObj);
			adjacentNodes.sortByDistance(currentAdjacent);
			updateAdjacentNodes(currentVisitingNode, currentAdjacent, fullGraphObj);
			
			
			// Select the node with the shortest traversed distance so far.
			currentVisitingNode.visited = true;
			sortByUnvisited(fullGraphObj.nodeList);
			currentVisitingNode = fullGraphObj.nodeList[0];
		}
		
	}
	
}


// Adjacent nodes loop.
function updateAdjacentNodes(visitNode, adjacentList, graphObj)
{
	var adjacentIndex = 0;
	var currentItemObject = {};
	var currentNextID = -1;
	var currentDistance = -1;
	var currentExistFlag = -1;
	var currentNextNode = {};
	var currentFound = false;
	
	var currentBeforeLength = -1;
	var currentAfterLength = -1;
	var currentUpdate = false;
	
	
	// Loops through adjacent entry objects and updates the nodes accordingly.
	for (adjacentIndex = 0; adjacentIndex < adjacentList.length; adjacentIndex = adjacentIndex + 1)
	{
		// Reads adjacent entry.
		currentItemObject = adjacentList[adjacentIndex];
		currentNextID = currentItemObject.nodeNumber;
		currentDistance = currentItemObject.connectionDistance;
		
		// Checks if adjacent node exists.
		currentExistFlag = findNodes.checkNodeNumberExists(currentNextID, graphObj.nodeList);
		currentNextNode = {};
		currentFound = false;
		
		// Node distance variables.
		currentBeforeLength = -1;
		currentAfterLength = -1;
		currentUpdate = false;
		
		
		if (currentExistFlag >= 0 && currentExistFlag < graphObj.nodeList.length)
		{
			// Adjacent node exists.
			currentNextNode = graphObj.nodeList[currentExistFlag];
			currentFound = true;
		}
		
		
		if (currentFound === true && currentNextNode.visited !== true)
		{
			// Checks if there is a shorter possible route using the current node.
			currentBeforeLength = pathHelpTasks.getBeforeDistance(visitNode);
			currentAfterLength = currentBeforeLength + currentDistance;
			currentUpdate = pathHelpTasks.checkUpdateRequired(currentNextNode, currentAfterLength);
		}
		
		if (currentUpdate === true)
		{
			// Shorter route found. Update details.
			currentNextNode.distanceFromStart = currentAfterLength;
			currentNextNode.previous = visitNode.nodeID;
		}
		
		
		
	}
	
}



// Sorts nodes according to: Unvisited, shortest distance, ascending ID.
function sortByUnvisited(nList)
{
	nList.sort(function(a, b)
	{
		return a.visited - b.visited || a.distanceFromStart - b.distanceFromStart || a.nodeID - b.nodeID;
	});
}




module.exports =
{
	findShortestPath: findShortestPossiblePath
};