const pathContext = require("../common/sub-input/path-context");
const parseObjects = require("../common/sub-parse/parse-objects");
const baseObject = require("../common/precompiled-graph/base-object");
const appendProperties = require("../common/precompiled-graph/append-properties");
const edgeStatus = require("../common/precompiled-graph/edge-status");
const pathObjects = require("../common/precompiled-graph/path-objects");


// Retrieves precompiled graph object based on mode entered.
function retrievePrecompiledData(inpPathMode)
{
	var compiledObject = {};
	var highlightList = [];
	
	// Initializes data objects.
	compiledObject["graphData"] = parseObjects.initializeResultObject(null);
	compiledObject["pathData"] = {};
	
	// Retrieves base graph data.
	baseObject.setNodes(compiledObject.graphData);
	baseObject.setEdges(compiledObject.graphData);
	baseObject.setTargets(compiledObject.graphData);
	baseObject.setAbsolutePosition(compiledObject.graphData);
	
	
	// Additional data will be added to the graph accordingly.
	if (inpPathMode === pathContext.modes.DIJKSTRA)
	{
		// Dijkstra
		highlightList = edgeStatus.defineDsktra();
		
		appendProperties.dsktra(compiledObject.graphData);
		edgeStatus.setHighlights(compiledObject.graphData.edgeList, highlightList);
		compiledObject.pathData = pathObjects.defineDsktra();
	}
	else if (inpPathMode === pathContext.modes.A_STAR)
	{
		// A*Star
		highlightList = edgeStatus.defineAstar();
		
		appendProperties.astar(compiledObject.graphData);
		edgeStatus.setHighlights(compiledObject.graphData.edgeList, highlightList);
		compiledObject.pathData = pathObjects.defineAstar();
	}
	else if (inpPathMode === pathContext.modes.ALL_POSSIBLE)
	{
		// All Possible
		compiledObject.pathData = pathObjects.defineAllPossible();
	}
	else if (inpPathMode === pathContext.modes.ANY_POSSIBLE)
	{
		// Any Possible
		highlightList = edgeStatus.defineAnyPossible();
		
		appendProperties.anyPossible(compiledObject.graphData);
		edgeStatus.setHighlights(compiledObject.graphData.edgeList, highlightList);
		compiledObject.pathData = pathObjects.defineAnyPossible();
	}
	else if (inpPathMode === pathContext.modes.BLOCK)
	{
		// Block
		appendProperties.block(compiledObject.graphData);
		compiledObject.pathData = pathObjects.defineBlock();
	}
	else
	{
		// Skip pathfinding. Retrieve blank result object.
		compiledObject.pathData = pathObjects.defineBlank();
	}
	
	
	return compiledObject;
}





module.exports =
{
	retrieveData: retrievePrecompiledData
};