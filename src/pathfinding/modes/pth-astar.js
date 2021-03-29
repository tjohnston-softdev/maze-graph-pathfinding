const graphObjects = require("../../common/sub-graph/graph-objects");
const findNodes = require("../../common/sub-graph/find-nodes");
const findEdges = require("../../common/sub-graph/find-edges");
const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");
const starHelpTasks = require("../../common/sub-pathfinding/star-help-tasks");
const adjacentNodes = require("../../common/sub-pathfinding/adjacent-nodes");
const mathTasks = require("../../common/math-tasks");


/*
	Finds the shortest path between two nodes on a graph using the A*Star algorithm.
	Further Reading: https://en.wikipedia.org/wiki/A*_search_algorithm
	Retrieved: 2020-10-13
*/


// Main function
function findShortestPossiblePath(fullGraphObject, useManualHeuristics, starCallback)
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
	graphObjects.initializeAstarAttributes(fullGraphObject.nodeList);
	startNodeMarked = starHelpTasks.markStart(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, shortestPathObject);
	
	if (startNodeMarked === true)
	{
		// Attempts to mark end node.
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
		
		// Prepares heuristic values and initializes cost.
		setNodeHeuristics(endNodeObject, fullGraphObject.nodeList, useManualHeuristics);
		starHelpTasks.updateTotalCost(startNodeObject);
		
		// Perform pathfinding algorithm.
		loopOpenNodes(startNodeObject, endNodeObject, fullGraphObject);
		graphObjects.resetNodeSort(fullGraphObject.nodeList);
		
		// Check shortest path found successfully.
		endReached = starHelpTasks.checkEndReached(endNodeObject, shortestPathObject);
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
		return starCallback(null, shortestPathObject);
	}
	else
	{
		return starCallback(new Error(shortestPathObject.messageText), null);
	}
	
	
	
	
}


// Loop visits nodes in a queue.
function loopOpenNodes(sNodeObj, eNodeObj, fullGraphObj)
{
	var currentVisitingNode = sNodeObj;
	var currentAdjacent = [];
	var currentNextKey = -1;
	
	var canContinue = true;
	
	while (canContinue === true)
	{
		currentAdjacent = [];
		currentNextKey = -1;
		
		if (currentVisitingNode.nodeID === eNodeObj.nodeID)
		{
			// End node reached. Loop complete.
			currentVisitingNode.visitFlag = 1;
			currentAdjacent = [];
			currentNextKey = -1;
		}
		else
		{
			// Find and update adjacent nodes.
			currentVisitingNode.visitFlag = 1;
			currentAdjacent = adjacentNodes.getAdjacent(currentVisitingNode.nodeID, fullGraphObj);
			updateAdjacentNodes(currentVisitingNode, currentAdjacent, fullGraphObj);
			
			// Select queued node with the lowest total cost.
			sortByCost(fullGraphObj.nodeList);
			currentNextKey = starHelpTasks.findNextNode(fullGraphObj.nodeList);
		}
		
		
		if (currentNextKey >= 0 && currentNextKey < fullGraphObj.nodeList.length)
		{
			// Visit next node.
			currentVisitingNode = fullGraphObj.nodeList[currentNextKey];
		}
		else
		{
			// Abort loop.
			canContinue = false;
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
		
		if (currentFound === true && currentNextNode.visitFlag <= 0)
		{
			// Checks if there is a shorter possible route using the current node.
			currentBeforeLength = pathHelpTasks.getBeforeDistance(visitNode);
			currentAfterLength = currentBeforeLength + currentDistance;
			currentUpdate = pathHelpTasks.checkUpdateRequired(currentNextNode, currentAfterLength);
		}
		
		if (currentUpdate === true)
		{
			// Shorter route found. Update details and add to visit queue.
			currentNextNode.distanceFromStart = currentAfterLength;
			currentNextNode.previous = visitNode.nodeID;					
			currentNextNode.visitFlag = 0;
			starHelpTasks.updateTotalCost(currentNextNode);
		}
		
		
		
	}
	
}



// Prepares node heuristic values.
function setNodeHeuristics(eNodeObj, nList, useManual)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentHeuristic = -1;
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = nList[nodeIndex];
		
		if (useManual === true)
		{
			// Use manual input value (Relative only)
			currentHeuristic = currentNodeObject.manualHeuristic;
		}
		else
		{
			// Calculate heuristic automatically.
			currentHeuristic = mathTasks.calculateNodeHeuristic(currentNodeObject, eNodeObj);
		}
		
		
		currentNodeObject.heuristicValue = currentHeuristic;
	}
	
}


// Sorts nodes by total cost (ascending)
function sortByCost(nList)
{
	nList.sort(function (a, b)
	{
		return a.totalCost - b.totalCost;
	});
}





module.exports =
{
	findShortestPath: findShortestPossiblePath
};