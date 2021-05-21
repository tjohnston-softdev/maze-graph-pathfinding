// Command description text.

const mapAbsoluteDesc = writeMapDesc("an absolute node graph text file");
const mapGridDesc = writeMapDesc("a predefined binary grid text file");
const mapRelativeDesc = writeMapDesc("a relative node graph text file");
const mapImageDesc = writeMapDesc("an existing image file of a maze");
const createImageConfigDesc = "creates a configuration file that can be used when reading images.";
const loadImageConfigDesc = "reads and validates an existing image configuration file.";
const gridToAbsoluteDesc = writeAbsoluteConversionDesc("grid definition text");
const absoluteToGridDesc = writeGridConversionDesc("absolute definition text");
const imageToAbsoluteDesc = writeAbsoluteConversionDesc("image");
const imageToGridDesc = writeGridConversionDesc("image");
const absoluteToRelativeDesc = writeRelativeConversionDesc("absolute definition text");
const gridToRelativeDesc = writeRelativeConversionDesc("grid definition text");
const imageToRelativeDesc = writeRelativeConversionDesc("image");
const testExportDesc = "used to test file output by exporting a hard-coded graph.";
const versionDesc = "displays current version number.";



function writeMapDesc(fileDesc)
{
	var writeRes = "";
	
	writeRes += "takes ";
	writeRes += fileDesc;
	writeRes += ", converts it into an interactive diagram, ";
	writeRes += "and performs a pathfinding algorithm.";
	
	return writeRes;
}


function writeAbsoluteConversionDesc(inputDesc)
{
	var writeRes = "";
	
	writeRes += "takes an existing ";
	writeRes += inputDesc;
	writeRes += " file, parses it into a graph, ";
	writeRes += "and outputs an absolute definition text file.";
	
	return writeRes;
}


function writeRelativeConversionDesc(inputDesc)
{
	var writeRes = "";
	
	writeRes += "takes an existing ";
	writeRes += inputDesc;
	writeRes += " file, parses it into a graph, ";
	writeRes += "and outputs a relative definition text file.";
	
	return writeRes;
}


function writeGridConversionDesc(inputDesc)
{
	var writeRes = "";
	
	writeRes += "takes an existing ";
	writeRes += inputDesc;
	writeRes += "file, parses it into a grid, and ";
	writeRes += "outputs it as a definition text file.";
	
	return writeRes;
}




module.exports =
{
	mapAbsolute: mapAbsoluteDesc,
	mapGrid: mapGridDesc,
	mapRelative: mapRelativeDesc,
	mapImage: mapImageDesc,
	createImageConfig: createImageConfigDesc,
	loadImageConfig: loadImageConfigDesc,
	gridToAbsolute: gridToAbsoluteDesc,
	absoluteToGrid: absoluteToGridDesc,
	imageToAbsolute: imageToAbsoluteDesc,
	imageToGrid: imageToGridDesc,
	absoluteToRelative: absoluteToRelativeDesc,
	gridToRelative: gridToRelativeDesc,
	imageToRelative: imageToRelativeDesc,
	testExport: testExportDesc,
	version: versionDesc
};