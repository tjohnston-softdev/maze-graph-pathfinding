const lineByLine = require("line-by-line");
const parseHelpTasks = require("../../../common/sub-parse/parse-help-tasks");
const relativeHelpTasks = require("../../../common/sub-parse/relative-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const lineTypes = require("../../../common/sub-parse/line-types");
const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");
const graphObjects = require("../../../common/sub-graph/graph-objects");
const findNodes = require("../../../common/sub-graph/find-nodes");
const findEdges = require("../../../common/sub-graph/find-edges");

const numberReadModes = {"NODE": 1, "EDGE": 2};
const nodeDesc = "Node Definition";
const nodeFormat = "nodeID, heuristic";
const edgeDesc = "Edge Definition";
const edgeFormat = "originNode, destinationNode, distance";


// Parses relative text input file into a graph object.


function parseRelativeTextFile(tgtInputPath, ignoreErr, relativeCallback)
{
	var lineCountNumber = 0;													// Current line number.
	var retrievedDataObject = parseObjects.initializeResultObject();			// Graph object.
	var activeNumberMode = {"flagValue": -1};									// Number read mode.
	var canContinue = true;														// Parse successful.
	var flaggedErrorMessage = "";												// Error text.
	var lineStreamObject = new lineByLine(tgtInputPath);						// Opens input file and reads by line.
	
	
	// File read error.
	lineStreamObject.on('error', function (rError)
	{
		canContinue = false;
		flaggedErrorMessage = streamExceptions.getFileRead("Relative Input", rError.code);
		lineStreamObject.close();
	});
	
	
	// Read text line.
	lineStreamObject.on('line', function (currentLineText)
	{
		lineStreamObject.pause();
		lineCountNumber = lineCountNumber + 1;
		var lineObject = readCurrentLine(currentLineText, lineCountNumber, activeNumberMode, retrievedDataObject);
		
		if (lineObject.valid === true || ignoreErr === true)
		{
			// Continue reading lines.
			lineStreamObject.resume();
		}
		else if (canContinue === true)
		{
			// Stop reading lines.
			canContinue = false;
			flaggedErrorMessage = lineObject.messageText;
			lineStreamObject.close();
			lineStreamObject.resume();
		}
		else
		{
			// File closing
			canContinue = false;
			lineStreamObject.resume();
		}
		
	});
	
	
	// File closed.
	lineStreamObject.on('end', function()
	{
		if (canContinue === true)
		{
			return relativeCallback(null, retrievedDataObject);
		}
		else
		{
			return relativeCallback(new Error(flaggedErrorMessage), null);
		}
	});
	
	
	
}


// Reads current line and interprets for graph definition.
function readCurrentLine(origLineText, lineNumber, numMode, retDataObject)
{
	var outcomeResultObject = parseObjects.defineLineOutcome();
	var safeLength = parseHelpTasks.checkSafeLength(origLineText.length, valueLimits.maxTextLineLength, lineNumber, outcomeResultObject)
	
	var prepLineText = "";
	var startLineType = false;
	var endLineType = false;
	var nodeHeaderLineType = false;
	var edgeHeaderLineType = false;
	var numberLineType = false;
	var canUse = false;
	
	var readSuccessful = false;
	
	
	if (safeLength === true)
	{
		// Removes spaces and casing from line text.
		prepLineText = valuePrep.sanitizeString(origLineText);
		
		// Decides how to parse text line based on contents.
		startLineType = lineTypes.checkStart(prepLineText);
		endLineType = lineTypes.checkEnd(prepLineText);
		nodeHeaderLineType = lineTypes.checkNodeHeader(prepLineText);
		edgeHeaderLineType = lineTypes.checkEdgeHeader(prepLineText);
		numberLineType = lineTypes.checkNumber(prepLineText);
		canUse = true;
	}
	
	
	if (canUse === true && startLineType === true)
	{
		// Start node number.
		readSuccessful = handleTargetPoint(prepLineText, lineNumber, retDataObject, "startNodeIndex", "Start Point", "start: nodeID", outcomeResultObject);
	}
	else if (canUse === true && endLineType === true)
	{
		// End node number.
		readSuccessful = handleTargetPoint(prepLineText, lineNumber, retDataObject, "endNodeIndex", "End Point", "end: nodeID", outcomeResultObject);
	}
	else if (canUse === true && nodeHeaderLineType === true)
	{
		// Start creating node objects.
		numMode.flagValue = numberReadModes.NODE;
		readSuccessful = true;
	}
	else if (canUse === true && edgeHeaderLineType === true)
	{
		// Start creating edge objects.
		numMode.flagValue = numberReadModes.EDGE;
		readSuccessful = true;
	}
	else if (canUse === true && numberLineType === true && numMode.flagValue === numberReadModes.NODE)
	{
		// Starts with number. Create new node.
		readSuccessful = handleNodeDefinition(prepLineText, lineNumber, retDataObject, outcomeResultObject);
	}
	else if (canUse === true && numberLineType === true && numMode.flagValue === numberReadModes.EDGE)
	{
		// Starts with number. Create new edge.
		readSuccessful = handleEdgeDefinition(prepLineText, lineNumber, retDataObject, outcomeResultObject);
	}
	else if (canUse === true)
	{
		// Unknown line type. Ignore safely.
		readSuccessful = true;
	}
	else
	{
		// Invalid line length. Error has already been flagged.
		readSuccessful = false;
	}
	
	outcomeResultObject.valid = readSuccessful;
	
	return outcomeResultObject;
}



// Parses start and end point lines.
function handleTargetPoint(pointTxt, lineNum, retData, propName, propDesc, entryFormat, oResObj)
{
	var fieldValueSplit = parseHelpTasks.splitColon(pointTxt);
	var formatValid = relativeHelpTasks.checkSplitLength(fieldValueSplit, 2, propDesc, entryFormat, lineNum, oResObj);
	
	var enteredID = -1;
	var idValid = false;
	
	var existFlag = -1;
	var flagValid = false;
	
	var targetResult = false;
	
	
	if (formatValid === true)
	{
		// Reads and validates entered ID.
		enteredID = relativeHelpTasks.readEnteredNumber(fieldValueSplit, 1);
		idValid = relativeHelpTasks.checkNodeID(enteredID, propDesc, lineNum, oResObj);
	}
	
	if (idValid === true)
	{
		// Checks whether target node exists.
		existFlag = findNodes.checkNodeNumberExists(enteredID, retData.nodeList);
		flagValid = relativeHelpTasks.checkNodeExistFlag(existFlag, retData.nodeList.length, propDesc, lineNum, oResObj);
	}
	
	if (flagValid === true)
	{
		// Assigns target node as the start or end point.
		retData[propName] = existFlag;
		targetResult = true;
	}
	
	return targetResult;
}


// Parses node definition line.
function handleNodeDefinition(nodeTxt, lineNum, retData, oResObj)
{
	var nodePropertySplit = relativeHelpTasks.splitComma(nodeTxt);
	var formatValid = relativeHelpTasks.checkSplitLength(nodePropertySplit, 1, nodeDesc, nodeFormat, lineNum, oResObj);
	
	var enteredID = -1;
	var enteredHeuristic = -1;
	var idValid = false;
	var heuristicValid = false;
	
	var retrievedNodeEntry = {};
	var entryValid = false;
	
	var nodeResult = false;
	
	// If field and value have been separated, read node definition properties.
	if (formatValid === true)
	{
		enteredID = relativeHelpTasks.readEnteredNumber(nodePropertySplit, 0);
		enteredHeuristic = relativeHelpTasks.readEnteredHeuristic(nodePropertySplit, 1);
		idValid = relativeHelpTasks.checkNodeID(enteredID, "Graph", lineNum, oResObj);
	}
	
	// If node ID is valid, Check heuristic.
	if (idValid === true)
	{
		heuristicValid = relativeHelpTasks.checkNodeHeuristic(enteredHeuristic, lineNum, oResObj);
	}
	
	
	// If heuristic is valid, add node to graph.
	if (heuristicValid === true)
	{
		retrievedNodeEntry = addNewNode(enteredID, enteredHeuristic, retData.nodeList);
		entryValid = parseHelpTasks.checkNodeRetrieved(retrievedNodeEntry, retData.nodeList.length, valueLimits.maxNodeCount, nodeDesc, nodeFormat, lineNum, oResObj);
	}
	
	// If the node was added to the graph, the line parse was successful.
	if (entryValid === true)
	{
		nodeResult = true;
	}
	
	
	return nodeResult;
}


// Parses edge definition line.
function handleEdgeDefinition(edgeTxt, lineNum, retData, oResObj)
{
	var edgePropertySplit = relativeHelpTasks.splitComma(edgeTxt);
	var formatValid = relativeHelpTasks.checkSplitLength(edgePropertySplit, 3, edgeDesc, edgeFormat, lineNum, oResObj);
	
	var enteredOriginID = -1;
	var enteredDestinationID = -1;
	var enteredDistanceNumber = -1;
	
	var originValid = false;
	var destinationValid = false;
	var distanceValid = false;
	
	var keyNumbersDifferent = false;
	var originExistsFlag = -1;
	var destinationExistsFlag = -1;
	var originFlagValid = false;
	var destinationFlagValid = false;
	
	var connectionAvailable = false;
	var canAdd = false;
	
	var newID = -1;
	var finalEdgeObject = {};
	var edgeResult = false;
	
	
	// If field and value have been separated:
	if (formatValid === true)
	{
		// Read input numbers.
		enteredOriginID = relativeHelpTasks.readEnteredNumber(edgePropertySplit, 0);
		enteredDestinationID = relativeHelpTasks.readEnteredNumber(edgePropertySplit, 1);
		enteredDistanceNumber = relativeHelpTasks.readEnteredNumber(edgePropertySplit, 2);
		
		// Validate origin node ID.
		originValid = relativeHelpTasks.checkNodeID(enteredOriginID, "Origin", lineNum, oResObj);
	}
	
	
	if (originValid === true)
	{
		// Validate destination node ID.
		destinationValid = relativeHelpTasks.checkNodeID(enteredDestinationID, "Destination", lineNum, oResObj);
	}
	
	
	if (destinationValid === true)
	{
		// Validate distance number.
		distanceValid = relativeHelpTasks.checkEdgeDistance(enteredDistanceNumber, lineNum, oResObj);
	}
	
	
	if (distanceValid === true)
	{
		// Check Node IDs different.
		keyNumbersDifferent = relativeHelpTasks.checkEdgeNumbersDifferent(enteredOriginID, enteredDestinationID, lineNum, oResObj);
	}
	
	if (keyNumbersDifferent === true)
	{
		// Check origin node exists.
		originExistsFlag = findNodes.checkNodeNumberExists(enteredOriginID, retData.nodeList);
		destinationExistsFlag = findNodes.checkNodeNumberExists(enteredDestinationID, retData.nodeList);
		
		originFlagValid = relativeHelpTasks.checkNodeExistFlag(originExistsFlag, retData.nodeList.length, "Origin", lineNum, oResObj);
	}
	
	if (originFlagValid === true)
	{
		// Check destination node exists.
		destinationFlagValid = relativeHelpTasks.checkNodeExistFlag(destinationExistsFlag, retData.nodeList.length, "Destination", lineNum, oResObj);
	}
	
	if (destinationFlagValid === true)
	{
		// Checks whether connection is available and edge can be added.
		connectionAvailable = findEdges.checkEdgeAvailable(enteredOriginID, enteredDestinationID, retData.edgeList);
		canAdd = parseHelpTasks.checkEdgePossible(connectionAvailable, retData.edgeList.length, valueLimits.maxEdgeCount, lineNum, oResObj);
	}
	
	if (canAdd === true)
	{
		// Add edge to graph.
		newID = retData.edgeList.length + 1;
		finalEdgeObject = graphObjects.defineEdge(newID, enteredOriginID, enteredDestinationID, enteredDistanceNumber);
		retData.edgeList.push(finalEdgeObject);
		
		edgeResult = true;
	}
	
	return edgeResult;
}




// Adds or retrieves node object from graph based on ID.
function addNewNode(assignedID, assignedHeuristic, existingNodesList)
{
	var matchFound = findNodes.checkNodeNumberExists(assignedID, existingNodesList);
	var addedObject = {};
	var searchResult = parseObjects.defineNodeSearch();
	
	if (matchFound >= 0 && matchFound < existingNodesList.length)
	{
		// Node ID already exists. Retrieve successfully.
		addedObject = existingNodesList[matchFound];
		addedObject.manualHeuristic = assignedHeuristic;
		
		searchResult.matchIndex = matchFound;
		searchResult.overflow = false;
	}
	else if (existingNodesList.length >= 0 && existingNodesList.length < valueLimits.maxNodeCount)
	{
		// Node ID does not exist. Create new node.
		addedObject = graphObjects.defineNode(assignedID, undefined, undefined, assignedHeuristic);
		existingNodesList.push(addedObject);
		
		searchResult.matchIndex = existingNodesList.length - 1;
		searchResult.overflow = false;
	}
	else if (existingNodesList.length >= valueLimits.maxNodeCount)
	{
		// Too many nodes.
		searchResult.matchIndex = -1;
		searchResult.overflow = true;
	}
	else
	{
		// Formatting error.
		searchResult.matchIndex = -1;
		searchResult.overflow = false;
	}
	
	return searchResult;
}




module.exports =
{
	parseRelative: parseRelativeTextFile
};