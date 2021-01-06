const ora = require("ora");
const configHelp = require("./image-components/config-help");
const hexColour = require("./arguments/image-options/hex-colour");
const imageNumbers = require("./arguments/image-options/image-numbers");


// Validates image parsing options.
function prepareImageOptionArguments(fullInputObject, optionalArgs, imageOptionCallback)
{
	var preperationSpinner = ora("Validating Image Options").start();
	
	coordinateOptionValidation(fullInputObject, optionalArgs, function(argError, argRes)
	{
		if (argError !== null)
		{
			preperationSpinner.fail("Invalid Image Options");
			return imageOptionCallback(argError, null);
		}
		else
		{
			preperationSpinner.succeed("Image Options Valid");
			return imageOptionCallback(null, true);
		}
	});
	
}



function coordinateOptionValidation(fullInput, optArgs, imgOptCallback)
{
	var validationOutcomeObject = configHelp.defineValidationResult();
	
	var givenWallColour = null;
	var givenFloorColour = null;
	var givenTolerance = null;
	var givenTileSize = null;
	var givenStartX = null;
	var givenStartY = null;
	
	var wallColourValid = false;
	var floorColourValid = false;
	var toleranceValid = false;
	var tileSizeValid = false;
	var xValid = false;
	var yValid = false;
	
	
	// Entered values take precedence over loaded config file.
	configHelp.overrideInternalProperties(fullInput.imageItems, optArgs);
	
	// Reads image option properties.
	givenWallColour = fullInput.imageItems.wallColour;
	givenFloorColour = fullInput.imageItems.floorColour;
	givenTolerance = fullInput.imageItems.tolerancePercent;
	givenTileSize = fullInput.imageItems.tileSize;
	givenStartX = fullInput.imageItems.originX;
	givenStartY = fullInput.imageItems.originY;
	
	
	// Begin option validation:
	wallColourValid = hexColour.validateHexColour(givenWallColour, "wallColour", "Wall Colour", fullInput, validationOutcomeObject);
	
	
	if (wallColourValid === true)
	{
		floorColourValid = hexColour.validateHexColour(givenFloorColour, "floorColour", "Floor Colour", fullInput, validationOutcomeObject);
	}
	
	if (floorColourValid === true)
	{
		toleranceValid = imageNumbers.validateTolerancePercentage(givenTolerance, fullInput, validationOutcomeObject);
	}
	
	if (toleranceValid === true)
	{
		tileSizeValid = imageNumbers.validateTileSize(givenTileSize, fullInput, validationOutcomeObject);
	}
	
	if (tileSizeValid === true)
	{
		xValid = imageNumbers.validateOriginCoordinatesNumber(givenStartX, "originX", "Start Coordinates X", fullInput, validationOutcomeObject);
	}
	
	if (xValid === true)
	{
		yValid = imageNumbers.validateOriginCoordinatesNumber(givenStartY, "originY", "Start Coordinates Y", fullInput, validationOutcomeObject);
	}
	
	if (yValid === true)
	{
		validationOutcomeObject.overallValid = true;
	}
	
	
	
	
	if (validationOutcomeObject.overallValid === true)
	{
		return imgOptCallback(null, true);
	}
	else
	{
		return imgOptCallback(new Error(validationOutcomeObject.errorMessage), null);
	}
	
}




module.exports =
{
	prepareOptionArguments: prepareImageOptionArguments
};