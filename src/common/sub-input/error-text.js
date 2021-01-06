// These functions are used to write error text for input validation.

function writeStringTooLongText(vDesc, vLimit)
{
	var writeRes = "";
	
	writeRes += vDesc;
	writeRes += " must not be longer than ";
	writeRes += vLimit;
	writeRes += " characters.";
	
	return writeRes;
}


function writePathPartReadText(vDesc)
{
	var writeRes = vDesc + " could not be read from entered path.";
	return writeRes;
}


function writeMissingText(vDesc)
{
	var writeRes = vDesc + " is missing.";
	return writeRes;
}


function writeSameText(vDesc)
{
	var writeRes = vDesc + " cannot be the same.";
	return writeRes;
}


function writePathResolveText(vDesc)
{
	var writeRes = vDesc + " could not be successfully resolved from entry.";
	return writeRes;
}


function writeHexColourText(vColour)
{
	var writeRes = vColour + " is not a valid hex colour value.";
	return writeRes;
}


function writePercentText(vDesc)
{
	var writeRes = vDesc + " must be a valid percentage value. (0 - 100)";
	return writeRes;
}

function writeLargerThanText(vDesc, vLimit)
{
	var writeRes = vDesc + " cannot be larger than " + vLimit;
	return writeRes;
}

function writeWholeText(vDesc)
{
	var writeRes = vDesc + " must be a valid whole number.";
	return writeRes;
}


function writePositiveWholeText(vDesc)
{
	var writeRes = vDesc + " must be a valid, positive, whole number.";
	return writeRes;
}


function writeCannotNegativeText(vDesc)
{
	var writeRes = vDesc + " cannot be a negative number.";
	return writeRes;
}




module.exports =
{
	writeStringTooLong: writeStringTooLongText,
	writePathPartRead: writePathPartReadText,
	writeMissing: writeMissingText,
	writeSame: writeSameText,
	writePathResolve: writePathResolveText,
	writeHexColour: writeHexColourText,
	writePercent: writePercentText,
	writeLargerThan: writeLargerThanText,
	writeWhole: writeWholeText,
	writePositiveWhole: writePositiveWholeText,
	writeCannotNegative: writeCannotNegativeText
};