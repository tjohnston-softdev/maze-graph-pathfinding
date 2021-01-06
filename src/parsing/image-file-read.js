const ora = require("ora");
const spinText = require("../common/sub-interface/spin-text/st-parse");
const imgOpen = require("./actions/img/img-open");
const imgDimensions = require("./actions/img/img-dimensions");
const imgPixels = require("./actions/img/img-pixels");

// This file contains functions used to control image file parsing.


// Open image file.
function performImageFileOpen(inpFilePath, imageOpenCallback)
{
	var imageSpinner = ora("Opening Target Image").start();
	
	imgOpen.openTargetFile(inpFilePath, function (mError, mResult)
	{
		if (mError !== null)
		{
			imageSpinner.fail("Error Opening Target Image");
			return imageOpenCallback(mError, null);
		}
		else
		{
			imageSpinner.succeed("Image File Opened");
			return imageOpenCallback(null, mResult);
		}
	});
	
}


// Read image dimensions.
function performImageDimensionRead(inpImageObject, inpImageSettings, imgDimensionCallback)
{
	var dimensionSpinner = ora("Reading Image Dimensions").start();
	
	imgDimensions.verifyDimensions(inpImageObject, inpImageSettings, function (dError, dRes)
	{
		if (dError !== null)
		{
			dimensionSpinner.fail("Image Dimensions Error");
			return imgDimensionCallback(dError, null);
		}
		else
		{
			dimensionSpinner.succeed("Image Dimensions Valid");
			return imgDimensionCallback(null, true);
		}
	});
	
}



// Parse pixels into grid.
function performImageContentsParsing(inpImageObject, inpImageColours, inpImageSettings, inpIgnoreErrors, parseCallback)
{
	var imageContentsSpinner = ora(spinText.parseProg).start();
	
	imgPixels.parseImagePixels(inpImageObject, inpImageSettings, inpImageColours, inpIgnoreErrors, function(mError, mResult)
	{
		if (mError !== null)
		{
			imageContentsSpinner.fail(spinText.parseFail);
			return parseCallback(mError, null);
		}
		else
		{
			imageContentsSpinner.succeed(spinText.parseComp);
			return parseCallback(null, mResult.gridMatrix);
		}
	});
	
}



module.exports =
{
	performFileOpen: performImageFileOpen,
	performDimensionsRead: performImageDimensionRead,
	performContentsParse: performImageContentsParsing
};