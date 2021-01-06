// Writes error text related to pathfinding.

function writeTargetNodeMissingText(vDesc)
{
	var fullText = vDesc + " node is missing";
	return fullText;
}


function writeImpossibleRouteText()
{
	var fullText = "There is no possible route between the start and end nodes.";
	return fullText;
}


function writeImpossibleMultipleRoutesText()
{
	var fullText = "There are no possible routes between the start and end nodes.";
	return fullText;
}


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