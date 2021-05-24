const ora = require("ora");
const spinText = require("../common/sub-interface/spin-text/st-parse");
const txtAbsolute = require("./actions/txt/txt-absolute");
const txtGrid = require("./actions/txt/txt-grid");
const txtRelative = require("./actions/txt/txt-relative");

// These functions initiate parsing for text input files. (Including load spinners)



// Absolute
function performAbsoluteEntryParsing(inpFilePath, inpIgnoreTextErrors, entryParseCallback)
{
	var absoluteSpinner = ora(spinText.parseProg).start();
	
	txtAbsolute.parseAbsolute(inpFilePath, inpIgnoreTextErrors, function (mError, mResult)
	{
		if (mError !== null)
		{
			absoluteSpinner.fail(spinText.parseFail);
			return entryParseCallback(mError, null);
		}
		else
		{
			absoluteSpinner.succeed(spinText.parseComp);
			return entryParseCallback(null, mResult);
		}
	});
}



// Grid
function performGridEntryParsing(inpFilePath, inpIgnoreTextErrors, entryParseCallback)
{
	var gridSpinner = ora(spinText.parseProg).start();
	
	txtGrid.parseGridFile(inpFilePath, inpIgnoreTextErrors, function (mError, mResult)
	{
		if (mError !== null)
		{
			gridSpinner.fail(spinText.parseFail);
			return entryParseCallback(mError, null);
		}
		else
		{
			gridSpinner.succeed(spinText.parseComp);
			return entryParseCallback(null, mResult.gridMatrix);
		}
	});
	
	
}


// Relative
function performRelativeEntryParsing(inpFilePath, inpIgnoreTextErrors, entryParseCallback)
{
	var relativeSpinner = ora(spinText.parseProg).start();
	
	txtRelative.parseRelative(inpFilePath, inpIgnoreTextErrors, function (mError, mResult)
	{
		if (mError !== null)
		{
			relativeSpinner.fail(spinText.parseFail);
			return entryParseCallback(mError, null);
		}
		else
		{
			relativeSpinner.succeed(spinText.parseComp);
			return entryParseCallback(null, mResult);
		}
	});
	
}






module.exports =
{
	performAbsoluteParsing: performAbsoluteEntryParsing,
	performGridParsing: performGridEntryParsing,
	performRelativeParsing: performRelativeEntryParsing
};