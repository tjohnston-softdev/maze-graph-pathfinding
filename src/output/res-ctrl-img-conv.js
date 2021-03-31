const asyncModule = require("async");
const exitProgram = require("../common/exit-program");
const imageConfigSaveExport = require("./file-write/image-config-save-export");
const absConversionExport = require("./file-write/absolute-conversion-export");
const gridConversionExport = require("./file-write/grid-conversion-export");
const relativeConversionExport = require("./file-write/relative-conversion-export");
const conversionClean = require("./file-clean/conversion-clean");


/*
	* Coordinates the creation of output files for these commands:
		* image-to-absolute
		* image-to-grid
		* image-to-relative
	* If there are any errors when creating output files, they will be deleted.
*/



// 'image-to-absolute'
function callImageToAbsoluteOutputTasks(cPreparedInput, cGraphObject, cHeaderText)
{
	asyncModule.series(
	[
		absConversionExport.performFileExport.bind(null, cPreparedInput.preparedPaths.writePath, cGraphObject, cHeaderText),
		imageConfigSaveExport.performFileExport.bind(null, cPreparedInput.preparedPaths.saveConfig, cPreparedInput.imageItems)
	],
	function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleImageConversionFileClean(cPreparedInput.preparedPaths, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}


// 'image-to-grid'
function callImageToGridOutputTasks(cPreparedInput, cGridObject, cGraphObject, cHeaderText)
{
	asyncModule.series(
	[
		gridConversionExport.performFileExport.bind(null, cPreparedInput.preparedPaths.writePath, cGridObject, cGraphObject, cHeaderText),
		imageConfigSaveExport.performFileExport.bind(null, cPreparedInput.preparedPaths.saveConfig, cPreparedInput.imageItems)
	],
	function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleImageConversionFileClean(cPreparedInput.preparedPaths, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}




// 'image-to-relative'
function callImageToRelativeOutputTasks(cPreparedInput, cGraphObject, cHeaderText)
{
	asyncModule.series(
	[
		relativeConversionExport.performFileExport.bind(null, cPreparedInput.preparedPaths.writePath, cGraphObject, cHeaderText),
		imageConfigSaveExport.performFileExport.bind(null, cPreparedInput.preparedPaths.saveConfig, cPreparedInput.imageItems)
	],
	function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleImageConversionFileClean(cPreparedInput.preparedPaths, saveError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}


// Deletes invalid output files.
function handleImageConversionFileClean(oPaths, eMsg)
{
	conversionClean.removeImageConversion(oPaths, function (cleanError, cleanRes)
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
	callImageToAbsolute: callImageToAbsoluteOutputTasks,
	callImageToGrid: callImageToGridOutputTasks,
	callImageToRelative: callImageToRelativeOutputTasks
};