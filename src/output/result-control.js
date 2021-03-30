const asyncModule = require("async");
const exitProgram = require("../common/exit-program");
const graphFileExport = require("./file-write/graph-file-export");
const rawDataExport = require("./file-write/raw-data-export");
const imageConfigSaveExport = require("./file-write/image-config-save-export");
const absConversionExport = require("./file-write/absolute-conversion-export");
const gridConversionExport = require("./file-write/grid-conversion-export");
const relativeConversionExport = require("./file-write/relative-conversion-export");
const conversionClean = require("./file-clean/conversion-clean");
const graphClean = require("./file-clean/graph-clean");
const imageConfigClean = require("./file-clean/image-config-clean");


/*
	* Coordinates the creation of output files for different commands.
	* If there are any errors when creating output files, they will be deleted.
*/


// 'map-absolute', 'map-grid', 'map-relative', 'test-export'
function callTextGraphOutputTasks(outputPathsObject, cMapMode, cGraphObject, cPathObject, outputLabel)
{
	asyncModule.series(
	[
		graphFileExport.performGraphExport.bind(null, cMapMode, outputPathsObject, cGraphObject, cPathObject, outputLabel),
		rawDataExport.performRawDataExport.bind(null, cMapMode, outputPathsObject, cGraphObject, cPathObject)
	],
	function (outputError, outputRes)
	{
		if (outputError !== null)
		{
			handleTextFileClean(outputPathsObject, outputError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
	
}

// 'map-image'
function callImageGraphOutputTasks(cPreparedInput, cGraphObject, cPathObject, outputLabel)
{
	
	asyncModule.series(
	[
		graphFileExport.performGraphExport.bind(null, cPreparedInput.mapModeFlag, cPreparedInput.preparedPaths, cGraphObject, cPathObject, outputLabel),
		rawDataExport.performRawDataExport.bind(null, cPreparedInput.mapModeFlag, cPreparedInput.preparedPaths, cGraphObject, cPathObject),
		imageConfigSaveExport.performFileExport.bind(null, cPreparedInput.preparedPaths.imageConfigSaveFile, cPreparedInput.imageItems)
	],
	function (outputError, outputRes)
	{
		if (outputError !== null)
		{
			handleImageFileClean(cPreparedInput.preparedPaths, outputError.message);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
	
	
}


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

// 'absolute-to-relative', 'grid-to-relative'
function callAbsoluteGridToRelativeOutputTasks(cTargetPath, cGraphObject, cHeaderText)
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


// 'create-image-config'
function callCreateImageConfigOutputTasks(cPreparedInput)
{
	imageConfigSaveExport.performFileCreate(cPreparedInput.resolvedTargetPath, cPreparedInput.imageItems, function (saveError, saveRes)
	{
		if (saveError !== null)
		{
			handleCreateImageConfigFileClean(cPreparedInput.resolvedTargetPath);
		}
		else
		{
			exitProgram.callComplete();
		}
	});
}






// Deletes invalid output files for 'callTextGraphOutputTasks'
function handleTextFileClean(oPaths, eMsg)
{
	graphClean.removeTextGraphFiles(oPaths, function(cleanError, cleanRes)
	{
		// Error will be displayed regardless.
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


// Deletes invalid output files for 'callImageGraphOutputTasks'
function handleImageFileClean(oPaths, eMsg)
{
	graphClean.removeImageGraphFiles(oPaths, function(cleanError, cleanRes)
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


// Deletes invalid output file for 'callGridToAbsoluteOutputTask' and 'callAbsoluteGridToRelativeOutputTasks'
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


// Deletes invalid output file for 'callImageTo_____OutputTasks'
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



// Deletes invalid output file for 'callCreateImageConfigOutputTasks'
function handleCreateImageConfigFileClean(oPath, eMsg)
{
	imageConfigClean.removeCreatedImageConfig(oPath, function (cleanError, cleanRes)
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
	callTextGraphOutput: callTextGraphOutputTasks,
	callImageGraphOutput: callImageGraphOutputTasks,
	callGridToAbsoluteOutput: callGridToAbsoluteOutputTask,
	callImageToAbsoluteOutput: callImageToAbsoluteOutputTasks,
	callImageToGridOutput: callImageToGridOutputTasks,
	callAbsoluteGridToRelativeOutput: callAbsoluteGridToRelativeOutputTasks,
	callImageToRelativeOutput: callImageToRelativeOutputTasks,
	callCreateImageConfigOutput: callCreateImageConfigOutputTasks
};