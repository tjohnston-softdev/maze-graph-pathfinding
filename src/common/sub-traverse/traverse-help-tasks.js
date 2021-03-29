const trErrorTxt = require("./errors/tr-error-txt");


// Defines grid traverse result object.
function defineCellTraverseObject()
{
	var defineRes = {successful: false, errorText: ""};
	return defineRes;
}


// Checks if node index is valid.
function checkUnvisitedNodeKeyExists(tgtNodeIndex, nCount, traverseResult)
{
	var checkRes = false;
	
	if (tgtNodeIndex >= 0 && tgtNodeIndex < nCount)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeMissingNodeObject();
	}
	
	return checkRes;
}



// Checks if there is a grid cell at the given coordinates.
function checkGridCellExists(matrixObj, tgtRowIndex, tgtColIndex, traverseResult)
{
	var rowObject = [];
	var cellFound = false;
	
	var checkRes = false;
	
	if (tgtRowIndex >= 0 && tgtRowIndex < matrixObj.length)
	{
		rowObject = matrixObj[tgtRowIndex];
	}
	
	if (tgtColIndex >= 0 && tgtColIndex < rowObject.length)
	{
		cellFound = true;
	}
	
	
	if (cellFound === true)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeMissingCell(tgtRowIndex, tgtColIndex);
	}
	
	
	return checkRes;
}



// Checks whether a node has been added successfully as a result of traversal.
function checkNodeAddedSuccessfully(addObj, nCount, maxNodeLimit, tgtRowIndex, tgtColIndex, traverseResult)
{
	var checkRes = false;
	
	if (addObj.matchIndex >= 0 && addObj.matchIndex < nCount)
	{
		// Added successfully.
		checkRes = true;
	}
	else if (addObj.overflow === true)
	{
		// Too many nodes.
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeMaximumTraversedObjects("Node", maxNodeLimit);
	}
	else
	{
		// Error
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeNodeAddError(tgtRowIndex, tgtColIndex);
	}
	
	return checkRes;
}


// Checks whether two node IDs are different when traversing from one point to next.
function checkNodeKeyNumbersDifferent(numberA, numberB, traverseResult)
{
	var checkRes = true;
	
	if (numberA === numberB)
	{
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeNodeKeyError(numberA);
	}
	
	return checkRes;
}


// Checks whether distance between two nodes is valid when traversing.
function checkEdgeDistanceValid(keyA, keyB, distVal)
{
	var checkRes = false;
	
	if (distVal > 0)
	{
		checkRes = true;
	}
	
	return checkRes;
}


// Checks whether it is possible to add an edge between two nodes when traversing.
function checkEdgeAddPossible(keyA, keyB, distValid, eCount, maxEdgeLimit, traverseResult)
{
	var checkRes = false;
	
	if (distValid === true && eCount >= 0 && eCount < maxEdgeLimit)
	{
		// Add possible.
		checkRes = true;
	}
	else if (distValid === true && eCount >= maxEdgeLimit)
	{
		// Too many edges.
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeMaximumTraversedObjects("Edge", maxEdgeLimit);
	}
	else
	{
		// Invalid distance.
		checkRes = false;
		traverseResult.errorText = trErrorTxt.writeEdgeDistanceError(keyA, keyB);
	}
	
	
	return checkRes;
}


// Adds node to traverse visit queue.
function markNodeKeyUnvisited(nKey, outstandingArr, completedArr)
{
	var alreadyCompleted = completedArr.includes(nKey);				// Node has already been traversed.
	var alreadyMarked = outstandingArr.includes(nKey);				// Node has already been added to queue.
	
	if (alreadyCompleted !== true && alreadyMarked !== true)
	{
		// Add to queue list.
		outstandingArr.push(nKey);
	}
	
	
}



module.exports =
{
	defineCellTraverse: defineCellTraverseObject,
	checkUnvisitedNodeExists: checkUnvisitedNodeKeyExists,
	checkCellExists: checkGridCellExists,
	checkNodeAdded: checkNodeAddedSuccessfully,
	checkNodeKeysDifferent: checkNodeKeyNumbersDifferent,
	checkEdgeDistance: checkEdgeDistanceValid,
	checkEdgePossible: checkEdgeAddPossible,
	markNodeUnvisited: markNodeKeyUnvisited
};