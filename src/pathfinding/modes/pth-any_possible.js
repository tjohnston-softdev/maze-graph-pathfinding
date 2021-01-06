const graphObjects = require("../../common/sub-graph/graph-objects");
const findNodes = require("../../common/sub-graph/find-nodes");
const findEdges = require("../../common/sub-graph/find-edges");
const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");
const anyPossibleTasks = require("../../common/sub-pathfinding/any-possible-tasks");
const adjacentNodes = require("../../common/sub-pathfinding/adjacent-nodes");


/*
	Finds a route between the start and end nodes at random. This uses a mix between the 'Dijkstra' and 'Random Mouse' algorithms.
	Further Reading: https://en.wikipedia.org/wiki/Maze_solving_algorithm#Random_mouse_algorithm
	Retrieved: 2020-10-15
*/


// Main function.
function findAnyPossiblePath(fullGraphObject, anyCallback)
{
	var chosenPathObject = pathHelpTasks.initializeShortestPathResult();
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
	graphObjects.initializeAnyPossibleAttributes(fullGraphObject.nodeList);
	startNodeMarked = anyPossibleTasks.markStart(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, chosenPathObject);
	
	
	if (startNodeMarked === true)
	{
		endNodeMarked = pathHelpTasks.markGeneralEnd(fullGraphObject.endNodeIndex, fullGraphObject.nodeList, chosenPathObject);
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
		loopPossibleNodes(startNodeObject, endNodeObject, fullGraphObject);
		graphObjects.resetNodeSort(fullGraphObject.nodeList);
		
		// Check path found successfully.
		endReached = anyPossibleTasks.checkEndReached(endNodeObject, chosenPathObject);
	}
	
	if (endReached === true)
	{
		// Builds the complete route by backtracking from the end node.
		findNodes.plotFinalPath(endNodeObject, fullGraphObject.nodeList, chosenPathObject.sequence);
		routeComplete = pathHelpTasks.checkValidSequence(startNodeObject, endNodeObject, chosenPathObject);
	}
	
	
	if (routeComplete === true)
	{
		// Highlights the edges between the nodes on the completed route.
		routeHighlight = findEdges.highlightRoute(chosenPathObject, fullGraphObject.edgeList);
	}
	
	if (routeHighlight.valid === true)
	{
		// Random path found.
		chosenPathObject.totalDistance = routeHighlight.highlightedDistance;
		chosenPathObject.successful = true;
	}
	
	
	
	if (chosenPathObject.successful === true)
	{
		return anyCallback(null, chosenPathObject);
	}
	else
	{
		return anyCallback(new Error(chosenPathObject.messageText), null);
	}
	
	
}



// Random pathfinding loop.
function loopPossibleNodes(sNodeObject, eNodeObject, fullGraphObj)
{
	var currentVisitingNode = sNodeObject;
	var currentAdjacent = [];
	var currentNextKey = -1;
	
	var canContinue = true;
	
	
	while (canContinue === true)
	{
		currentAdjacent = [];
		currentNextKey = -1;
		
		if (currentVisitingNode.nodeID === eNodeObject.nodeID)
		{
			// End node reached. Loop complete.
			currentVisitingNode.visitFlag = 1;
			currentNextKey = -1;
		}
		else
		{
			// Find and update adjacent nodes.
			currentVisitingNode.visitFlag = 1;
			currentAdjacent = adjacentNodes.getAdjacent(currentVisitingNode.nodeID, fullGraphObj);
			updateAdjacentNodes(currentVisitingNode, currentAdjacent, fullGraphObj);
			
			// Choose node from visit queue at random.
			sortByVisited(fullGraphObj.nodeList);
			currentNextKey = handleNextNode(fullGraphObj.nodeList);
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
function updateAdjacentNodes(visitNode, adjList, fullGraph)
{
	var adjacentIndex = 0;
	
	var currentAdjacentObject = {};
	var currentNodeNumber = -1;
	var currentExistFlag = -1;
	
	var currentNodeObject = {};
	var currentFound = false;
	var currentUpdate = false;
	
	// Loops through adjacent entry objects and updates the nodes accordingly.
	for (adjacentIndex = 0; adjacentIndex < adjList.length; adjacentIndex = adjacentIndex + 1)
	{
		// Reads entry object and checks if corresponding node exists.
		currentAdjacentObject = adjList[adjacentIndex];
		currentNodeNumber = currentAdjacentObject.nodeNumber;
		currentExistFlag = findNodes.checkNodeNumberExists(currentNodeNumber, fullGraph.nodeList);
		
		currentNodeObject = {};
		currentFound = false;
		currentUpdate = false;
		
		
		if (currentExistFlag >= 0 && currentExistFlag < fullGraph.nodeList.length)
		{
			// Adjacent node exists. Check update required.
			currentNodeObject = fullGraph.nodeList[currentExistFlag];
			currentFound = true;
			currentUpdate = anyPossibleTasks.checkUpdateRequired(currentNodeObject.visitFlag);
		}
		
		
		if (currentFound === true && currentUpdate === true)
		{
			// Updates previous node and adds to visit queue.
			currentNodeObject.previous = visitNode.nodeID;
			currentNodeObject.visitFlag = 0;
		}
		
		
	}
	
}



// Randomly decides which node to visit next.
function handleNextNode(gNodeList)
{
	var nextStartPoint = anyPossibleTasks.findChoiceStart(gNodeList);
	var nextEndPoint = -1;
	
	var choiceRes = -1;
	
	if (nextStartPoint >= 0 && nextStartPoint < gNodeList.length)
	{
		// Start point found. Find end point.
		nextEndPoint = anyPossibleTasks.findChoiceEnd(gNodeList, nextStartPoint);
	}
	
	if (nextEndPoint >= 0 && nextEndPoint >= nextStartPoint && nextEndPoint < gNodeList.length)
	{
		// Chooses node index at random between limits.
		choiceRes = anyPossibleTasks.chooseNextRandom(nextStartPoint, nextEndPoint);
	}
	
	return choiceRes;
}



// Sorts nodes by visit queue status (Visited, Queued, Unvisited)
function sortByVisited(nList)
{
	nList.sort(function (a, b)
	{
		return b.visitFlag - a.visitFlag;
	});
}




module.exports =
{
	findAnyPath: findAnyPossiblePath
};