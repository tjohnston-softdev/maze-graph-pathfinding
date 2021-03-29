const graphObjects = require("../../common/sub-graph/graph-objects");
const findEdges = require("../../common/sub-graph/find-edges");
const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");
const adjacentNodes = require("../../common/sub-pathfinding/adjacent-nodes");
const allPossibleTasks = require("../../common/sub-pathfinding/all-possible-tasks");
const objectTasks = require("../../common/object-tasks");
const valueLimits = require("../../common/value-limits");


// Finds all possible paths between two nodes on a graph.


// Main function.
function findAllPossiblePaths(fullGraphObject, apsCallback)
{
	var allPathsObject = pathHelpTasks.initializeAllPathsResult();
	
	var startNodeMarked = false;
	var endNodeMarked = false;
	var nodeCountValid = false;
	
	var startPoint = -1;
	var startNodeObject = {};
	
	var endPoint = -1;
	var endNodeObject = {};
	
	var routesExist = false;
	var routesTraced = false;
	
	
	// Attempts to mark start node.
	startNodeMarked = pathHelpTasks.markGeneralBegin(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, allPathsObject);
	
	
	
	if (startNodeMarked === true)
	{
		// Attempts to mark end node.
		endNodeMarked = pathHelpTasks.markGeneralEnd(fullGraphObject.endNodeIndex, fullGraphObject.nodeList, allPathsObject);
	}
	
	if (endNodeMarked === true)
	{
		// This can only be run for relatively small graphs. Otherwise, it uses too much time and memory.
		nodeCountValid = allPossibleTasks.checkSafeNodeCount(fullGraphObject.nodeList.length, valueLimits.maxAllPossibleNodes, allPathsObject);
	}
	
	
	if (nodeCountValid === true)
	{
		// Retrieves start node.
		startPoint = fullGraphObject.startNodeIndex;
		startNodeObject = fullGraphObject.nodeList[startPoint];
		
		// Retrieves end node.
		endPoint = fullGraphObject.endNodeIndex;
		endNodeObject = fullGraphObject.nodeList[endPoint];
		
		// Performs pathfinding algorithm.
		iteratePossibleSequences(startNodeObject, endNodeObject, fullGraphObject, allPathsObject);
		
		// Check found routes valid.
		filterInvalidRoutes(fullGraphObject, allPathsObject.completedPaths);
		routesExist = allPossibleTasks.checkPossiblePathsExist(allPathsObject);
	}
	
	
	if (routesExist === true)
	{
		allPathsObject.successful = true;
	}
	
	
	if (allPathsObject.successful === true)
	{
		return apsCallback(null, allPathsObject);
	}
	else
	{
		return apsCallback(new Error(allPathsObject.messageText), null);
	}
	
}



// Checks whether the retrieved possible routes are valid.
function filterInvalidRoutes(fullGraphObj, completeRouteList)
{
	var completedRouteIndex = 0;
	var currentCompleteRoute = {};
	var currentTraced = false;
	
	while (completedRouteIndex >= 0 && completedRouteIndex < completeRouteList.length)
	{
		// Checks current route.
		currentCompleteRoute = completeRouteList[completedRouteIndex];
		currentTraced = findEdges.traceRoute(currentCompleteRoute.sequence, fullGraphObj.edgeList);
		
		
		if (currentTraced === true)
		{
			// Route valid.
			completedRouteIndex = completedRouteIndex + 1;
		}
		else
		{
			// Removes invalid route object.
			completeRouteList.splice(completedRouteIndex, 1);
		}
		
	}
	
}


