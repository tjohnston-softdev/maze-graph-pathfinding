const commander = require("commander");
const program = commander.program;
const cmdDesc = require("./src/common/sub-interface/cmd-desc");
const optionDesc = require("./src/common/sub-interface/option-desc");
const mapAbsoluteMain = require("./src/map-absolute-main");
const mapGridMain = require("./src/map-grid-main");
const mapRelativeMain = require("./src/map-relative-main");
const mapImageMain = require("./src/map-image-main");
const createImageConfigMain = require("./src/create-image-config-main");
const readImageConfigMain = require("./src/read-image-config-main");
const gridToAbsoluteMain = require("./src/grid-to-absolute-main");
const imageToAbsoluteMain = require("./src/image-to-absolute-main");
const imageToGridMain = require("./src/image-to-grid-main");
const absoluteToRelativeMain = require("./src/absolute-to-relative-main");
const gridToRelativeMain = require("./src/grid-to-relative-main");
const testExportMain = require("./src/test-export-main");

const versionText = "Version 1.0.0";
program.version(versionText);


// map-absolute <input-path> [pathfinding-mode]
program
.command("map-absolute <input-path> [pathfinding-mode]")
.description(cmdDesc.mapAbsolute)
.option("-o --output-folder <path>", optionDesc.outputFolder)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.option("-r --raw", optionDesc.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapAbsoluteMain.runAbsoluteMapping(inpFilePath, inpFindMode, options);
});


// map-grid <input-path> [pathfinding-mode]
program
.command("map-grid <input-path> [pathfinding-mode]")
.description(cmdDesc.mapGrid)
.option("-o --output-folder <path>", optionDesc.outputFolder)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.option("-r --raw", optionDesc.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapGridMain.runGridMapping(inpFilePath, inpFindMode, options);
});


// map-relative <input-path> [pathfinding-mode]
program
.command("map-relative <input-path> [pathfinding-mode]")
.description(cmdDesc.mapRelative)
.option("-o --output-folder <path>", optionDesc.outputFolder)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.option("-r --raw", optionDesc.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapRelativeMain.runRelativeMapping(inpFilePath, inpFindMode, options);
});


// map-image <input-path> [pathfinding-mode]
program
.command("map-image <input-path> [pathfinding-mode]")
.description(cmdDesc.mapImage)
.option("-o --output-folder <path>", optionDesc.outputFolder)
.option("-i --ignore-parse-errors", optionDesc.ignoreImageParse)
.option("-r --raw", optionDesc.exportRaw)
.option("--load <path>", optionDesc.loadImageConfig)
.option("--save <name>", optionDesc.saveImageConfig)
.option("--wall <colour>", optionDesc.wallColour)
.option("--floor <colour>", optionDesc.floorColour)
.option("--tolerance <percent>", optionDesc.tolerancePercent)
.option("--size <number>", optionDesc.tileSize)
.option("-x --start-x <number>", optionDesc.imageOriginX)
.option("-y --start-y <number>", optionDesc.imageOriginY)
.action(function (inpImagePath, inpFindMode, options)
{
	mapImageMain.runImageMapping(inpImagePath, inpFindMode, options);
});



// create-image-config [output-path]
program
.command("create-image-config [output-path]")
.description(cmdDesc.createImageConfig)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("--wall <colour>", optionDesc.wallColour)
.option("--floor <colour>", optionDesc.floorColour)
.option("--tolerance <percent>", optionDesc.tolerancePercent)
.option("--size <number>", optionDesc.tileSize)
.option("-x --start-x <number>", optionDesc.imageOriginX)
.option("-y --start-y <number>", optionDesc.imageOriginY)
.action(function (inpWritePath, options)
{
	createImageConfigMain.runConfigCreate(inpWritePath, options);
});



// read-image-config <file-path>
program
.command("read-image-config <file-path>")
.description(cmdDesc.loadImageConfig)
.action(function (inpFilePath)
{
	readImageConfigMain.runConfigRead(inpFilePath);
});


