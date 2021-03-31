// Option description text.

const outputFolderDesc = "specifies the folder path where output result files will be written.";
const ignoreTextParseDesc = writeIgnoreParseDesc("text");
const ignoreImageParseDesc = writeIgnoreParseDesc("image");
const exportGraphDesc = "indicates whether to export the resulting graph diagram.";
const exportRawDesc = "exports raw graph and path data to separate files.";
const loadImageConfigDesc = writeLoadSaveImageConfigDesc("file path of an existing", "loaded.");
const saveImageConfigDesc = writeLoadSaveImageConfigDesc("name of a saved", "saved.");
const wallColourDesc = writeColourDesc("wall", "#000000");
const floorColourDesc = writeColourDesc("floor", "#FFFFFF");
const tolerancePercentDesc = "the percentage difference allowed when checking image pixel colours. (default: 0)";
const tileSizeDesc = "the approximate size of a maze tile in pixels. (default: 10)";
const imageOriginDescX = writeOriginDesc("x");
const imageOriginDescY = writeOriginDesc("y");
const replaceExistingFileDesc = "specifies whether existing files will be replaced.";
const saveImageConvConfigDesc = "specifies the path where the image configuration file will be saved. if this is blank, no file will be saved.";



function writeIgnoreParseDesc(typeDesc)
{
	var writeRes = "ignores or corrects non-fatal errors when parsing input " + typeDesc + " files.";
	return writeRes;
}


function writeLoadSaveImageConfigDesc(valueDesc, fileAction)
{
	var writeRes = "";
	
	writeRes += "specifies the " + valueDesc;
	writeRes += " image configuration file. ";
	writeRes += " if this is blank, no file will be ";
	writeRes += fileAction;
	
	return writeRes;
}


function writeColourDesc(pixelDesc, defaultHex)
{
	var writeRes = "";
	
	writeRes += "the hex colour of ";
	writeRes += pixelDesc;
	writeRes += " pixels in the target image. (default: ";
	writeRes += defaultHex;
	writeRes += ")";
	
	return writeRes;
}


function writeOriginDesc(oPlane)
{
	var writeRes = "the approximate " + oPlane + " location of the first tile. (default: 0)";
	return writeRes;
}



module.exports =
{
	outputFolder: outputFolderDesc,
	ignoreTextParse: ignoreTextParseDesc,
	ignoreImageParse: ignoreImageParseDesc,
	exportGraph: exportGraphDesc,
	exportRaw: exportRawDesc,
	loadImageConfig: loadImageConfigDesc,
	saveImageConfig: saveImageConfigDesc,
	wallColour: wallColourDesc,
	floorColour: floorColourDesc,
	tolerancePercent: tolerancePercentDesc,
	tileSize: tileSizeDesc,
	imageOriginX: imageOriginDescX,
	imageOriginY: imageOriginDescY,
	replaceExistingFile: replaceExistingFileDesc,
	saveImageConvConfig: saveImageConvConfigDesc
};