const pathErrorText = require("./errors/path-error-text");


// Checks whether the graph contains a safe number of nodes.
function checkSafeNodeCountLimit(nCount, safeLimit, rObject)
{
	var checkRes = true;
	
	if (nCount > safeLimit)
	{
		checkRes = false;
		rObject.messageText = pathErrorText.writeAllPossibleMaxNodes(safeLimit);
	}
	
	return checkRes;
}


// Uses the first adjacent node for current route step.
function readFirstNeighbourNode(neighbourList, beforeDistance)
{
	var firstItem = neighbourList[0];
	var nextNumber = firstItem.nodeNumber;
	var afterDistance = beforeDistance + firstItem.connectionDistance;
	
	var readRes = defineChoiceReadObject(nextNumber, afterDistance);
	return readRes;
}


// Saves the remaining adjacent nodes as potential backtrack points.
function saveBacktrackPointNodes(neighbourList, beforeDistance, bPoints, savePriority)
{
	var adjacentChoiceIndex = 1;
	var currentAdjacentItem = {};
	var currentNodeNumber = -1;
	var currentConnectionDistance = -1;
	var currentAfterDistance = -1;
	var currentPointObject = {};
	
	for (adjacentChoiceIndex = 1; adjacentChoiceIndex < neighbourList.length; adjacentChoiceIndex = adjacentChoiceIndex + 1)
	{
		// Reads adjacent node details.
		currentAdjacentItem = neighbourList[adjacentChoiceIndex];
		currentNodeNumber = currentAdjacentItem.nodeNumber;
		currentConnectionDistance = currentAdjacentItem.connectionDistance;
		
		// Updates point distance.
		currentAfterDistance = beforeDistance + currentConnectionDistance;
		
		// Adds backtrack point.
		currentPointObject = defineBacktrackPointObject(savePriority, currentNodeNumber, currentAfterDistance);
		bPoints.push(currentPointObject);
	}
	
}

// Sorts backtrack points according to priority.
function sortBacktrackPointEntries(bPoints)
{
	bPoints.sort(function (a, b)
	{
		return b.priority - a.priority;
	});
}


// Checks whether an 'all possible' route is complete.
function checkRouteObjectComplete(startID, endID, routeObj)
{
	var sLength = routeObj.sequence.length;
	var tDist = routeObj.totalDistance;
	var firstItem = -1;
	var lastItem = -1;
	
	var compRes = false;
	
	// If route has multiple nodes and a known distance:
	if (sLength >= 2 && tDist > 0)
	{
		// Read first and last visited nodes.
		firstItem = routeObj.sequence[0];
		lastItem = routeObj.sequence[sLength - 1];
	}
	
	// If the start and end nodes are visited accordingly, the route is valid.
	if (firstItem === startID && lastItem === endID)
	{
		compRes = true;
	}
	
	return compRes;
}


// Backtracks the current route to the previously saved point. (Sorted by priority)
function backtrackPreviousSavedPoint(routeObj, bPoints)
{
	var highestRankedPoint = {};
	var priorityNumber = -1;
	var nextNumber = -1;
	var savedDist = -1;
	var removeCount = -1;
	
	
	if (bPoints.length > 0)
	{
		// Reads highest priority backtrack point.
		highestRankedPoint = bPoints[0];
		
		// Reads backtrack point details.
		priorityNumber = highestRankedPoint.priority;
		nextNumber = highestRankedPoint.nextNode;
		savedDist = highestRankedPoint.savedDistance;
		
		// Removes excess nodes from route.
		removeCount = routeObj.sequence.length - priorityNumber;
		routeObj.sequence.splice(priorityNumber, removeCount);
		
		// Removes backtrack point.
		bPoints.splice(0, 1);
	}
	
	
	// The backtracked node will be added to the route.
	var backtrackRes = defineChoiceReadObject(nextNumber, savedDist);
	return backtrackRes;
}




// Adjacent node choice object.
function defineChoiceReadObject(cNumber, updatedDistNumber)
{
	var defineRes = {"chosenID": cNumber, "updatedDistance": updatedDistNumber};
	return defineRes;
}


// Backtrack point object.
function defineBacktrackPointObject(bPriority, nNumber, tDist)
{
	var defineRes = {};
	
	defineRes["priority"] = bPriority;
	defineRes["nextNode"] = nNumber;
	defineRes["savedDistance"] = tDist;
	
	return defineRes;
}


// Checks if there are any known completed paths.
function checkAllPossiblePathsExist(rObject)
{
	var checkRes = false;
	
	if (rObject.completedPaths.length > 0)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
		rObject.messageText = pathErrorText.writeImpossibleMultipleRoutes();
	}
	
	return checkRes;
}




module.exports =
{
	checkSafeNodeCount: checkSafeNodeCountLimit,
	readFirstNeighbour: readFirstNeighbourNode,
	saveBacktrackPoints: saveBacktrackPointNodes,
	sortBacktrackPoints: sortBacktrackPointEntries,
	checkRouteComplete: checkRouteObjectComplete,
	backtrackPreviousSaved: backtrackPreviousSavedPoint,
	checkPossiblePathsExist: checkAllPossiblePathsExist
};