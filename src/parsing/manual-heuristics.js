const ora = require("ora");
const pathContext = require("../common/sub-input/path-context");


/*
	* Validates manually assigned heuristics from relative text input files.
	* Nodes with missing heuristics should have been set to zero by default when parsing.
*/



// Main function.
function performManualHeuristicValueCheck(inpGraphObject, inpPathMode, manualHeuristicCallback)
{
	var heuristicSpinner = ora("Checking Heuristic Values").start();
	
	loopHeuristics(inpGraphObject, function(mhError, mhValid)
	{
		if (mhError !== null && inpPathMode === pathContext.modes.A_STAR)
		{
			heuristicSpinner.warn(mhError.message);
			return manualHeuristicCallback(null, false);
		}
		else
		{
			heuristicSpinner.succeed("Heuristics Valid");
			return manualHeuristicCallback(null, true);
		}
	});
	
}


// Node heuristic loop.
function loopHeuristics(gObject, loopCallback)
{
	var nodeIndex = 0;
	var currentNodeObject = {};
	var currentCorrectType = false;
	var currentValid = false;
	
	var canContinue = true;
	var flaggedMessage = "";
	
	while (nodeIndex >= 0 && nodeIndex < gObject.nodeList.length && canContinue === true)
	{
		currentNodeObject = gObject.nodeList[nodeIndex];
		currentCorrectType = Number.isInteger(currentNodeObject.manualHeuristic);
		currentValid = false;
		
		if (nodeIndex === gObject.endNodeIndex)
		{
			// End node heuristic is always zero.
			currentNodeObject.manualHeuristic = 0;
			currentValid = true;
		}
		else if (currentCorrectType === true && currentNodeObject.manualHeuristic > 0)
		{
			// Valid heuristic.
			currentValid = true;
		}
		else if (currentCorrectType === true && currentNodeObject.manualHeuristic === 0)
		{
			// Invalid zero.
			canContinue = false;
			flaggedMessage = writeErrorMessage("Only the end node can have a heuristic value of zero.");
		}
		else if (currentCorrectType === true)
		{
			// Negative value.
			canContinue = false;
			flaggedMessage = writeErrorMessage("Node heuristic value cannot be negative.");
		}
		else
		{
			// Invalid type.
			canContinue = false;
			flaggedMessage = writeErrorMessage("Node heuristic value must be a valid, whole number.");
		}
		
		
		nodeIndex = nodeIndex + 1;
	}
	
	
	if (canContinue === true)
	{
		return loopCallback(null, true);
	}
	else
	{
		return loopCallback(new Error(flaggedMessage), null);
	}
	
}


// Error text.
function writeErrorMessage(descText)
{
	var writeRes = "Invalid Heuristics - " + descText;
	return writeRes;
}




module.exports =
{
	performManualHeuristicCheck: performManualHeuristicValueCheck
};