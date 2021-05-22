// Math-related functions.

const hexCharacterTable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];


// Refer to 'calculateDifferenceBetweenColours'
const colourDistanceMaximum = 195075;
const colourPercentageRoot = Math.sqrt(colourDistanceMaximum);


// Calculates the straight-line distance between two node objects. (Euclidean distance)
function calculateDistanceBetweenNodes(nodeA, nodeB)
{
	var differenceX = nodeB.colNumber - nodeA.colNumber;
	var differenceY = nodeB.rowNumber - nodeA.rowNumber;
	
	var squareX = Math.pow(differenceX, 2);
	var squareY = Math.pow(differenceY, 2);
	
	var squareTotal = squareX + squareY;
	var squareRoot = Math.sqrt(squareTotal);
	var finalDistance = Math.round(squareRoot);
	
	return finalDistance;
}


// Calculates the approx. travel cost between two nodes. (Manhattan distance)
function calculateHeuristicBetweenNodes(nodeA, nodeB)
{
	var differenceX = Math.abs(nodeA.colNumber - nodeB.colNumber);
	var differenceY = Math.abs(nodeA.rowNumber - nodeB.rowNumber);
	
	var finalHeuristic = differenceX + differenceY;
	
	return finalHeuristic;
}


// Converts a hex colour string into RGB (eg. "ba42d1" = 186,66,209)
function calculateRgbValueFromHex(hexString)
{
	var redString = hexString.substr(0, 2);
	var greenString = hexString.substr(2, 2);
	var blueString = hexString.substr(4, 2);
	
	var finalRGB = defineColourObject();
	
	
	finalRGB.r = convertHexToDecimal(redString);
	finalRGB.g = convertHexToDecimal(greenString);
	finalRGB.b = convertHexToDecimal(blueString);
	
	return finalRGB;
}


// Calculates the percentage distance between two RGB colours.
function calculateDifferenceBetweenColours(colourA, colourB)
{
	var redDifference = colourB.r - colourA.r;
	var greenDifference = colourB.g - colourA.g;
	var blueDifference = colourB.b - colourA.b;
	
	var redPower = Math.pow(redDifference, 2);
	var greenPower = Math.pow(greenDifference, 2);
	var bluePower = Math.pow(blueDifference, 2);
	
	var distanceTotal = redPower + greenPower + bluePower;
	var distanceRoot = Math.sqrt(distanceTotal);
	
	var finalPercentage = (distanceRoot / colourPercentageRoot) * 100;
	
	return finalPercentage;
}



// Converts a hex value string to a decimal number.
function convertHexToDecimal(hexVal)
{	
	// Reads individual hex characters.
	var firstChar = hexVal.charAt(0);
	var secondChar = hexVal.charAt(1);
	
	// Checks whether hex characters are valid.
	var firstValid = hexCharacterTable.includes(firstChar);
	var secondValid = hexCharacterTable.includes(secondChar);
	
	var firstColumn = -1;
	var secondColumn = -1;
	var columnMultiply = -1;
	
	var decimalRes = -1;
	
	if (firstValid === true && secondValid === true)
	{
		// Converts hex characters to decimal numbers.
		firstColumn = hexCharacterTable.indexOf(firstChar);
		secondColumn = hexCharacterTable.indexOf(secondChar);
		
		// Multiplies the first number by 16 before adding the second number.
		columnMultiply = firstColumn * hexCharacterTable.length;
		decimalRes = columnMultiply + secondColumn;
	}
	
	
	return decimalRes;
}



// RGB colour object definition.
function defineColourObject()
{
	var defineRes = {};
	
	defineRes["r"] = -1;
	defineRes["g"] = -1;
	defineRes["b"] = -1;
	
	return defineRes;
}




module.exports =
{
	calculateNodeDistance: calculateDistanceBetweenNodes,
	calculateNodeHeuristic: calculateHeuristicBetweenNodes,
	calculateRgbFromHex: calculateRgbValueFromHex,
	calculateColourDifference: calculateDifferenceBetweenColours
};




/*
	REFERENCES:
		(Title)							(URL)																					(Date Retrieved)
		Hexadecimal table				https://kb.iu.edu/d/afdl																2020-08-22
		Calculate Euclidean distance	https://www.calculatorsoup.com/calculators/geometry-plane/distance-two-points.php		2020-07-06
		Manhattan distance				https://www.geeksforgeeks.org/a-search-algorithm/										2020-07-17
		Hex to RGB						https://www.rapidtables.com/convert/color/hex-to-rgb.html								2020-08-22
		Colour Distance Formula Ex 1	https://stackoverflow.com/a/9018153														2020-08-23
		Colour Distance Formula Ex 2	https://en.wikipedia.org/wiki/Color_difference#sRGB										2020-08-23
*/