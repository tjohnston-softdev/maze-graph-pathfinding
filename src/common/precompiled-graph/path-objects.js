/*
	* These functions are used to define precompiled output objects as a result of pathfinding.
	* Definitions are originally from: (../sub-pathfinding/path-help-tasks.js)
*/


function defineDsktraResults()
{
	var defineRes =
	{
		sequence: [1, 3, 11, 12, 14, 15, 17, 2],
		totalDistance: 1800,
		successful: true,
		messageText: 'UNDEFINED'
	};
	
	return defineRes;
}



function defineAstarResults()
{
	var defineRes =
	{
		sequence: [1, 3, 11, 12, 14, 15, 17, 2],
		totalDistance: 1800,
		successful: true,
		messageText: 'UNDEFINED'
	};
	
	return defineRes;
}



function defineAllPossibleResults()
{
	var defineRes =
	{
		completedPaths:
		[
			{ sequence: [1, 3, 4, 7, 8, 9, 11, 12, 14, 15, 17, 2], totalDistance: 3000 },
			{ sequence: [1, 3, 4, 7, 18, 20, 17, 2], totalDistance: 1800 },
			{ sequence: [1, 3, 11, 9, 8, 7, 18, 20, 17, 2], totalDistance: 2200 },
			{ sequence: [1, 3, 11, 12, 14, 15, 17, 2], totalDistance: 1800 }
		],
		successful: true,
		messageText: 'UNDEFINED'
	};
	
	
	return defineRes;
}


function defineAnyPossibleResults()
{
	var defineRes =
	{
		sequence: [1, 3, 11, 9, 8, 7, 18, 20, 17, 2],
		totalDistance: 2200,
		successful: true,
		messageText: 'UNDEFINED'
	};
	
	return defineRes;
}




function defineBlockResults()
{
	var defineRes =
	{
		"blockCount": 6,
		"successful": true,
		"messageText": "UNDEFINED"
	};
	
	return defineRes;
}




function defineBlankResults()
{
	var defineRes = {sequence: [], totalDistance: 0, successful: true, messageText: 'UNDEFINED'};
	return defineRes;
}





module.exports =
{
	defineDsktra: defineDsktraResults,
	defineAstar: defineAstarResults,
	defineAllPossible: defineAllPossibleResults,
	defineAnyPossible: defineAnyPossibleResults,
	defineBlock: defineBlockResults,
	defineBlank: defineBlankResults
};