// grid-to-absolute <input-grid> [output-path]
program
.command("grid-to-absolute <input-grid> [output-path]")
.description(cmdDesc.gridToAbsolute)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.action(function (inpGridPath, inpWritePath, options)
{
	gridToAbsoluteMain.runFileConversion(inpGridPath, inpWritePath, options);
});



// image-to-absolute <input-image> [output-path]
program
.command("image-to-absolute <input-image> [output-path]")
.description(cmdDesc.imageToAbsolute)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreImageParse)
.option("--load <path>", optionDesc.loadImageConfig)
.option("--save <path>", optionDesc.saveImageConvConfig)
.option("--wall <colour>", optionDesc.wallColour)
.option("--floor <colour>", optionDesc.floorColour)
.option("--tolerance <percent>", optionDesc.tolerancePercent)
.option("--size <number>", optionDesc.tileSize)
.option("-x --start-x <number>", optionDesc.imageOriginX)
.option("-y --start-y <number>", optionDesc.imageOriginY)
.action(function (inpImagePath, inpWritePath, options)
{
	imageToAbsoluteMain.runFileConversion(inpImagePath, inpWritePath, options);
});



// image-to-grid <input-image> [output-path]
program
.command("image-to-grid <input-image> [output-path]")
.description(cmdDesc.imageToGrid)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreImageParse)
.option("--load <path>", optionDesc.loadImageConfig)
.option("--save <path>", optionDesc.saveImageConvConfig)
.option("--wall <colour>", optionDesc.wallColour)
.option("--floor <colour>", optionDesc.floorColour)
.option("--tolerance <percent>", optionDesc.tolerancePercent)
.option("--size <number>", optionDesc.tileSize)
.option("-x --start-x <number>", optionDesc.imageOriginX)
.option("-y --start-y <number>", optionDesc.imageOriginY)
.action(function (inpImagePath, inpWritePath, options)
{
	imageToGridMain.runFileConversion(inpImagePath, inpWritePath, options);
});


// absolute-to-relative <input-absolute> [output-path]
program
.command("absolute-to-relative <input-absolute> [output-path]")
.description(cmdDesc.absoluteToRelative)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.action(function (inpFilePath, inpWritePath, options)
{
	absoluteToRelativeMain.runFileConversion(inpFilePath, inpWritePath, options);
});


// grid-to-relative <input-grid> [output-path]
program
.command("grid-to-relative <input-grid> [output-path]")
.description(cmdDesc.gridToRelative)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreTextParse)
.action(function (inpFilePath, inpWritePath, options)
{
	gridToRelativeMain.runFileConversion(inpFilePath, inpWritePath, options);
});



// image-to-relative <input-image> [output-path]
program
.command("image-to-relative <input-image> [output-path]")
.description(cmdDesc.imageToRelative)
.option("-r --replace", optionDesc.replaceExistingFile)
.option("-i --ignore-parse-errors", optionDesc.ignoreImageParse)
.option("--load <path>", optionDesc.loadImageConfig)
.option("--save <path>", optionDesc.saveImageConvConfig)
.option("--wall <colour>", optionDesc.wallColour)
.option("--floor <colour>", optionDesc.floorColour)
.option("--tolerance <percent>", optionDesc.tolerancePercent)
.option("--size <number>", optionDesc.tileSize)
.option("-x --start-x <number>", optionDesc.imageOriginX)
.option("-y --start-y <number>", optionDesc.imageOriginY)
.action(function (inpImagePath, inpWritePath, options)
{
	console.log("Image to Relative");
});

// test-export [pathfinding-mode]
program
.command("test-export [pathfinding-mode]")
.description(cmdDesc.testExport)
.option("-o --output-folder <path>", optionDesc.outputFolder, ".")
.option("-g --graph", optionDesc.exportGraph)
.option("-r --raw", optionDesc.exportRaw)
.action(function (inpFindMode, options)
{
	testExportMain.runTestExport(inpFindMode, options);
});



// version
program
.command("version")
.description(cmdDesc.version)
.action(function ()
{
	console.log(versionText);
});



program.parse(process.argv);