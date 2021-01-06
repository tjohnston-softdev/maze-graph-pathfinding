// Template file paths

const path = require("path");
const webOutputFolder = path.join(".", "templates", "web-output");

const headerPathString = path.join(webOutputFolder, "a-header.html");
const stylePathString = path.join(webOutputFolder, "c-styling.html");
const contentAllPathString = path.join(webOutputFolder, "e-content-all.html");
const contentBlockPathString = path.join(webOutputFolder, "e-contents-block.html");
const contentShortestPathString = path.join(webOutputFolder, "e-content-shortest.html");
const contentBlankPathString = path.join(webOutputFolder, "e-content-blank.html");
const graphPathString = path.join(webOutputFolder, "f-graph.js");
const dynamicAllPathString = path.join(webOutputFolder, "g-dynamic-all.js");
const dynamicBlockPathString = path.join(webOutputFolder, "g-dynamic-block.js");
const dynamicShortestPathString = path.join(webOutputFolder, "g-dynamic-shortest.js");
const footerPathString = path.join(webOutputFolder, "h-footer.html");



module.exports =
{
	headerPath: headerPathString,
	stylePath: stylePathString,
	contentAllPath: contentAllPathString,
	contentBlockPath: contentBlockPathString,
	contentShortestPath: contentShortestPathString,
	contentBlankPath: contentBlankPathString,
	graphPath: graphPathString,
	dynamicAllPath: dynamicAllPathString,
	dynamicBlockPath: dynamicBlockPathString,
	dynamicShortestPath: dynamicShortestPathString,
	footerPath: footerPathString
};