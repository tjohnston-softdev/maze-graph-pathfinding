const lineByLine = require("line-by-line");
const parseHelpTasks = require("../../../common/sub-parse/parse-help-tasks");
const parseObjects = require("../../../common/sub-parse/parse-objects");
const lineTypes = require("../../../common/sub-parse/line-types");
const absCoordinates = require("../../../common/sub-parse/abs-coordinates");
const streamExceptions = require("../../../common/sub-files/stream-exceptions");
const valueLimits = require("../../../common/value-limits");
const valuePrep = require("../../../common/value-prep");
const graphObjects = require("../../../common/sub-graph/graph-objects");
const findEdges = require("../../../common/sub-graph/find-edges");
const mathTasks = require("../../../common/math-tasks");


// Parses absolute text input file into a graph object.


// Main function.
function parseAbsoluteTextFile(tgtInputPath, ignoreErr, absCallback)
{
	var lineCountNumber = 0;														// Current line number.
	var retrievedDataObject = parseObjects.initializeResultObject();				// Parsed graph object.
	var canContinue = true;															// Parse successful.
	var flaggedErrorMessage = "";													// Error text.
	var lineStreamObject = new lineByLine(tgtInputPath);							// Opens input file and reads by line.
	
	
	// File read error.
	lineStreamObject.on('error', function(rError)
	{
		canContinue = false;
		flaggedErrorMessage = streamExceptions.getFileRead("Absolute Input", rError.code);
		lineStreamObject.close();
	});
	
	
	// Read text line.
	lineStreamObject.on('line', function (currentLineText)
	{
		lineStreamObject.pause();
		lineCountNumber = lineCountNumber + 1;
		var lineObject = readCurrentLine(currentLineText, lineCountNumber, retrievedDataObject);
		
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
			return absCallback(null, retrievedDataObject);
		}
		else
		{
			return absCallback(new Error(flaggedErrorMessage), null);
		}
	});
	
	
	
}


