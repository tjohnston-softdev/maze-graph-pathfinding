// Used to parse numbers entered through the command line.

const maxStringLength = 50;



function convertInputValueToNumber(origVal, sType, nType)
{
	var conversionResult = NaN;
	
	if (sType === true)
	{
		// If original value is a string, cast to number.
		conversionResult = castString(origVal);
	}
	else if (nType === true)
	{
		// If original value is a number, use it as-is.
		conversionResult = origVal;
	}
	else
	{
		// Otherwise, invalid.
		conversionResult = NaN;
	}
	
	return conversionResult;
}


function castString(oString)
{
	var castRes = NaN;
	
	// If the string is a safe length, cast to number.
	if (oString.length > 0 && oString.length <= maxStringLength)
	{
		castRes = Number(oString);
	}
	
	return castRes;
}




module.exports =
{
	convertInputValue: convertInputValueToNumber
};