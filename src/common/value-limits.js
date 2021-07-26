// Number limits.

function defineLimits()
{
	var maxGridDimensionNumber = 1000;
	var defineRes = {};
	
	defineRes["maxGridDimension"] = maxGridDimensionNumber;							// Maximum grid dimension size (500x500)
	defineRes["maxModeLength"] = 32;												// Maximum pathfinding mode string length.
	defineRes["maxPathLength"] = 5000;												// Maximum file system path length.
	defineRes["maxFileNameLength"] = 200;											// Maximum file name length.
	defineRes["maxTextLineLength"] = 100;											// Maximum text input line length. (Absolute and Relative)
	defineRes["maxGridLineLength"] = maxGridDimensionNumber;						// Maximum text input line length. (Grid)
	defineRes["maxNodeCount"] = 1000000;											// Maximum node count.
	defineRes["maxEdgeCount"] = 1000000;											// Maximum edge count.
	defineRes["maxAllPossibleNodes"] = 500;											// Maximum node count when finding 'all possible' routes.
	defineRes["maxAllPossibleRoutes"] = 500;										// Maximum number of routes to remember.
	defineRes["cacheLength"] = 10000;												// Number of characters to store in memory at once when writing output files.
	defineRes["minPercentage"] = 0;													// Minimum percentage (0%)
	defineRes["maxPercentage"] = 100;												// Maximum percentage (100%)
	defineRes["minTileSize"] = 1;													// Minimum tile size
	defineRes["maxTileSize"] = 100;													// Maximum tile size
	defineRes["minImageDimension"] = 1;												// Minimum image dimension size (1x1)
	defineRes["maxImageDimension"] = 50000;											// Maximum image dimension size (50000x50000)
	
	return defineRes;
}


module.exports = defineLimits();