// Reads current line and interprets for graph definition.
function readCurrentLine(origLineText, lineNumber, retDataObj)
{
	var outcomeResultObject = parseObjects.defineLineOutcome();
	var safeLength = parseHelpTasks.checkSafeLength(origLineText.length, valueLimits.maxTextLineLength, lineNumber, outcomeResultObject);
	
	var prepLineText = "";
	var startLineType = false;
	var endLineType = false;
	var edgeLineType = false;
	var canUse = false;
	
	var readSuccessful = false;
	
	
	if (safeLength === true)
	{
		// Removes spaces and casing from line text.
		prepLineText = valuePrep.sanitizeString(origLineText);
		
		// Decides how to parse text line based on contents.
		startLineType = lineTypes.checkStart(prepLineText);
		endLineType = lineTypes.checkEnd(prepLineText);
		edgeLineType = lineTypes.checkNumber(prepLineText);
		canUse = true;
	}
	
	
	if (canUse === true && startLineType === true)
	{
		// Start point coordinates.
		readSuccessful = handleTargetPoint(prepLineText, lineNumber, retDataObj, "startNodeIndex", "Start Point", "start: row,col", outcomeResultObject);
	}
	else if (canUse === true && endLineType === true)
	{
		// End point coordinates.
		readSuccessful = handleTargetPoint(prepLineText, lineNumber, retDataObj, "endNodeIndex", "End Point", "end: row,col", outcomeResultObject);
	}
	else if (canUse === true && edgeLineType === true)
	{
		// Edge between coordinates.
		readSuccessful = handleEdge(prepLineText, lineNumber, retDataObj, outcomeResultObject);
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
	var enteredValue = absCoordinates.readEnteredCoordinates(fieldValueSplit, 1);
	var retrievedEntry = convertCoordinatesToNode(enteredValue, retData);
	var entryValid = parseHelpTasks.checkNodeRetrieved(retrievedEntry, retData.nodeList.length, valueLimits.maxNodeCount, propDesc, entryFormat, lineNum, oResObj);
	
	var targetResult = false;
	
	
	if (entryValid === true)
	{
		// Assigns given node as the start or end point.
		retData[propName] = retrievedEntry.matchIndex;
		targetResult = true;
	}
	
	return targetResult;
}


// Parses edge lines.
function handleEdge(edgeTxt, lineNum, retData, oResObj)
{
	var dashSplit = [];
	var originValue = "";
	var destinationValue = "";
	var originEntry = {};
	var destinationEntry = {};
	
	var originValid = false;
	var destinationValid = false;
	var matchValuesDifferent = false;
	
	var originNodeObject = {};
	var destinationNodeObject = {};
	var keyNumbersDifferent = false;
	
	var projectedDistance = -1;
	var distanceValid = false;
	var connectionAvailable = false;
	var canAdd = false;
	
	var newID = -1;
	var finalEdgeObject = {};
	var edgeResult = false;
	
	
	// Reads coordinates text.
	dashSplit = edgeTxt.split("-");
	originValue = absCoordinates.readEnteredCoordinates(dashSplit, 0);
	destinationValue = absCoordinates.readEnteredCoordinates(dashSplit, 1);
	
	// Parses edge coordinates into graph nodes.
	originEntry = convertCoordinatesToNode(originValue, retData);
	destinationEntry = convertCoordinatesToNode(destinationValue, retData);
	
	
	// Checks origin node retrieved successfully.
	originValid = callEdgeEntryValidation(originEntry, retData.nodeList.length, lineNum, oResObj);
	
	
	
	if (originValid === true)
	{
		// Checks destination node retrieved successfully.
		destinationValid = callEdgeEntryValidation(destinationEntry, retData.nodeList.length, lineNum, oResObj);
	}
	
	if (destinationValid === true)
	{
		// Checks whether node match flags are different.
		matchValuesDifferent = parseHelpTasks.checkAbsoluteNodeKeysDifferent(originEntry.matchIndex, destinationEntry.matchIndex, lineNum, oResObj);
	}
	
	if (matchValuesDifferent === true)
	{
		// Checks whether node IDs are different.
		originNodeObject = retData.nodeList[originEntry.matchIndex];
		destinationNodeObject = retData.nodeList[destinationEntry.matchIndex];
		keyNumbersDifferent = parseHelpTasks.checkAbsoluteNodeKeysDifferent(originNodeObject.nodeID, destinationNodeObject.nodeID, lineNum, oResObj);
	}
	
	
	if (keyNumbersDifferent === true)
	{
		// Calculates and validates edge distance.
		projectedDistance = mathTasks.calculateNodeDistance(originNodeObject, destinationNodeObject);
		distanceValid = parseHelpTasks.checkAbsoluteDistanceValid(projectedDistance, lineNum, oResObj);
	}
	
	if (distanceValid === true)
	{
		// Checks whether connection is available and edge can be added.
		connectionAvailable = findEdges.checkEdgeAvailable(originNodeObject.nodeID, destinationNodeObject.nodeID, retData.edgeList);
		canAdd = parseHelpTasks.checkEdgePossible(connectionAvailable, retData.edgeList.length, lineNum, oResObj);
	}
	
	
	if (canAdd === true)
	{
		// Adds new edge to graph.
		newID = retData.edgeList.length + 1;
		finalEdgeObject = graphObjects.defineEdge(newID, originNodeObject.nodeID, destinationNodeObject.nodeID, projectedDistance);
		retData.edgeList.push(finalEdgeObject);
		
		edgeResult = true;
	}
	
	
	
	return edgeResult;
}


// Parses coordinates text and uses them to add or retrieve a graph node.
function convertCoordinatesToNode(baseText, rData)
{
	var preparedCoordinatesObject = absCoordinates.parseCoordinates(baseText);
	var coordinateNumbersValid = absCoordinates.checkCoordinatesValid(preparedCoordinatesObject);
	var convertedObject = {};
	
	// If coordinates parsed successfully, add or retrieve node with these coordinates.
	if (coordinateNumbersValid === true)
	{
		convertedObject = addNodeByCoordinates(preparedCoordinatesObject, rData.nodeList);
	}
	
	
	return convertedObject;
}


// Checks whether a node was successfully added or retrieved using edge coordinates.
function callEdgeEntryValidation(sObject, rNodeCount, nLine, oRes)
{
	var entryRetrieved = parseHelpTasks.checkNodeRetrieved(sObject, rNodeCount, valueLimits.maxNodeCount, "Edge", "y1,x1 - y2,x2", nLine, oRes);
	return entryRetrieved;
}





// Adds or retrieves a node from a given set of coordinates.
function addNodeByCoordinates(coordObject, existingNodesList)
{
	var prepRow = coordObject.retrievedRow * graphObjects.scaleFactor;
	var prepCol = coordObject.retrievedCol * graphObjects.scaleFactor;
	
	var matchFound = graphObjects.checkCoordinatesExist(prepRow, prepCol, existingNodesList);
	var newID = -1;
	var addedObject = {};
	
	var searchResult = parseObjects.defineNodeSearch();
	
	
	if (matchFound >= 0 && matchFound < existingNodesList.length)
	{
		// Node already exists. Retrieve successfully.
		searchResult.matchIndex = matchFound;
		searchResult.overflow = false;
	}
	else if (existingNodesList.length >= 0 && existingNodesList.length < valueLimits.maxNodeCount)
	{
		// Node does not exist. Add to graph.
		newID = existingNodesList.length + 1;
		addedObject = graphObjects.defineNode(newID, prepRow, prepCol, undefined);
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
	parseAbsolute: parseAbsoluteTextFile
};