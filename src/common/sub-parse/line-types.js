// This file contains functions for classifying text input lines..


// Line begins with number Regex
const numberBegin = /^\d/;


// Start field (Absolute, Relative)
function checkStartLineType(lineTxt)
{
	var checkRes = lineTxt.startsWith("start");
	return checkRes;
}


// End field (Absolute, Relative)
function checkEndLineType(lineTxt)
{
	var checkRes = lineTxt.startsWith("end");
	return checkRes;
}


// Line starts with number.
function checkNumberLineType(lineTxt)
{
	var matchFlag = lineTxt.search(numberBegin);
	var checkRes = false;
	
	if (matchFlag === 0)
	{
		checkRes = true;
	}
	
	return checkRes;
}


// Node header (Relative)
function checkNodeHeaderType(lineTxt)
{
	var checkRes = lineTxt.startsWith("node");
	return checkRes;
}


// Edge header (Relative)
function checkEdgeHeaderType(lineTxt)
{
	var checkRes = lineTxt.startsWith("edge");
	return checkRes;
}




module.exports =
{
	checkStart: checkStartLineType,
	checkEnd: checkEndLineType,
	checkNumber: checkNumberLineType,
	checkNodeHeader: checkNodeHeaderType,
	checkEdgeHeader: checkEdgeHeaderType
};