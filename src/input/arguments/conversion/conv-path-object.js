const path = require("path");
const valuePrep = require("../../../common/value-prep");


// Initializes input and output absolute paths for conversion commands.
function initializePathProperties(rPrepPaths)
{
	rPrepPaths["inputPath"] = "";
	rPrepPaths["writePath"] = "";
}


// Initializes image load and save absolute paths.
function appendImageConfigProperties(rPrepPaths)
{
	rPrepPaths["loadConfig"] = "";
	rPrepPaths["saveConfig"] = "";
}


// Resolves paths from relative to absolute.
function defineImageConfigProperties(resObject)
{
	var ldPath = resObject.loadConfigPath;
	var sPath = resObject.saveConfigPath;
	
	var loadDefined = valuePrep.checkStringType(ldPath);
	var saveDefined = valuePrep.checkStringType(sPath);
	
	
	// Resolve load path.
	if (loadDefined === true && ldPath.length > 0)
	{
		resObject.preparedPaths.loadConfig = path.resolve(ldPath);
	}
	
	
	// Resolve save path.
	if (saveDefined === true && sPath.length > 0)
	{
		resObject.preparedPaths.saveConfig = path.resolve(sPath);
	}
	
	
}




module.exports =
{
	initializePaths: initializePathProperties,
	appendImageConfig: appendImageConfigProperties,
	defineImageConfig: defineImageConfigProperties
};