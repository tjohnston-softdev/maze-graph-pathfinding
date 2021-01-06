// Number limits.


const maxGridDimensionNumber = 500;												// Maximum grid dimension size (500x500)
const maxModeLengthNumber = 32;													// Maximum pathfinding mode string length.
const maxPathLengthNumber = 5000;												// Maximum file system path length.
const maxFileNameLengthNumber = 200;											// Maximum file name length.
const maxTextLineLengthNumber = 100;											// Maximum text input line length. (Absolute and Relative)
const maxGridLineLengthNumber = maxGridDimensionNumber;							// Maximum text input line length. (Grid)
const maxNodeCountNumber = 100000;												// Maximum node count.
const maxEdgeCountNumber = 100000;												// Maximum edge count.
const maxAllPossibleNodesNumber = 500;											// Maximum node count when finding 'all possible' routes.
const maxAllPossibleRoutesNumber = 500;											// Maximum number of routes to remember.
const cacheLengthNumber = 10000;												// Number of characters to store in memory at once when writing output files.
const minPercentageNumber = 0;													// Minimum percentage (0%)
const maxPercentageNumber = 100;												// Maximum percentage (100%)
const minTileSizeNumber = 1;													// Minimum tile size
const maxTileSizeNumber = 100;													// Maximum tile size
const minImageDimensionNumber = 1;												// Minimum image dimension size (1x1)
const maxImageDimensionNumber = 50000;											// Maximum image dimension size (50000x50000)



module.exports =
{
	maxGridDimension: maxGridDimensionNumber,
	maxModeLength: maxModeLengthNumber,
	maxPathLength: maxPathLengthNumber,
	maxFileNameLength: maxFileNameLengthNumber,
	maxTextLineLength: maxTextLineLengthNumber,
	maxGridLineLength: maxGridLineLengthNumber,
	maxNodeCount: maxNodeCountNumber,
	maxEdgeCount: maxEdgeCountNumber,
	maxAllPossibleNodes: maxAllPossibleNodesNumber,
	maxAllPossibleRoutes: maxAllPossibleRoutesNumber,
	cacheLength: cacheLengthNumber,
	minPercentage: minPercentageNumber,
	maxPercentage: maxPercentageNumber,
	minTileSize: minTileSizeNumber,
	maxTileSize: maxTileSizeNumber,
	minImageDimension: minImageDimensionNumber,
	maxImageDimension: maxImageDimensionNumber
}