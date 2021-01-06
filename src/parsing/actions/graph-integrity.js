const parseHelpTasks = require("../../common/sub-parse/parse-help-tasks");
const parseObjects = require("../../common/sub-parse/parse-objects");
const valueLimits = require("../../common/value-limits");
const valuePrep = require("../../common/value-prep");


/*
	Validates the integrity of a parsed graph object.
	This means:
		* Valid object.
		* At least one Node and Edge.
		* Both start and end nodes have been defined.
		* Start and end nodes cannot be the same.
*/



// Main function.
function verifyParseObjectIntegrity(fullParseObject, integrityCallback)
{
	var outcomeResultObject = parseObjects.defineLineOutcome();
	var validBaseType = validateBaseObjectType(fullParseObject, outcomeResultObject);
	
	var nodeCountValid = false;
	var edgeCountValid = false;
	
	var startDefinitionValid = false;
	var endDefinitionValid = false;
	var startEndDifferent = false;
	
	
	if (validBaseType === true)
	{
		// Validates number of nodes.
		nodeCountValid = validateArrayProperty(fullParseObject.nodeList, "Node", valueLimits.maxNodeCount, outcomeResultObject);
	}
	
	if (nodeCountValid === true)
	{
		// Validates number of edges.
		edgeCountValid = validateArrayProperty(fullParseObject.edgeList, "Edge", valueLimits.maxEdgeCount, outcomeResultObject);
	}
	
	if (edgeCountValid === true)
	{
		// Checks start node definition.
		startDefinitionValid = parseHelpTasks.checkTargetDefined(fullParseObject.startNodeIndex, fullParseObject.nodeList.length, "Start", outcomeResultObject);
	}
	
	if (startDefinitionValid === true)
	{
		// Checks end node definition.
		endDefinitionValid = parseHelpTasks.checkTargetDefined(fullParseObject.endNodeIndex, fullParseObject.nodeList.length, "End", outcomeResultObject);
	}
	
	if (endDefinitionValid === true)
	{
		// Checks start and end nodes different.
		startEndDifferent = parseHelpTasks.checkStartEndDifferent(fullParseObject.startNodeIndex, fullParseObject.endNodeIndex, outcomeResultObject);
	}
	
	if (startEndDifferent === true)
	{
		// Graph integrity valid.
		outcomeResultObject.valid = true;
	}
	
	
	
	
	if (outcomeResultObject.valid === true)
	{
		return integrityCallback(null, true);
	}
	else
	{
		return integrityCallback(new Error(outcomeResultObject.messageText), null);
	}
	
}



// Checks whether the parsed graph is a valid object.
function validateBaseObjectType(pObject, resultObject)
{
	var correctType = valuePrep.checkObjectType(pObject);
	var validationResult = false;
	
	if (correctType === true)
	{
		validationResult = true;
	}
	else
	{
		validationResult = false;
		resultObject.messageText = "Parsed Graph is not a valid object";
	}
	
	
	return validationResult;
}


// Checks whether the graph has a valid number of nodes or edges.
function validateArrayProperty(arrObject, arrDesc, arrLimit, resultObject)
{
	var itemCount = valuePrep.getElementCount(arrObject);
	var validationResult = parseHelpTasks.checkObjectTypeCount(itemCount, arrLimit, arrDesc, resultObject);
	return validationResult;
}






module.exports =
{
	verifyParseIntegrity: verifyParseObjectIntegrity
};