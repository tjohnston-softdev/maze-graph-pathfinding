// Object definitions used when parsing input into graphs.


// Graph object.
function initializeParseResultsObject()
{
	var intlRes = {};
	
	intlRes["nodeList"] = [];
	intlRes["edgeList"] = [];
	intlRes["startNodeIndex"] = -1;
	intlRes["endNodeIndex"] = -1;
	
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
	var defineRes = {};
	
	defineRes["valid"] = false;
	defineRes["messageText"] = "UNDEFINED";
	
	return defineRes;
}

// Image pixel row validation outcome.
function definePixelRowOutcomeObject()
{
	var defineRes = {};
	
	defineRes["tileList"] = [];
	defineRes["successful"] = false;
	defineRes["messageText"] = "";
	
	return defineRes;
}


// Node search result.
function defineNodeSearchObject()
{
	var defineRes = {"matchIndex": -1, "overflow": false};
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