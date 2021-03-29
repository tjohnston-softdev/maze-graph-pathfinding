// Used to parse numbers.

const maxStringLength = 50;



function convertInputValueToNumber(origVal, sType, nType)
{
	var conversionResult = NaN;
	
	if (sType === true)
	{
		// Original value is a string - Cast to number.
		conversionResult = castString(origVal);
	}
	else if (nType === true)
	{
		// Original value is a number - Use as-is.
		conversionResult = origVal;
	}
	else
	{
		// Invalid
		conversionResult = NaN;
	}
	
	return conversionResult;
}


function castString(oString)
{
	var castRes = NaN;
	
	if (oString.length > 0 && oString.length <= maxStringLength)
	{
		// String safe length - Cast to number.
		castRes = Number(oString);
	}
	
	return castRes;
}




module.exports =
{
	convertInputValue: convertInputValueToNumber
};