// Sequence loop iterates through route possibilities.
function iteratePossibleSequences(sNodeObj, eNodeObj, fullGraphObj, allPathObj)
{
	var currentRoute = pathHelpTasks.initializeRoute();
	
	var currentVisitingNode = sNodeObj;
	var currentAdjacent = [];
	var currentChoice = {};
	var currentNextKey = -1;
	
	var backtrackPointsList = [];
	var canLoop = true;
	
	
	// Initializes start route.
	currentRoute.sequence.push(sNodeObj.nodeID);
	currentRoute.totalDistance = 0;
	
	
	// Loops until there are no more possibilities or the maximum number of routes have been found.
	while (canLoop === true && allPathObj.overflow !== true)
	{
		// Reads adjacent nodes.
		currentAdjacent = retrieveAdjacentNodes(currentVisitingNode.nodeID, eNodeObj.nodeID, currentRoute.sequence, fullGraphObj);
		currentChoice = {};
		currentNextKey = -1;
		
		
		if (currentAdjacent.length === 1)
		{
			// Straight line.
			currentChoice = allPossibleTasks.readFirstNeighbour(currentAdjacent, currentRoute.totalDistance);
		}
		else if (currentAdjacent.length >= 2)
		{
			// Use first choice. Save the others as possible backtrack points.
			adjacentNodes.sortByNumber(currentAdjacent);
			currentChoice = allPossibleTasks.readFirstNeighbour(currentAdjacent, currentRoute.totalDistance);
			allPossibleTasks.saveBacktrackPoints(currentAdjacent, currentRoute.totalDistance, backtrackPointsList, currentRoute.sequence.length);
		}
		else
		{
			// Dead-end reached. Backtrack to previous saved point.
			handleCompleteRoute(sNodeObj, eNodeObj, currentRoute, allPathObj);
			allPossibleTasks.sortBacktrackPoints(backtrackPointsList);
			currentChoice = allPossibleTasks.backtrackPreviousSaved(currentRoute, backtrackPointsList);
		}
		
		
		// Sort order is not changed so it is safe to use IDs as key in order to save time.
		currentNextKey = currentChoice.chosenID - 1;
		
		
		
		if (currentNextKey >= 0 && currentNextKey < fullGraphObj.nodeList.length)
		{
			// Update current route and visit next node.
			currentRoute.sequence.push(currentChoice.chosenID);
			currentRoute.totalDistance = currentChoice.updatedDistance;
			currentVisitingNode = fullGraphObj.nodeList[currentNextKey];
		}
		else
		{
			// No more possibilities. Abort loop.
			canLoop = false;
		}
		
	}
	
}


// Decides whether to retrieve adjacent nodes.
function retrieveAdjacentNodes(visitID, endID, routeSeq, fullGraph)
{
	var retrievedArray = [];
	
	if (visitID === endID)
	{
		// End node reached. No adjacent necessary.
		retrievedArray = [];
	}
	else
	{
		// Search as normal.
		retrievedArray = adjacentNodes.getAdjacent(visitID, fullGraph);
		adjacentNodes.filterVisited(retrievedArray, routeSeq);
	}
	
	
	return retrievedArray;
}




// This function checks whether a route is complete and can be saved.
function handleCompleteRoute(startNode, endNode, cRouteObject, aPathObj)
{
	var routeCount = aPathObj.completedPaths.length;
	var completedSuccessfully = allPossibleTasks.checkRouteComplete(startNode.nodeID, endNode.nodeID, cRouteObject);
	var savedRoute = {};
	
	var handleRes = -1;
	
	
	if (completedSuccessfully === true && routeCount >= 0 && routeCount < valueLimits.maxAllPossibleRoutes)
	{
		// Save completed route.
		savedRoute = objectTasks.cloneObject(cRouteObject);
		aPathObj.completedPaths.push(savedRoute);
		handleRes = 1;
	}
	else if (completedSuccessfully === true && routeCount >= valueLimits.maxAllPossibleRoutes)
	{
		// Too many saved routes.
		aPthObj.overflow = true;
		handleRes = 0;
	}
	else
	{
		// Route incomplete.
		handleRes = -1;
	}
	
}



module.exports =
{
	findAllPaths: findAllPossiblePaths
};