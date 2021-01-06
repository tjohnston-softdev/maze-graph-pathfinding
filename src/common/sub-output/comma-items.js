const comChar = ",";

// These functions are used to prepare comma-separated strings while outputting raw graph data.


// Node ID element in route sequence array.
function writeSequenceNodeNumberString(prepNumber, loopInd, lastInd)
{
	var writtenNumber = String(prepNumber);
	
	if (loopInd >= 0 && loopInd < lastInd)
	{
		writtenNumber = writtenNumber + comChar;
	}
	
	return writtenNumber;
}


// Path object closing bracket. (multiple paths)
function writePathObjectCloseString(loopInd, lastInd)
{
	var writtenClose = "}";
	
	if (loopInd >= 0 && loopInd < lastInd)
	{
		writtenClose = writtenClose + comChar;
	}
	
	return writtenClose;
}



module.exports =
{
	com: comChar,
	writeSequenceNodeNumber: writeSequenceNodeNumberString,
	writePathObjectClose: writePathObjectCloseString
};