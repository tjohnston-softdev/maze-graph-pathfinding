// These functions are used to write header rows for .csv files when exporting raw data.


// Nodes with Dijkstra properties.
function getDsktraNodeHeaderLine()
{
	var propList = initializeNodeAttributes();
	var lineRes = "";
	
	propList.push("distanceFromStart", "previous", "visited");
	lineRes = propList.join();
	
	return lineRes;
}


// Nodes with A*Star properties.
function getAstarNodeHeaderLine()
{
	var propList = initializeNodeAttributes();
	var lineRes = "";
	
	propList.push("heuristic", "distanceFromStart", "totalCost", "previous", "visitFlag");
	lineRes = propList.join();
	
	return lineRes;
}


// Nodes with 'any possible' properties.
function getAnyPossibleNodeHeaderLine()
{
	var propList = initializeNodeAttributes();
	var lineRes = "";
	
	propList.push("previous", "visitFlag");
	lineRes = propList.join();
	
	return lineRes;
}


// Nodes with block status property.
function getBlockedNodesHeaderLine()
{
	var propList = initializeNodeAttributes();
	var lineRes = "";
	
	propList.push("blocked");
	lineRes = propList.join();
	
	return lineRes;
}


// Nodes without any pathfinding properties.
function getBasicNodeHeaderLine()
{
	var propList = initializeNodeAttributes();
	var lineRes = propList.join();
	return lineRes;
}


// Edge objects. Highlight property is optional.
function getEdgeHeaderLine(useHighlight)
{
	var propList = ["edgeID", "origin", "destination", "distance"];
	
	if (useHighlight === true)
	{
		propList.push("highlightedRoute");
	}
	
	var lineRes = propList.join();
	return lineRes;
}



// Common node properties array.
function initializeNodeAttributes()
{
	var intlRes = ["nodeID", "rowNumber", "colNumber", "nodeType"];
	return intlRes;
}



module.exports =
{
	getDsktraNodeHeader: getDsktraNodeHeaderLine,
	getAstarNodeHeader: getAstarNodeHeaderLine,
	getAnyPossibleNodeHeader: getAnyPossibleNodeHeaderLine,
	getBlockedNodesHeader: getBlockedNodesHeaderLine,
	getBasicNodeHeader: getBasicNodeHeaderLine,
	getEdgeHeader: getEdgeHeaderLine
};