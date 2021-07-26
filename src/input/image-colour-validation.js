const ora = require("ora");
const configHelp = require("./image-components/config-help");
const hexColour = require("./arguments/image-options/hex-colour");
const imageNumbers = require("./arguments/image-options/image-numbers");
const mathTasks = require("../common/math-tasks");


// Prepares target image colours and validates difference.
function performColourConversion(imagePropertiesObject, colourConversionCallback)
{
	var colourSpinner = ora("Preparing Target Colours").start();
	
	coordinateColours(imagePropertiesObject, function(colError, colRes)
	{
		if (colError !== null)
		{
			colourSpinner.fail("Error Preparing Target Colours");
			return colourConversionCallback(colError, null);
		}
		else
		{
			colourSpinner.succeed("Target Colours Prepared");
			return colourConversionCallback(null, colRes);
		}
	});
	
}


function coordinateColours(imageProps, tgtColourCallback)
{
	var colourResultObject = configHelp.defineColourResult();
	var hexDifferent = hexColour.validateDifferent(imageProps.wallColour, imageProps.floorColour, colourResultObject);
	var projectedDifference = -1;
	var differenceValid = false;
	
	if (hexDifferent === true)
	{
		// Converts hex colours to RGB.
		colourResultObject.wallRGB = mathTasks.calculateRgbFromHex(imageProps.wallColour);
		colourResultObject.floorRGB = mathTasks.calculateRgbFromHex(imageProps.floorColour);
		
		// Colour difference percentage must be greater than allowed tolerance.
		projectedDifference = mathTasks.calculateColourDifference(colourResultObject.wallRGB, colourResultObject.floorRGB);
		differenceValid = imageNumbers.validateColourDifference(imageProps.tolerancePercent, projectedDifference, colourResultObject);
	}
	
	if (differenceValid === true)
	{
		colourResultObject.successful = true;
	}
	
	
	if (colourResultObject.successful === true)
	{
		return tgtColourCallback(null, colourResultObject);
	}
	else
	{
		return tgtColourCallback(new Error(colourResultObject.errorMessage), null);
	}	
}


module.exports =
{
	convertColours: performColourConversion
};