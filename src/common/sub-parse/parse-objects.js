// Object definitions used when parsing input into graphs.


// Graph object.
function initializeParseResultsObject(fixedLayout)
{
	var intlRes = {};
	
	intlRes["nodeList"] = [];
	intlRes["edgeList"] = [];
	intlRes["startNodeIndex"] = -1;
	intlRes["endNodeIndex"] = -1;
	intlRes["absolutePositions"] = fixedLayout;
	
	return intlRes;
}


// Tile Grid.
function initializeGridObject()
{
	var intlRes = {};
	intlRes["gridMatrix"] = [];
	return intlRes;
	
}


// Line validation outcome.
function defineLineOutcomeObject()
{
	var defineRes = {valid: false, messageText: "UNDEFINED"};
	return defineRes;
}

// Image pixel row validation outcome.
function definePixelRowOutcomeObject()
{
	var defineRes = {tileList: [], successful: false, messageText: ""};
	return defineRes;
}


// Node search result.
function defineNodeSearchObject()
{
	var defineRes = {matchIndex: -1, overflow: false};
	return defineRes;
}



module.exports =
{
	initializeResultObject: initializeParseResultsObject,
	initializeGrid: initializeGridObject,
	defineLineOutcome: defineLineOutcomeObject,
	definePixelRowOutcome: definePixelRowOutcomeObject,
	defineNodeSearch: defineNodeSearchObject
};