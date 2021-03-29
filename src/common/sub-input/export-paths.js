const path = require("path");

const graphFileName = "graph.html";
const nodeDataFileName = "node-data.csv";
const edgeDataFileName = "edge-data.csv";
const sequenceDataFileName = "path-data.json";


// These functions are used to prepare the target output paths for exported map files.


// Graph HTML file.
function getMainGraphFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, graphFileName);
	return pathRes;
}


// Node data CSV.
function getNodeDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, nodeDataFileName);
	return pathRes;
}


// Edge data CSV.
function getEdgeDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, edgeDataFileName);
	return pathRes;
}


// Path JSON file.
function getSequenceDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, sequenceDataFileName);
	return pathRes;
}



// Custom
function getCustomFilePath(tgtFolder, custFileName)
{
	var pathRes = path.join(tgtFolder, custFileName);
	return pathRes;
}




module.exports =
{
	getMainGraphPath: getMainGraphFilePath,
	getNodeDataPath: getNodeDataFilePath,
	getEdgeDataPath: getEdgeDataFilePath,
	getSequenceDataPath: getSequenceDataFilePath,
	getCustomPath: getCustomFilePath
};