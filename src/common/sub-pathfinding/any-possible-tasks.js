const pathErrorText = require("./errors/path-error-text");


// Marks 'any possible' start node.
function markStartNode(sIndex, nList, rObject)
{
	var targetNode = {};
	var markRes = false;
	
	if (sIndex >= 0 && sIndex < nList.length)
	{
		// If the start point has been defined, set node type and add to visit queue.
		targetNode = nList[sIndex];
		
		targetNode.typeFlag = -1;
		targetNode.visitFlag = 0;
		
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


// Checks whether a given node's route should be changed.
function checkNodeUpdateRequired(vFlag)
{
	var checkRes = false;
	
	if (vFlag > 0)
	{
		// If the node has already been visited, do not change.
		checkRes = false;
	}
	else if (vFlag === 0)
	{
		// If the node is part of the visit queue, use random.
		checkRes = decideOverwrite();
	}
	else
	{
		// The node has not been visited yet.
		checkRes = true;
	}
	
	return checkRes;
}


// Finds the first queue node index when sorted by status.
function findChoiceStartPoint(nList)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	
	var findRes = -1;
	
	// Loops through nodes until known unvisited node is found.
	while (nodeIndex >= 0 && nodeIndex < nList.length && findRes === -1)
	{
		currentNodeObject = nList[nodeIndex];
		
		if (currentNodeObject.visitFlag === 0)
		{
			// Unvisited node found.
			findRes = nodeIndex;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	return findRes;
}



// Finds the last queue node index when sorted by status.
function findChoiceEndPoint(nList, sPoint)
{
	var nodeIndex = sPoint + 1;
	var currentNodeObject = {};
	
	var findRes = -1;
	
	// Loops through nodes from first queue index until a non-queue node is found.
	while (nodeIndex >= 0 && nodeIndex > sPoint && nodeIndex < nList.length && findRes === -1)
	{
		currentNodeObject = nList[nodeIndex];
		
		if (currentNodeObject.visitFlag === 0)
		{
			// Known queue node. Keep searching.
			nodeIndex = nodeIndex + 1;
		}
		else
		{
			// End loop.
			findRes = nodeIndex - 1;
		}
		
	}
	
	// If the loop did not find a target node, use last index as default.
	if (findRes === -1)
	{
		findRes = nList.length - 1;
	}
	
	
	return findRes;
}


// Chooses a random node between two index numbers.
function chooseNextRandomNode(sPoint, ePoint)
{
	var pDifference = Math.abs(ePoint - sPoint);
	var randomValue = Math.random() * pDifference;
	var totalValue = sPoint + randomValue;
	var roundedNumber = Math.round(totalValue);
	
	return roundedNumber;
}



// Checks whether the end node has been visited due to any path.
function checkEndNodeReached(eNode, rObject)
{
	var checkRes = false;
	
	if (eNode.previous !== null && eNode.visitFlag > 0)
	{
		checkRes = true;
	}
	else
	{
		// End not visited.
		checkRes = false;
		rObject.messageText = pathErrorText.writeImpossibleRoute();
	}
	
	return checkRes;
}




// Decides True or False at random.
function decideOverwrite()
{
	var randomValue = Math.random();
	var roundedNumber = Math.round(randomValue);
	var overwriteRes = Boolean(roundedNumber);
	
	return overwriteRes;
}




module.exports =
{
	markStart: markStartNode,
	checkUpdateRequired: checkNodeUpdateRequired,
	findChoiceStart: findChoiceStartPoint,
	findChoiceEnd: findChoiceEndPoint,
	chooseNextRandom: chooseNextRandomNode,
	checkEndReached: checkEndNodeReached
};