// This file is used to prepare node and edge objects for graphs.


// Conversion rate between grid and graph coordinates. (1 grid = 100 graph)
const scaleFactorNumber = 100;



// Creates a new node object for use in a graph.
function defineNodeObject(idNumber, rNumber, cNumber, mHeuristic)
{
	var defineRes = {};
	
	defineRes["nodeID"] = idNumber;
	defineRes["rowNumber"] = rNumber;
	defineRes["colNumber"] = cNumber;
	defineRes["typeFlag"] = 0;
	defineRes["manualHeuristic"] = mHeuristic;
	
	return defineRes;
}


// Creates a new edge object for use in a graph.
function defineEdgeObject(idNumber, originNode, destNode, distLength)
{
	var defineRes = {};
	
	defineRes["edgeID"] = idNumber;
	defineRes["origin"] = originNode;
	defineRes["destination"] = destNode;
	defineRes["distance"] = distLength;
	defineRes["highlightedRoute"] = false;
	
	return defineRes;
}



// Adds Dijkstra pathfinding properties to Node objects in an array.
function initializeNodeDsktraAttributes(nList)
{
	var nodeIndex = 0;
	var currentNode = {};
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNode = nList[nodeIndex];
		
		currentNode["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentNode["previous"] = null;
		currentNode["visited"] = false;
	}
	
}


// Adds A*Star pathfinding properties to Node objects in an array.
function initializeNodeAstarAttributes(nList)
{
	var nodeIndex = 0;
	var currentNode = {};
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNode = nList[nodeIndex];
		
		currentNode["heuristicValue"] = null;
		currentNode["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentNode["totalCost"] = null;
		currentNode["previous"] = null;
		currentNode["visitFlag"] = -1;
	}
	
}



// Adds 'any possible' pathfinding properties to Node objects in an array.
function initializeNodeAnyPossibleAttributes(nList)
{
	var nodeIndex = 0;
	var currentNode = {};
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNode = nList[nodeIndex];
		
		currentNode["previous"] = null;
		currentNode["visitFlag"] = -1;
	}
	
}


// Adds block status property to Node objects in an array.
function initializeNodeBlockAttributes(nList)
{
	var nodeIndex = 0;
	var currentNode = {};
	
	for (nodeIndex = 0; nodeIndex < nList.length; nodeIndex = nodeIndex + 1)
	{
		currentNode = nList[nodeIndex];
		currentNode["blocked"] = false;
	}
	
}



// Converts node graph coordinates to grid index position. This is used when traversing grids. (eg. 500 = 4)
function convertCoordinatesNumberToIndex(cNum)
{
	var dividedValue = Math.floor(cNum / scaleFactorNumber);
	var conversionResult = dividedValue - 1;
	return conversionResult;
}



// Converts node graph coordinates to grid coordinates string.
function stringifyNodeObjectCoordinates(nObj)
{
	var divRow = nObj.rowNumber / scaleFactorNumber;
	var divCol = nObj.colNumber / scaleFactorNumber;
	
	var stringifyRes = divRow + "," + divCol;
	return stringifyRes;
}




// Checks whether a Node object exists at a given set of graph coordinates.
function checkNodeCoordinatesExist(tgtRow, tgtCol, nList)
{
	var nodeIndex = 0;
	var currentNode = {};
	var currentRow = -1;
	var currentCol = -1;
	
	var checkRes = -1;
	
	while (nodeIndex >= 0 && nodeIndex < nList.length && checkRes === -1)
	{
		// Read current node coordinates.
		currentNode = nList[nodeIndex];
		currentRow = currentNode.rowNumber;
		currentCol = currentNode.colNumber;
		
		if (currentRow === tgtRow && currentCol === tgtCol)
		{
			// Target found.
			checkRes = nodeIndex;
		}
		
		nodeIndex = nodeIndex + 1;
	}
	
	
	return checkRes;
}



// Resets node sort order to default (Node ID in ascending order)
function resetNodeObjectSort(nList)
{
	nList.sort(function(a, b)
	{
		return a.nodeID - b.nodeID;
	});
}




module.exports =
{
	scaleFactor: scaleFactorNumber,
	defineNode: defineNodeObject,
	defineEdge: defineEdgeObject,
	initializeDsktraAttributes: initializeNodeDsktraAttributes,
	initializeAstarAttributes: initializeNodeAstarAttributes,
	initializeAnyPossibleAttributes: initializeNodeAnyPossibleAttributes,
	initializeBlockAttributes: initializeNodeBlockAttributes,
	convertCoordinatesToIndex: convertCoordinatesNumberToIndex,
	stringifyNodeCoordinates: stringifyNodeObjectCoordinates,
	checkCoordinatesExist: checkNodeCoordinatesExist,
	resetNodeSort: resetNodeObjectSort
};