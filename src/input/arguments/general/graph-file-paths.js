const path = require("path");
const exportPaths = require("../../../common/sub-input/export-paths");
const valuePrep = require("../../../common/value-prep");


// Initializes absolute path arguments.
function initializeDestinationPathProperties(pObject)
{
	pObject["inputFile"] = "";
	pObject["outputFolder"] = "";
	pObject["mainGraphFile"] = "";
	pObject["rawNodesFile"] = "";
	pObject["rawEdgesFile"] = "";
	pObject["rawSequenceFile"] = "";
	pObject["rawPathsDefined"] = false;
}


// Resolves input file and output folder paths from relative to absolute.
function prepareMapEntryPathValues(resObject)
{
	var inputFileString = resObject.inputFilePath;
	var outputFolderString = resObject.outputFolderPath;
	
	resObject.preparedPaths.inputFile = path.resolve(inputFileString);
	resObject.preparedPaths.outputFolder = path.resolve(outputFolderString);
}


// Resolves output folder path.
function prepareTestExportEntryPath(resObject)
{
	var outputFolderString = resObject.outputFolderPath;
	
	resObject.preparedPaths.inputFile = null;
	resObject.preparedPaths.outputFolder = path.resolve(outputFolderString);
}



// Writes individual output file paths for graph and raw data.
function prepareDestinationPaths(pObject, expGraph, expRaw)
{
	var resFolderPath = pObject.outputFolder;
	
	if (expGraph === true)
	{
		pObject.mainGraphFile = exportPaths.getMainGraphPath(resFolderPath);
	}
	
	if (expRaw === true)
	{
		pObject.rawNodesFile = exportPaths.getNodeDataPath(resFolderPath);
		pObject.rawEdgesFile = exportPaths.getEdgeDataPath(resFolderPath);
		pObject.rawSequenceFile = exportPaths.getSequenceDataPath(resFolderPath);
		pObject.rawPathsDefined = true;
	}
	
}


// Writes image config save and load paths for 'map-image'
function appendImageConfigSaveLoadPaths(resObject)
{
	var resFolderPath = resObject.preparedPaths.outputFolder;
	var ldPath = resObject.loadConfigPath;
	var sName = resObject.saveConfigName;
	
	var loadDefined = valuePrep.checkStringType(ldPath);
	var saveDefined = valuePrep.checkStringType(sName);
	
	resObject.preparedPaths["imageConfigLoadFile"] = "";
	resObject.preparedPaths["imageConfigSaveFile"] = "";
	
	
	if (loadDefined === true && ldPath.length > 0)
	{
		resObject.preparedPaths.imageConfigLoadFile = path.resolve(ldPath);
	}
	
	if (saveDefined === true && sName.length > 0)
	{
		resObject.preparedPaths.imageConfigSaveFile = exportPaths.getCustomPath(resFolderPath, sName);
	}
	
}





module.exports =
{
	initializeProperties: initializeDestinationPathProperties,
	prepareMapEntry: prepareMapEntryPathValues,
	prepareTestExportEntry: prepareTestExportEntryPath,
	prepareDestPaths: prepareDestinationPaths,
	appendImageConfigSaveLoad: appendImageConfigSaveLoadPaths
};