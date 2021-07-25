const ora = require("ora");
const configHelp = require("./image-components/config-help");
const hexColour = require("./arguments/image-options/hex-colour");
const imageNumbers = require("./arguments/image-options/image-numbers");
const spinText = require("../common/sub-interface/spin-text/st-img-opts");


// Validates image parsing options.
function prepareImageOptionArguments(fullInputObject, optionalArgs, imageOptionCallback)
{
	var preperationSpinner = ora(spinText.imgOptProg).start();
	
	coordinateOptionValidation(fullInputObject, optionalArgs, function(argError, argRes)
	{
		if (argError !== null)
		{
			preperationSpinner.fail(spinText.imgOptFail);
			return imageOptionCallback(argError, null);
		}
		else
		{
			preperationSpinner.succeed(spinText.imgOptComp);
			return imageOptionCallback(null, true);
		}
	});
	
}


function prepareImageOutputArguments(fullInputObject, optionalArgs, imageOutputCallback)
{
	var preperationSpinner = ora(spinText.imgOptProg).start();
	
	coordinateOutputValidation(fullInputObject, optionalArgs, function(argError, argRes)
	{
		if (argError !== null)
		{
			preperationSpinner.fail(spinText.imgOptFail);
			return imageOutputCallback(argError, null);
		}
		else
		{
			preperationSpinner.succeed(spinText.imgOptComp);
			return imageOutputCallback(null, true);
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
	wallColourValid = handleWallValidation(givenWallColour, fullInput, validationOutcomeObject);
	
	
	if (wallColourValid === true)
	{
		floorColourValid = handleFloorValidation(givenFloorColour, fullInput, validationOutcomeObject);
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



function coordinateOutputValidation(fullInput, optArgs, argCallback)
{
	var validationOutcomeObject = configHelp.defineValidationResult();
	
	var givenWallColour = null;
	var givenFloorColour = null;
	var givenTileSize = null;
	
	var wallColourValid = false;
	var floorColourValid = false;
	var toleranceValid = false;
	var tileSizeValid = false;
	
	configHelp.overrideInternalProperties(fullInput.imageItems, optArgs);
	
	givenWallColour = fullInput.imageItems.wallColour;
	givenFloorColour = fullInput.imageItems.floorColour;
	givenTileSize = fullInput.imageItems.tileSize;
	
	wallColourValid = handleWallValidation(givenWallColour, fullInput, validationOutcomeObject);
	
	if (wallColourValid === true)
	{
		floorColourValid = handleFloorValidation(givenFloorColour, fullInput, validationOutcomeObject);
	}
	
	if (floorColourValid === true)
	{
		tileSizeValid = imageNumbers.validateTileSize(givenTileSize, fullInput, validationOutcomeObject);
	}
	
	if (tileSizeValid === true)
	{
		validationOutcomeObject.overallValid = true;
	}
	
	if (validationOutcomeObject.overallValid === true)
	{
		return argCallback(null, true);
	}
	else
	{
		return argCallback(new Error(validationOutcomeObject.errorMessage), null);
	}
	
}


function handleWallValidation(inpValue, fullInpObj, validOutcomeObj)
{
	var handleRes = hexColour.validateHexColour(inpValue, "wallColour", "Wall Colour", fullInpObj, validOutcomeObj);
	return handleRes;
}


function handleFloorValidation(inpValue, fullInpObj, validOutcomeObj)
{
	var handleRes = hexColour.validateHexColour(inpValue, "floorColour", "Floor Colour", fullInpObj, validOutcomeObj);
	return handleRes;
}




module.exports =
{
	prepareOptionArguments: prepareImageOptionArguments,
	prepareOutputArguments: prepareImageOutputArguments
};