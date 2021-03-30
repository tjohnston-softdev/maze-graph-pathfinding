// This file specifies the default values for input arguments.

const outputFolderPathString = ".";												// Output folder (Current directory)
const ignoreErrorsToggle = false;												// Ignore parse errors
const exportRawDataToggle = false;												// Export raw data
const exportTestGraphDataToggle = false;										// Export graph data ('test-export' only)
const wallColourHex = "#000000";												// Wall colour (Black)
const floorColourHex = "#FFFFFF";												// Floor colour (White)
const tolerancePercentage = 0;													// Pixel colour tolerance percentage
const tileSizeNumber = 10;														// Tile size in pixels
const originCoordinatesNumber = 0;												// Image start coordinates
const imageConfigPathString = "./image-config.json";							// 'create-image-config' output path
const replaceExistingFile = false;												// Replace existing files
const absoluteConversionPathString = "./absolute.txt";							// 'to-absolute' output path
const gridConversionPathString = "./grid.txt";									// 'to-grid' output path
const relativeConversionPathString = "./relative.txt";							// 'to-relative' output path



module.exports =
{
	outputFolderPath: outputFolderPathString,
	ignoreErrors: ignoreErrorsToggle,
	exportRawData: exportRawDataToggle,
	exportTestGraphData: exportTestGraphDataToggle,
	wallColour: wallColourHex,
	floorColour: floorColourHex,
	tolerancePercent: tolerancePercentage,
	tileSize: tileSizeNumber,
	originCoordinates: originCoordinatesNumber,
	imageConfigPath: imageConfigPathString,
	replaceExisting: replaceExistingFile,
	absoluteConversionPath: absoluteConversionPathString,
	gridConversionPath: gridConversionPathString,
	relativeConversionPath: relativeConversionPathString
};