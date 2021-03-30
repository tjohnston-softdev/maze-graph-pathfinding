const ora = require("ora");
const mathTasks = require("../common/math-tasks");


/*
	Calculates heuristics for graph nodes when converting to Relative text files.
	This is so we can calculate heuristics without pathfinding.
*/


// Main function.
function performValueCalculation(inpGraphObject, automaticHeuristicsCallback)
{
	var heuristicSpinner = ora("Calculating Heuristic Values").start();
	
	loopHeuristics(inpGraphObject, function (heuristicErr, heuristicValid)
	{
		heuristicSpinner.succeed("Heuristics Calculated");
		return automaticHeuristicsCallback(null, true);
	});
}


// Calculate heuristics for each node.
function loopHeuristics(gObject, loopCallback)
{
	var eIndex = gObject.endNodeIndex;
	var eNodeObject = gObject.nodeList[eIndex];
	
	var nodeIndex = 0;
	var currentNodeObject = {};
	
	for (nodeIndex = 0; nodeIndex < gObject.nodeList.length; nodeIndex = nodeIndex + 1)
	{
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentNodeObject["calculatedHeuristic"] = mathTasks.calculateNodeHeuristic(currentNodeObject, eNodeObject);
	}
	
	return loopCallback(null, true);
}



module.exports =
{
	performCalculation: performValueCalculation
};