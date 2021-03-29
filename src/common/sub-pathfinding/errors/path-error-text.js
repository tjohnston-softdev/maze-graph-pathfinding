// Writes error text related to pathfinding.


// Target node missing.
function writeTargetNodeMissingText(vDesc)
{
	var fullText = vDesc + " node is missing";
	return fullText;
}


// No possible routes - Single.
function writeImpossibleRouteText()
{
	var fullText = "There is no possible route between the start and end nodes.";
	return fullText;
}


// No possible routes - Multiple.
function writeImpossibleMultipleRoutesText()
{
	var fullText = "There are no possible routes between the start and end nodes.";
	return fullText;
}


// 'all-possible' maximum nodes.
function writeAllPossibleMaxNodesText(vLimit)
{
	var fullText = "";
	
	fullText += "A graph can only have up to ";
	fullText += vLimit;
	fullText += " nodes when calculating all possible paths.";
	
	return fullText;
}



module.exports =
{
	writeTargetNodeMissing: writeTargetNodeMissingText,
	writeImpossibleRoute: writeImpossibleRouteText,
	writeImpossibleMultipleRoutes: writeImpossibleMultipleRoutesText,
	writeAllPossibleMaxNodes: writeAllPossibleMaxNodesText
};