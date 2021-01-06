const graphObjects = require("../../common/sub-graph/graph-objects");
const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");
const adjacentNodes = require("../../common/sub-pathfinding/adjacent-nodes");
const blockTasks = require("../../common/sub-pathfinding/block-tasks");


// Finds and blocks nodes that are unable to reach the target end point.


// Main function.
function findBlockedNodeRoutes(fullGraphObject, blockCallback)
{
	var blockResultObject = pathHelpTasks.initializeBlockedNodesResult();
	var startNodeMarked = false;
	var endNodeMarked = false;
	
	var startPoint = -1;
	var startNodeObject = {};
	
	var endPoint = -1;
	var endNodeObject = {};
	
	
	// Initializes block status and marks start node.
	graphObjects.initializeBlockAttributes(fullGraphObject.nodeList);
	startNodeMarked = pathHelpTasks.markGeneralBegin(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, blockResultObject);
	
	
	if (startNodeMarked === true)
	{
		// Marks end node.
		endNodeMarked = pathHelpTasks.markGeneralEnd(fullGraphObject.endNodeIndex, fullGraphObject.nodeList, blockResultObject);
	}
	
	if (endNodeMarked === true)
	{
		// Retrieve start node.
		startPoint = fullGraphObject.startNodeIndex;
		startNodeObject = fullGraphObject.nodeList[startPoint];
		
		// Retrieve end node.
		endPoint = fullGraphObject.endNodeIndex;
		endNodeObject = fullGraphObject.nodeList[endPoint];
		
		// Perform node blocking.
		iteratePossibleBlocks(startNodeObject, endNodeObject, fullGraphObject);
		
		// Complete.
		blockResultObject.blockCount = blockTasks.countBlockedNodes(fullGraphObject.nodeList);
		blockResultObject.successful = true;
	}
	
	
	if (blockResultObject.successful === true)
	{
		return blockCallback(null, blockResultObject);
	}
	else
	{
		return blockCallback(new Error(blockResultObject.messageText), null);
	}
	
	
}



// Recursively blocks nodes that are unable to reach the end point.
function iteratePossibleBlocks(sNodeObj, eNodeObj, fullGraphObj)
{
	var changesMade = 0;
	var canContinue = true;
	
	// Loops through nodes until no new blocks are made.
	while (canContinue === true)
	{
		changesMade = loopGraphNodes(sNodeObj, eNodeObj, fullGraphObj);
		
		if (changesMade <= 0)
		{
			canContinue = false;
		}
		
	}
	
}


// Node pass loop.
function loopGraphNodes(sNode, eNode, fullGraph)
{
	var gNodeIndex = 0;
	var currentNodeObject = {};
	var currentAdjacent = [];
	var currentBlocked = false;
	
	// Number of nodes blocked in this pass.
	var loopObject = blockTasks.initializeCounter();
	
	
	for (gNodeIndex = 0; gNodeIndex < fullGraph.nodeList.length; gNodeIndex = gNodeIndex + 1)
	{
		currentNodeObject = fullGraph.nodeList[gNodeIndex];
		currentAdjacent = [];
		currentBlocked = false;
		
		if (currentNodeObject.blocked !== true)
		{
			// Reads unblocked adjacent nodes.
			currentAdjacent = adjacentNodes.getAdjacent(currentNodeObject.nodeID, fullGraph);
			blockTasks.filterBlockedAdjacent(currentAdjacent, fullGraph.nodeList);
			
			// Checks whether the current node should be blocked based on how many neighbours are unblocked.
			currentBlocked = blockTasks.getBlockRequired(currentNodeObject.nodeID, sNode.nodeID, eNode.nodeID, currentAdjacent.length);
			blockTasks.applyLeadBlock(currentNodeObject, currentBlocked, loopObject);
		}
		
	}
	
	
	var loopRes = loopObject.updateCount;
	return loopRes;
}



module.exports =
{
	findBlockedRoutes: findBlockedNodeRoutes
};