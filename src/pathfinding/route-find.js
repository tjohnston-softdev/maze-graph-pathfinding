const asyncModule = require("async");
const ora = require("ora");
const spinText = require("../common/sub-interface/spin-text/st-pathfind");
const pathContext = require("../common/sub-input/path-context");
const pthDsktra = require("./modes/pth-dsktra");
const pthAstar = require("./modes/pth-astar");
const pthAllPossible = require("./modes/pth-all_possible");
const pthAnyPossible = require("./modes/pth-any_possible");
const pthBlock = require("./modes/pth-block");
const pthSkip = require("./modes/pth-skip");


// Initializes graph pathfinding for regular input.
function performNodeGraphPathfinding(inpPathMode, inpGraphObject, pathfindCallback)
{
	// Performs different pathfinding algorithm for corresponding mode.
	if (inpPathMode === pathContext.modes.DIJKSTRA)
	{
		// Dijkstra
		coordinateDsktraMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.A_STAR)
	{
		// A*Star
		coordinateAstarMode(inpGraphObject, false, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.ALL_POSSIBLE)
	{
		// All Possible
		coordinateAllPossibleMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.ANY_POSSIBLE)
	{
		// Any Possible
		coordinateAnyPossibleMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.BLOCK)
	{
		// Block
		coordinateBlockMode(inpGraphObject, pathfindCallback);
	}
	else
	{
		// Skip
		coordinateSkipMode(inpGraphObject, pathfindCallback);
	}
}



// Initializes graph pathfinding for relative input.
function performNodeRelativePathfinding(inpPathMode, inpGraphObject, inpHeuristicsValid, pathfindCallback)
{
	if (inpPathMode === pathContext.modes.DIJKSTRA)
	{
		// Dijkstra
		coordinateDsktraMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.A_STAR && inpHeuristicsValid === true)
	{
		// Manual heuristics entered. A*Star can be run.
		coordinateAstarMode(inpGraphObject, true, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.A_STAR)
	{
		// Manual heuristics missing for A*Star. Dijkstra will be used instead.
		coordinateDsktraMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.ALL_POSSIBLE)
	{
		// All Possible
		coordinateAllPossibleMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.ANY_POSSIBLE)
	{
		// Any Possible
		coordinateAnyPossibleMode(inpGraphObject, pathfindCallback);
	}
	else if (inpPathMode === pathContext.modes.BLOCK)
	{
		// Block
		coordinateBlockMode(inpGraphObject, pathfindCallback);
	}
	else
	{
		// Skip
		coordinateSkipMode(inpGraphObject, pathfindCallback);
	}
}



// Dijkstra
function coordinateDsktraMode(dskGraphObject, modeCallback)
{
	var dsktraSpinner = ora(spinText.dsktraProg).start();
	
	pthDsktra.findShortestPath(dskGraphObject, function (mError, mResult)
	{
		if (mError !== null)
		{
			dsktraSpinner.fail("Dijkstra Pathfinding Failed");
			return modeCallback(mError, null);
		}
		else
		{
			dsktraSpinner.succeed(spinText.shortestPathComp);
			return modeCallback(null, mResult);
		}
	});
	
}


// A*Star
function coordinateAstarMode(starGraphObject, starManualHeuristics, modeCallback)
{
	var astarSpinner = ora(spinText.astarProg).start();
	
	pthAstar.findShortestPath(starGraphObject, starManualHeuristics, function (mError, mResult)
	{
		if (mError !== null)
		{
			astarSpinner.fail("A*Star Pathfinding Failed");
			return modeCallback(mError, null);
		}
		else
		{
			astarSpinner.succeed(spinText.shortestPathComp);
			return modeCallback(null, mResult);
		}
	});
	
}



// All possible paths.
function coordinateAllPossibleMode(apsGraphObject, modeCallback)
{
	var allPossibleSpinner = ora("Finding All Possible Paths").start();
	
	pthAllPossible.findAllPaths(apsGraphObject, function (mError, mResult)
	{
		if (mError !== null)
		{
			allPossibleSpinner.fail("Error Finding All Possible Paths");
			return modeCallback(mError, null);
		}
		else
		{
			allPossibleSpinner.succeed("All Paths Found");
			return modeCallback(null, mResult);
		}
	});
	
}


// Any possible path.
function coordinateAnyPossibleMode(apsGraphObject, modeCallback)
{
	var anyPossibleSpinner = ora("Finding Any Possible Path").start();
	
	pthAnyPossible.findAnyPath(apsGraphObject, function (mError, mResult)
	{
		if (mError !== null)
		{
			anyPossibleSpinner.fail("Error Finding Valid Path");
			return modeCallback(mError, null);
		}
		else
		{
			anyPossibleSpinner.succeed("Path Found");
			return modeCallback(null, mResult);
		}
	});
	
}



// Find blocked nodes.
function coordinateBlockMode(blockGraphObject, modeCallback)
{
	var blockSpinner = ora("Finding Blocked Routes").start();
	
	pthBlock.findBlockedRoutes(blockGraphObject, function (mError, mResult)
	{
		if (mError !== null)
		{
			blockSpinner.fail("Error Finding Blocked Routes");
			return modeCallback(mError, null);
		}
		else
		{
			blockSpinner.succeed("Routes Blocked");
			return modeCallback(null, mResult);
		}
	});
	
}



// Skip pathfinding.
function coordinateSkipMode(skipGraphObject, modeCallback)
{
	var skipPathSpinner = ora("Skipping Pathfinding").start();
	
	pthSkip.skipPaths(skipGraphObject, function (mError, mResult)
	{
		if (mError !== null)
		{
			skipPathSpinner.fail("Graph Node Error");
			return modeCallback(mError, null);
		}
		else
		{
			skipPathSpinner.info("Pathfinding Skipped");
			return modeCallback(null, mResult);
		}
	});
	
}



module.exports =
{
	performGraphPathfinding: performNodeGraphPathfinding,
	performRelativePathfinding: performNodeRelativePathfinding
};