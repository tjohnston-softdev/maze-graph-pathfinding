const pathHelpTasks = require("../../common/sub-pathfinding/path-help-tasks");


/*
	* This file is used to skip pathfinding.
	* All it really does is denote the start and end nodes.
	* No actual pathfinding takes place.
*/


function skipPathfinding(fullGraphObject, sCallback)
{
	var skipPathObject = pathHelpTasks.initializeShortestPathResult();
	var startNodeMarked = pathHelpTasks.markGeneralBegin(fullGraphObject.startNodeIndex, fullGraphObject.nodeList, skipPathObject);
	var endNodeMarked = false;
	
	if (startNodeMarked === true)
	{
		endNodeMarked = pathHelpTasks.markGeneralEnd(fullGraphObject.endNodeIndex, fullGraphObject.nodeList, skipPathObject);
	}
	
	if (endNodeMarked === true)
	{
		skipPathObject.successful = true;
		skipPathObject.totalDistance = 0;
	}
	
	
	if (skipPathObject.successful === true)
	{
		return sCallback(null, skipPathObject);
	}
	else
	{
		return sCallback(new Error(skipPathObject.messageText), null);
	}
	
}


module.exports =
{
	skipPaths: skipPathfinding
};