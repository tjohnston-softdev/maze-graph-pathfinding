const pathErrorText = require("./errors/path-error-text");


// Marks A*Star start node.
function markStartNode(sIndex, nList, rObject)
{
	var targetNode = {};
	var markRes = false;
	
	if (sIndex >= 0 && sIndex < nList.length)
	{
		// If the start point has been defined:
		targetNode = nList[sIndex];
		
		targetNode.typeFlag = -1;							// Set node type
		targetNode.distanceFromStart = 0;					// Initialize distance
		targetNode.visitFlag = 0;							// Add to visit queue
		
		markRes = true;
	}
	else
	{
		// Otherwise, flag error.
		markRes = false;
		rObject.messageText = pathErrorText.writeTargetNodeMissing("Start");
	}
	
	
	return markRes;
}


// Updates node total cost.
function updateNodeTotalCost(nObj)
{
	var calcHeuristic = nObj.heuristicValue;
	var startDist = nObj.distanceFromStart;
	
	nObj.totalCost = calcHeuristic + startDist;
}


// Decides which node to visit next for A*Star. (Sorted by total cost)
function findNextVisitNode(nList)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	
	var findRes = -1;
	
	// Loops through graph nodes until a queued item has been found.
	while (nodeIndex >= 0 && nodeIndex < nList.length && findRes === -1)
	{
		currentNodeObject = nList[nodeIndex];
		
		// If node is in the visit queue, end loop.
		if (currentNodeObject.visitFlag === 0)
		{
			findRes = nodeIndex;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	return findRes;
}



// Checks whether the end node has been visited as part of A*Star.
function checkEndNodeReached(eNode, rObject)
{
	var distanceKnown = Number.isFinite(eNode.distanceFromStart);
	var checkRes = false;
	
	if (distanceKnown === true && eNode.previous !== null && eNode.visitFlag > 0)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
		rObject.messageText = pathErrorText.writeImpossibleRoute();
	}
	
	return checkRes;
}




module.exports =
{
	markStart: markStartNode,
	updateTotalCost: updateNodeTotalCost,
	findNextNode: findNextVisitNode,
	checkEndReached: checkEndNodeReached
};