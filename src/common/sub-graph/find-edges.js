// Functions related to searching, tracing, and highlighting edges in a graph.


// Checks whether there is already a connection between two nodes.
function checkEdgeConnectionAvailable(tgtOrigin, tgtDestination, eList)
{
	var matchFlag = findConnection(tgtOrigin, tgtDestination, eList);		// Retrieves target edge index.
	var checkRes = true;
	
	if (matchFlag >= 0 && matchFlag < eList.length)
	{
		// Edge already exists.
		checkRes = false;
	}
	
	return checkRes;
}


// Checks whether a sequence of nodes is valid based on the edges.
function traceEdgeRoute(routeSteps, eList)
{
	var orderIndex = 0;
	var orderCutoff = routeSteps.length - 1;
	
	var currentLocation = -1;								// Current route node ID where the edge connects from.
	var currentNext = -1;									// Next route node ID where the edge connects to.
	var currentMatchFlag = -1;								// Flag whether an edge between the two nodes exist
	var currentFound = false;								// Edge found boolean.
	
	var traceRes = true;
	
	// This loop visits elements in the pattern: (0,1), (1,2), ... (n-2, n-1)
	while (orderIndex >= 0 && orderIndex < orderCutoff && traceRes === true)
	{
		// Reads node IDs and checks for connection.
		currentLocation = routeSteps[orderIndex];
		currentNext = routeSteps[orderIndex + 1];
		currentMatchFlag = findConnection(currentLocation, currentNext, eList);
		currentFound = false;
		
		if (currentMatchFlag >= 0 && currentMatchFlag < eList.length)
		{
			// Edge found
			currentFound = true;
		}
		else
		{
			// Stop tracing
			traceRes = false;
		}
		
		orderIndex = orderIndex + 1;
	}
	
	return traceRes;
}



// Similar to 'traceEdgeRoute' except it highlights edges, tracks total distance, and can return an error.
function highlightEdgeRoute(pathResObj, eList)
{
	var orderIndex = 0;
	var orderCutoff = pathResObj.sequence.length - 1;
	
	var currentLocation = -1;
	var currentNext = -1;
	var currentMatchFlag = -1;
	var currentEdgeObject = {};
	
	var highlightRes = {"valid": true, "highlightedDistance": 0};
	
	
	while (orderIndex >= 0 && orderIndex < orderCutoff && highlightRes.valid === true)
	{
		currentLocation = pathResObj.sequence[orderIndex];
		currentNext = pathResObj.sequence[orderIndex + 1];
		currentMatchFlag = findConnection(currentLocation, currentNext, eList);
		currentEdgeObject = {};
		
		if (currentMatchFlag >= 0 && currentMatchFlag < eList.length)
		{
			// Edge exists. Set highlight and increment distance.
			currentEdgeObject = eList[currentMatchFlag];
			currentEdgeObject.highlightedRoute = true;
			highlightRes.highlightedDistance += currentEdgeObject.distance;
		}
		else
		{
			// Edge does not exist.
			highlightRes.valid = false;
			pathResObj.messageText = "Error highlighting shortest route path.";
		}
		
		orderIndex = orderIndex + 1;
	}
	
	return highlightRes;
}




// Searches for an edge between two nodes.
function findConnection(tOrigin, tDest, connectionArr)
{
	var edgeIndex = 0;
	var currentEdge = {};
	var currentOrigin = -1;
	var currentDestination = -1;
	
	var findLoopRes = -1;
	
	// Loop reads edge objects until match is found.
	while (edgeIndex >= 0 && edgeIndex < connectionArr.length && findLoopRes === -1)
	{
		// Reads current edge
		currentEdge = connectionArr[edgeIndex];
		currentOrigin = currentEdge.origin;
		currentDestination = currentEdge.destination;
		
		if (tOrigin === currentOrigin && tDest === currentDestination)
		{
			// Exact match
			findLoopRes = edgeIndex;
		}
		else if (tOrigin === currentDestination && tDest === currentOrigin)
		{
			// Inverse match
			findLoopRes = edgeIndex;
		}
		else
		{
			// Keep searching
			edgeIndex = edgeIndex + 1;
		}
		
	}
	
	return findLoopRes;
}




module.exports =
{
	checkAvailable: checkEdgeConnectionAvailable,
	traceRoute: traceEdgeRoute,
	highlightRoute: highlightEdgeRoute
};