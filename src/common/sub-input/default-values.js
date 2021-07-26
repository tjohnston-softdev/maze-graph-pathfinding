// This file specifies the default values for input arguments.

function defineDefaultValues()
{
	var defineRes = {};
	
	defineRes["outputFolderPath"] = ".";												// Output folder (Current directory)
	defineRes["ignoreErrors"] = false;													// Ignore parse errors
	defineRes["exportRawData"] = false;													// Export raw data
	defineRes["exportTestGraphData"] = false;											// Export graph data ('test-export' only)
	defineRes["wallColour"] = "#000000";												// Wall colour (Black)
	defineRes["floorColour"] = "#FFFFFF";												// Floor colour (White)
	defineRes["tolerancePercent"] = 0;													// Pixel colour tolerance percentage
	defineRes["tileSize"] = 10;															// Tile size in pixels
	defineRes["originCoordinates"] = 0;													// Image start coordinates
	defineRes["imageConfigPath"] = "./image-config.json";								// 'create-image-config' output path
	defineRes["replaceExisting"] = false;												// Replace existing files
	defineRes["absoluteConversionPath"] = "./absolute.txt";								// 'to-absolute' output path
	defineRes["gridConversionPath"] = "./grid.txt";										// 'to-grid' output path
	defineRes["relativeConversionPath"] = "./relative.txt";								// 'to-relative' output path
	defineRes["imgConversionPath"] = "./image.png";										// 'to-image' output path
	
	return defineRes;
}



module.exports = defineDefaultValues();