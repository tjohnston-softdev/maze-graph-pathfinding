// These functions write error text for general parsing errors. Mainly used for checking graph integrity.

function writeMaximumObjectText(vType, vLimit)
{
	var fullText = "";
	
	fullText += "Graph can only contain ";
	fullText += vLimit;
	fullText += " ";
	fullText += vType;
	fullText += " or less.";
	
	return fullText;
}



function writeMaximumDimensionText(vDesc, vLimit)
{
	var fullText = "";
	
	fullText += "Grid cannot contain more than ";
	fullText += vLimit;
	fullText += " ";
	fullText += vDesc;
	fullText += ".";
	
	return fullText;
}


function writeMissingDimensionText(vDesc)
{
	var fullText = "";
	
	fullText += "Grid does not have any ";
	fullText += vDesc;
	fullText += ".";
	
	return fullText;
}




function writeEmptyTypeText(vType)
{
	var fullText = "";
	
	fullText += "There are no ";
	fullText += vType;
	fullText += " objects in this graph.";
	
	return fullText;
}


function writeTargetPointMissingText(vDesc)
{
	var fullText = "";
	
	fullText += vDesc;
	fullText += " point has not been defined.";
	
	return fullText;
}




module.exports =
{
	writeMaximumObject: writeMaximumObjectText,
	writeMaximumDimension: writeMaximumDimensionText,
	writeMissingDimension: writeMissingDimensionText,
	writeEmptyType: writeEmptyTypeText,
	writeTargetPointMissing: writeTargetPointMissingText
};