const exitProgram = require("../common/exit-program");
const absConversionExport = require("./file-write/absolute-conversion-export");
const relativeConversionExport = require("./file-write/relative-conversion-export");
const gridConversionExport = require("./file-write/grid-conversion-export");
const conversionClean = require("./file-clean/conversion-clean");


/*
	* Coordinates the creation of output files for these commands:
		* grid-to-absolute
		* absolute-to-relative
		* grid-to-relative
	* If there are any errors when creating output files, they will be deleted.
*/



// 'grid-to-absolute'
function callGridToAbsoluteOutputTask(cTargetPath, cGraphObject, cHeaderText)
{
	absConversionExport.performFileExport(cTargetPath, cGraphObject, cHeaderText, function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleTextConversionFileClean(cTargetPath, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}


// 'absolute-to-grid'
function callAbsoluteToGridOutputTask(cTargetPath, cGridObject, cGraphObject, cHeaderText)
{
	gridConversionExport.performFileExport(cTargetPath, cGridObject, cGraphObject, cHeaderText, function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleTextConversionFileClean(cTargetPath, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}


// 'absolute-to-relative', 'grid-to-relative'
function callAbsoluteGridToRelativeOutputTask(cTargetPath, cGraphObject, cHeaderText)
{
	relativeConversionExport.performFileExport(cTargetPath, cGraphObject, cHeaderText, function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleTextConversionFileClean(cTargetPath, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}



// Deletes invalid output file.
function handleTextConversionFileClean(oPath, eMsg)
{
	conversionClean.removeTextConversion(oPath, function (cleanError, cleanRes)
	{
		if (cleanError !== null)
		{
			exitProgram.callExit(cleanError.message);
		}
		else
		{
			exitProgram.callExit(eMsg);
		}
	});
}




module.exports =
{
	callGridToAbsolute: callGridToAbsoluteOutputTask,
	callAbsoluteToGrid: callAbsoluteToGridOutputTask,
	callAbsoluteGridToRelative: callAbsoluteGridToRelativeOutputTask
};