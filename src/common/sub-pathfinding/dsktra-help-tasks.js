const pathErrorText = require("./errors/path-error-text");


// Marks Dijkstra start node.
function markStartNode(sIndex, nList, rObject)
{
	var targetNode = {};
	var markRes = false;
	
	if (sIndex >= 0 && sIndex < nList.length)
	{
		// If the start point has been defined, set node type and initialize distance.
		targetNode = nList[sIndex];
		
		targetNode.typeFlag = -1;
		targetNode.distanceFromStart = 0;
		
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


// Checks whether the end node has been visited as a result of Dijkstra
function checkEndNodeReached(eNode, rObject)
{
	var distanceKnown = Number.isFinite(eNode.distanceFromStart);
	var checkRes = false;
	
	if (distanceKnown === true && eNode.previous !== null && eNode.visited === true)
	{
		checkRes = true;
	}
	else
	{
		// Unvisited.
		checkRes = false;
		rObject.messageText = pathErrorText.writeImpossibleRoute();
	}
	
	return checkRes;
}




module.exports =
{
	markStart: markStartNode,
	checkEndReached: checkEndNodeReached
};