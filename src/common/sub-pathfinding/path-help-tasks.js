const pathErrorText = require("./errors/path-error-text");


// Defines single path result object. (Dijkstra, A*Star, any-possible)
function initializeShortestPathResultObject()
{
	var intlRes = {};
	
	intlRes["sequence"] = [];
	intlRes["totalDistance"] = null;
	intlRes["successful"] = false;
	intlRes["messageText"] = "UNDEFINED";
	
	return intlRes;
}


// Defines all-possible paths result object.
function initializeAllPathsResultObject()
{
	var intlRes = {};
	
	intlRes["completedPaths"] = [];
	intlRes["overflow"] = false;
	intlRes["successful"] = false;
	intlRes["messageText"] = "UNDEFINED";
	
	return intlRes;
}

// Defines blocked nodes result object.
function initializeBlockedNodesResultObject()
{
	var intlRes = {};
	
	intlRes["blockCount"] = null;
	intlRes["successful"] = false;
	intlRes["messageText"] = "UNDEFINED";
	
	return intlRes;
}


// Defines route object when remembering multiple paths. (all-possible)
function initializeRouteObject()
{
	var intlRes = {};
	
	intlRes["sequence"] = [];
	intlRes["totalDistance"] = null;
	
	return intlRes;
}


// Marks graph entry node. Can be used for all pathfinding algorithms.
function markGeneralBeginNode(sIndex, nList, rObject)
{
	var targetNode = {};
	var markRes = false;
	
	if (sIndex >= 0 && sIndex < nList.length)
	{
		// If the start point is defined, set node type flag.
		targetNode = nList[sIndex];
		targetNode.typeFlag = -1;
		
		markRes = true;
	}
	else
	{
		// Otherwise, flag error.
		markRes = false;
		rObject.messageText = pathErrorText.writeTargetNodeMissing("Begin");
	}
	
	return markRes;
}


// Prepares graph exit node.
function markGeneralEndNode(eIndex, nList, rObject)
{
	var targetNode = {};
	var markRes = false;
	
	if (eIndex >= 0 && eIndex < nList.length)
	{
		// If the end point is defined, set node type flag.
		targetNode = nList[eIndex];
		targetNode.typeFlag = 1;
		
		markRes = true;
	}
	else
	{
		// Otherwise, flag error.
		markRes = false;
		rObject.messageText = pathErrorText.writeTargetNodeMissing("End");
	}
	
	return markRes;
}



// Retrieves the current distance from a given node. (Dijkstra, A*Star)
function getBeforeDistanceNumber(nObject)
{
	var valueDefined = Number.isFinite(nObject.distanceFromStart);
	var distRes = 0;
	
	if (valueDefined === true)
	{
		distRes = nObject.distanceFromStart;
	}
	
	return distRes;
}


// Checks whether a given node's route should be changed based on updated distance. (Dijkstra, A*Star)
function checkNodeUpdateRequired(subjectNode, newDist)
{
	var valueDefined = Number.isFinite(subjectNode.distanceFromStart);
	var updateRes = true;
	
	if (valueDefined === true && newDist >= subjectNode.distanceFromStart)
	{
		// If the new distance is longer than the current saved, do not update.
		updateRes = false;
	}
	
	return updateRes;
}





// Checks whether a given node sequence array is valid.
function checkValidNodeSequence(sNode, eNode, rObject)
{
	var sLength = rObject.sequence.length;
	var firstItem = -1;
	var lastItem = -1;
	
	var checkRes = false;
	
	
	if (sLength >= 2)
	{
		// Reads first and last visited nodes.
		firstItem = rObject.sequence[0];
		lastItem = rObject.sequence[sLength - 1];
	}
	
	
	if (firstItem === sNode.nodeID && lastItem === eNode.nodeID)
	{
		// If the start and end nodes are visited accordingly, the sequence is valid.
		checkRes = true;
	}
	else
	{
		// Otherwise, the route is impossible.
		checkRes = false;
		rObject.messageText = pathErrorText.writeImpossibleRoute();
	}
	
	return checkRes;
}



module.exports =
{
	initializeShortestPathResult: initializeShortestPathResultObject,
	initializeAllPathsResult: initializeAllPathsResultObject,
	initializeBlockedNodesResult: initializeBlockedNodesResultObject,
	initializeRoute: initializeRouteObject,
	markGeneralBegin: markGeneralBeginNode,
	markGeneralEnd: markGeneralEndNode,
	getBeforeDistance: getBeforeDistanceNumber,
	checkUpdateRequired: checkNodeUpdateRequired,
	checkValidSequence: checkValidNodeSequence
};