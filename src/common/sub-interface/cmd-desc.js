// Command description text.

const mapAbsoluteDesc = writeMapDesc("an absolute node graph text file");
const mapGridDesc = writeMapDesc("a predefined binary grid text file");
const mapRelativeDesc = writeMapDesc("a relative node graph text file");
const mapImageDesc = writeMapDesc("an existing image file of a maze");
const createImageConfigDesc = "Creates a configuration file that can be used when reading images.";
const loadImageConfigDesc = "Reads and validates an existing image configuration file.";
const gridToAbsoluteDesc = writeAbsoluteConversionDesc("Grid definition text");
const imageToAbsoluteDesc = writeAbsoluteConversionDesc("Image");
const imageToGridDesc = writeImageToGridDesc();
const testExportDesc = "Used to test file output by exporting a hard-coded graph.";
const versionDesc = "Displays current version number.";



function writeMapDesc(fileDesc)
{
	var writeRes = "";
	
	writeRes += "Takes ";
	writeRes += fileDesc;
	writeRes += ", converts it into an interactive diagram, and performs a pathfinding algorithm.";
	
	return writeRes;
}


function writeAbsoluteConversionDesc(inputDesc)
{
	var writeRes = "";
	
	writeRes += "Takes an existing ";
	writeRes += inputDesc;
	writeRes += " file, parses it into a graph, and outputs an Absolute definition text file.";
	
	return writeRes;
}

function writeImageToGridDesc()
{
	var writeRes = "";
	
	writeRes += "Takes an existing image file, ";
	writeRes += "parses it into a grid, and ";
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
	imageToAbsolute: imageToAbsoluteDesc,
	imageToGrid: imageToGridDesc,
	testExport: testExportDesc,
	version: versionDesc
};