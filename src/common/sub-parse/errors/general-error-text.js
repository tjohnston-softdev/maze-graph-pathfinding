// These functions write error text for general parsing errors. Mainly used for checking graph integrity.


// Maximum objects reached.
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



// Maximum grid size.
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


// Missing grid dimension.
function writeMissingDimensionText(vDesc)
{
	var fullText = "";
	
	fullText += "Grid does not have any ";
	fullText += vDesc;
	fullText += ".";
	
	return fullText;
}



// Object types missing.
function writeEmptyTypeText(vType)
{
	var fullText = "";
	
	fullText += "There are no ";
	fullText += vType;
	fullText += " objects in this graph.";
	
	return fullText;
}


// Undefined target point.
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