// This file is used to update edge highlight status on the precompiled graph as a result of pathfinding.



// Sets highlight status on a group of edge objects according to a boolean list.
function setEdgeHighlights(eList, statusList)
{
	var edgeIndex = 0;
	var loopCutoff = Math.min(eList.length, statusList.length);
	
	var currentEdgeObject = {};
	var currentStatus = null;
	
	for (edgeIndex = 0; edgeIndex < loopCutoff; edgeIndex = edgeIndex + 1)
	{
		currentEdgeObject = eList[edgeIndex];
		currentStatus = statusList[edgeIndex];
		
		currentEdgeObject.highlightedRoute = currentStatus;
	}
	
}


// Defines edge highlight status for Dijkstra pathfinding.
function defineDsktraEdgeHighlights()
{	
	var defineRes = [];
	
	// Assumed to be ordered by edge ID
	defineRes.push(true, false, false, false, false, false, false);
	defineRes.push(false, false, true, true, false, true, true);
	defineRes.push(false, true, true, false, false, false, false);
	
	return defineRes;
}


// Defines edge highlight status for A*Star pathfinding.
function defineAstarEdgeHighlights()
{
	var defineRes = [];
	
	defineRes.push(true,false,false,false,false);
	defineRes.push(false,false,false,false,true);
	defineRes.push(true,false,true,true,false,true);
	defineRes.push(true,false,false,false,false);
	
	return defineRes;
}


// Defines edge highlight status for 'any possible' pathfinding.
function defineAnyPossibleEdgeHighlights()
{
	var defineRes = [];
	
	defineRes.push(true, false, false, false, false, true, true, false, true);
	defineRes.push(true, false, false, false, false, false, false, true);
	defineRes.push(true, false, true, true);
	
	return defineRes;
}





module.exports =
{
	setHighlights: setEdgeHighlights,
	defineDsktra: defineDsktraEdgeHighlights,
	defineAstar: defineAstarEdgeHighlights,
	defineAnyPossible: defineAnyPossibleEdgeHighlights
};