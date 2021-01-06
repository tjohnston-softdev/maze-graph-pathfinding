// These functions help with finding blocked nodes.


// Defines block count object for node loop.
function initializeCounterObject()
{
	var intlRes = {"updateCount": 0};
	return intlRes;
}


// Checks whether a given node should be blocked.
function getNodeBlockRequired(tgtID, startID, endID, aCount)
{
	var checkRes = false;
	
	if (tgtID === startID || tgtID === endID)
	{
		// If the node is start or end, it can never be blocked.
		checkRes = false;
	}
	else if (aCount > 1)
	{
		// If the node has multiple unblocked neighbours, do not block for now.
		checkRes = false;
	}
	else
	{
		// Otherwise, a dead-end has been found.
		checkRes = true;
	}
	
	return checkRes;
}



// Removes blocked nodes from a list of adjacent search entries.
function filterBlockedAdjacentNodes(aList, nList)
{
	var adjacentIndex = 0;
	var currentAdjacentObject = {};
	var currentRemove = false;
	
	// Loops through adjacent search entries.
	while (adjacentIndex >= 0 && adjacentIndex < aList.length)
	{
		// Checks if current adjacent node is blocked.
		currentAdjacentObject = aList[adjacentIndex];
		currentRemove = checkNodeBlocked(currentAdjacentObject.nodeNumber, nList);
		
		if (currentRemove === true)
		{
			// Remove.
			aList.splice(adjacentIndex, 1);
		}
		else
		{
			// Keep.
			adjacentIndex = adjacentIndex + 1;
		}
		
	}
}


// Blocks a given node and increments loop counter.
function applyDeadLeadBlock(tgtNode, bRequired, countObj)
{
	if (bRequired === true)
	{
		tgtNode.blocked = true;
		countObj.updateCount = countObj.updateCount + 1;
	}
}


// Sorts nodes by blocked status
function sortNodesByBlock(nList)
{
	nList.sort(function (a, b)
	{
		return b.blocked - a.blocked;
	});
}


// Counts number of blocked nodes.
function countBlockedNodeObjects(nList)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	
	var countRes = 0;
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = nList[nodeIndex];
		
		if (currentNodeObject.blocked === true)
		{
			countRes = countRes + 1;
		}
		
	}
	
	return countRes;
}


// Checks whether a given node ID is blocked.
function checkNodeBlocked(tgtID, nodeObjectArr)
{
	var nodeSearchIndex = 0;
	var currentSearchNode = {};
	
	var nodeFound = false;
	var blockRes = true;
	
	while (nodeSearchIndex >= 0 && nodeSearchIndex < nodeObjectArr.length && nodeFound !== true)
	{
		currentSearchNode = nodeObjectArr[nodeSearchIndex];
		
		if (currentSearchNode.nodeID === tgtID)
		{
			nodeFound = true;
			blockRes = currentSearchNode.blocked;
		}
		
		nodeSearchIndex = nodeSearchIndex + 1;
	}
	
	
	return blockRes;
}



module.exports =
{
	initializeCounter: initializeCounterObject,
	getBlockRequired: getNodeBlockRequired,
	filterBlockedAdjacent: filterBlockedAdjacentNodes,
	applyLeadBlock: applyDeadLeadBlock,
	sortBlocked: sortNodesByBlock,
	countBlockedNodes: countBlockedNodeObjects
};