// This file contains functions related to finding adjacent items in a graph.


// Retrieves a list of adjacent nodes from a given target.
function getAdjacentNodes(tgtNode, graphObj)
{
	var edgeIndex = 0;
	var currentEdge = {};
	var currentMatch = -1;
	var currentFound = false;
	var currentUsed = false;
	var currentPreparedObject = {};
	
	var adjacentResult = [];
	
	// Loops through graph edges searching for neighbours.
	for (edgeIndex = 0; edgeIndex < graphObj.edgeList.length; edgeIndex = edgeIndex + 1)
	{
		currentEdge = graphObj.edgeList[edgeIndex];
		currentMatch = checkEdgeMatch(tgtNode, currentEdge.origin, currentEdge.destination);
		currentFound = false;
		currentUsed = false;
		currentPreparedObject = {};
		
		// If match flag is positive, adjacent node found.
		if (currentMatch > 0)
		{
			currentFound = true;
			currentUsed = checkNodeUsed(currentMatch, adjacentResult);
		}
		
		
		// If an adjacent node is found, add it to the list if not already.
		if (currentFound === true && currentUsed !== true)
		{
			currentPreparedObject = {"nodeNumber": currentMatch, "connectionDistance": currentEdge.distance};
			adjacentResult.push(currentPreparedObject);
		}
		
		
	}
	
	
	return adjacentResult;
}


// Removes adjacent node entries that have already been visited along a route.
function filterVisitedNodes(aList, seqList)
{
	var adjacentChoiceIndex = 0;
	var currentAdjacentItem = {};
	var currentUsed = false;
	
	// Loops through adjacent entries.
	while (adjacentChoiceIndex >= 0 && adjacentChoiceIndex < aList.length)
	{
		currentAdjacentItem = aList[adjacentChoiceIndex];
		currentUsed = seqList.includes(currentAdjacentItem.nodeNumber);
		
		if (currentUsed === true)
		{
			// Remove.
			aList.splice(adjacentChoiceIndex, 1);
		}
		else
		{
			// Keep.
			adjacentChoiceIndex = adjacentChoiceIndex + 1;
		}
		
	}
	
}




// Sorts adjacent node matches by ascending ID
function sortAdjacentNodesByNumber(aList)
{
	aList.sort(function (a, b)
	{
		return a.nodeNumber - b.nodeNumber;
	});
}


// Sorts adjacent node matches by shortest distance.
function sortAdjacentNodesByDistance(aList)
{
	aList.sort(function(a, b)
	{
		return a.connectionDistance - b.connectionDistance;
	});
}


// Checks whether target node is adjacent to eiter of the edge nodes.
function checkEdgeMatch(tNode, eOrigin, eDest)
{
	var matchRes = -1;
	
	if (tNode === eOrigin)
	{
		// Origin -> Dest
		matchRes = eDest;
	}
	else if (tNode === eDest)
	{
		// Dest -> Origin
		matchRes = eOrigin;
	}
	else
	{
		// No match
		matchRes = -1;
	}
	
	return matchRes;
}


// Checks whether a given node already has an adjacent search entry.
function checkNodeUsed(tNode, aList)
{
	var entryIndex = 0;
	var currentEntry = {};
	
	var usageRes = false;
	
	// Loops through existing adjacent entries, searching for target ID.
	while (entryIndex >= 0 && entryIndex < aList.length && usageRes !== true)
	{
		currentEntry = aList[entryIndex];
		
		if (currentEntry.nodeNumber === tNode)
		{
			usageRes = true;
		}
		
		entryIndex = entryIndex + 1;
	}
	
	return usageRes;
}




module.exports =
{
	getAdjacent: getAdjacentNodes,
	filterVisited: filterVisitedNodes,
	sortByNumber: sortAdjacentNodesByNumber,
	sortByDistance: sortAdjacentNodesByDistance
};