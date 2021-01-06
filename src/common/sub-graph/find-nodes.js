// Functions related to searching for nodes in a graph.



// Plots the final route from start to end by backtracking through the 'previous' property.
function plotFinalRoutePath(lastNodeObj, nList, seqList)
{
	var currentTrackedNode = lastNodeObj;
	var currentTrackID = -1;
	var currentUsed = false;
	var currentAdded = false;
	var currentPreviousID = -1;
	var currentPreviousExists = -1;
	var currentUpdated = false;
	
	var canLoop = true;
	
	
	// This loop starts at the end node and works backwards.
	while (canLoop === true)
	{
		currentTrackID = currentTrackedNode.nodeID;
		currentUsed = seqList.includes(currentTrackID);
		currentAdded = false;
		currentPreviousID = -1;
		currentPreviousExists = -1;
		currentUpdated = false;
		
		// If node has not been already used, add it to the beginning.
		if (currentUsed !== true)
		{
			seqList.unshift(currentTrackID);
			currentAdded = true;
		}
		
		// If node was added to the route, check whether it has a valid previous node.
		if (currentAdded === true && currentTrackedNode.previous !== null)
		{
			currentPreviousID = currentTrackedNode.previous;
			currentPreviousExists = findNodeID(currentPreviousID, nList);
		}
		
		// If a previous node was found, we can visit it.
		if (currentPreviousExists >= 0 && currentPreviousExists < nList.length)
		{
			currentTrackedNode = nList[currentPreviousExists];
			currentUpdated = true;
		}
		
		// Otherwise stop backtracking.
		if (currentUpdated !== true)
		{
			canLoop = false;
		}
	}
	
}




// Checks whether there is an existing node with the given ID.
function findNodeID(tNodeID, nodeObjectArr)
{
	var nodeIndex = 0;
	var currentNode = {};
	
	var findLoopRes = -1;
	
	while (nodeIndex >= 0 && nodeIndex < nodeObjectArr.length && findLoopRes === -1)
	{
		currentNode = nodeObjectArr[nodeIndex];
		
		if (currentNode.nodeID === tNodeID)
		{
			findLoopRes = nodeIndex;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	return findLoopRes;
}




module.exports =
{
	plotFinalPath: plotFinalRoutePath,
	checkNodeNumberExists: findNodeID
};