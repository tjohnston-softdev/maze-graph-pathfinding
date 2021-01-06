// Contains definitions for pathfinding modes.

const pathfindingModes =
{
	"DIJKSTRA": 1,
	"A_STAR": 2,
	"ALL_POSSIBLE": 3,
	"ANY_POSSIBLE": 4,
	"BLOCK": 5
};



// Converts input string into pathfinding mode flag based on keywords.
function getPathfindingModeFlag(givenString)
{
	// Defines supported keywords for each pathfinding mode.
	var dsktraKeywords = ["1", "dijkstra", "dsktra", "d"];
	var starKeywords = ["2", "astar", "a*star", "a-star", "a_star", "a+star", "star", "a*", "as"];
	var allPossibleKeywords = ["3", "all-possible", "all_possible", "allpossible", "all+possible", "all"];
	var anyPossibleKeywords = ["4", "any-possible", "any_possible", "anypossible", "any+possible", "any"];
	var blockKeywords = ["5", "block", "blocked", "b"];
	
	// Searches for the target string in each keyword list.
	var dsktraMatch = dsktraKeywords.includes(givenString);
	var starMatch = starKeywords.includes(givenString);
	var allPossibleMatch = allPossibleKeywords.includes(givenString);
	var anyPossibleMatch = anyPossibleKeywords.includes(givenString);
	var blockMatch = blockKeywords.includes(givenString);
	
	var flagRes = -1;
	
	
	// IF the target string appears in a given keyword list, use the respective pathfinding mode
	if (dsktraMatch === true)
	{
		flagRes = pathfindingModes.DIJKSTRA;
	}
	else if (starMatch === true)
	{
		flagRes = pathfindingModes.A_STAR;
	}
	else if (allPossibleMatch === true)
	{
		flagRes = pathfindingModes.ALL_POSSIBLE;
	}
	else if (anyPossibleMatch === true)
	{
		flagRes = pathfindingModes.ANY_POSSIBLE;
	}
	else if (blockMatch === true)
	{
		flagRes = pathfindingModes.BLOCK;
	}
	else
	{
		// Unknown keyword. Skip pathfinding.
		flagRes = -1;
	}
	
	
	return flagRes;
}


// Converts pathfinding mode flag into readable string
function getPathfindingModeString(givenNumber)
{
	var stringRes = "";
	
	if (givenNumber === pathfindingModes.DIJKSTRA)
	{
		stringRes = "Dijkstra";
	}
	else if (givenNumber === pathfindingModes.A_STAR)
	{
		stringRes = "A*Star";
	}
	else if (givenNumber === pathfindingModes.ALL_POSSIBLE)
	{
		stringRes = "All Possible";
	}
	else if (givenNumber === pathfindingModes.ANY_POSSIBLE)
	{
		stringRes = "Any Possible";
	}
	else if (givenNumber === pathfindingModes.BLOCK)
	{
		stringRes = "Block";
	}
	else
	{
		stringRes = "Skipped";
	}
	
	return stringRes;
}




module.exports =
{
	modes: pathfindingModes,
	getModeFlag: getPathfindingModeFlag,
	getModeString: getPathfindingModeString
};