const path = require("path");

const graphFileName = "graph.html";
const nodeDataFileName = "node-data.csv";
const edgeDataFileName = "edge-data.csv";
const sequenceDataFileName = "path-data.json";


// These functions are used to prepare the target output paths for exported map files.


function getMainGraphFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, graphFileName);
	return pathRes;
}


function getNodeDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, nodeDataFileName);
	return pathRes;
}


function getEdgeDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, edgeDataFileName);
	return pathRes;
}


function getSequenceDataFilePath(tgtFolder)
{
	var pathRes = path.join(tgtFolder, sequenceDataFileName);
	return pathRes;
}



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