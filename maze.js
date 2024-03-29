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
const absoluteToGridMain = require("./src/absolute-to-grid-main");
const imageToAbsoluteMain = require("./src/image-to-absolute-main");
const imageToGridMain = require("./src/image-to-grid-main");
const absoluteToRelativeMain = require("./src/absolute-to-relative-main");
const gridToRelativeMain = require("./src/grid-to-relative-main");
const imageToRelativeMain = require("./src/image-to-relative-main");
const gridToImageMain = require("./src/grid-to-image-main");
const testExportMain = require("./src/test-export-main");

const versionText = "Version 1.3.0";
program.version(versionText);


// map-absolute <input-path> [pathfinding-mode]
program
.command("map-absolute <input-path> [pathfinding-mode]")
.description(cmdDesc.mapAbsolute)
.option("-o --output-folder <path>", optionDesc.fileOutput.folder)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.option("-r --raw", optionDesc.fileOutput.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapAbsoluteMain.performCommand(inpFilePath, inpFindMode, options);
});


// map-grid <input-path> [pathfinding-mode]
program
.command("map-grid <input-path> [pathfinding-mode]")
.description(cmdDesc.mapGrid)
.option("-o --output-folder <path>", optionDesc.fileOutput.folder)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.option("-r --raw", optionDesc.fileOutput.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapGridMain.performCommand(inpFilePath, inpFindMode, options);
});


// map-relative <input-path> [pathfinding-mode]
program
.command("map-relative <input-path> [pathfinding-mode]")
.description(cmdDesc.mapRelative)
.option("-o --output-folder <path>", optionDesc.fileOutput.folder)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.option("-r --raw", optionDesc.fileOutput.exportRaw)
.action(function (inpFilePath, inpFindMode, options)
{
	mapRelativeMain.performCommand(inpFilePath, inpFindMode, options);
});


// map-image <input-path> [pathfinding-mode]
program
.command("map-image <input-path> [pathfinding-mode]")
.description(cmdDesc.mapImage)
.option("-o --output-folder <path>", optionDesc.fileOutput.folder)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.imgParse)
.option("-r --raw", optionDesc.fileOutput.exportRaw)
.option("--load <path>", optionDesc.imgConfig.load)
.option("--save <name>", optionDesc.imgConfig.save)
.option("--wall <colour>", optionDesc.imgColours.wallRead)
.option("--floor <colour>", optionDesc.imgColours.floorRead)
.option("--tolerance <percent>", optionDesc.imgParse.tolerancePercent)
.option("--size <number>", optionDesc.imgParse.tileSize)
.option("-x --start-x <number>", optionDesc.imgParse.originX)
.option("-y --start-y <number>", optionDesc.imgParse.originY)
.action(function (inpImagePath, inpFindMode, options)
{
	mapImageMain.performCommand(inpImagePath, inpFindMode, options);
});



// create-image-config [output-path]
program
.command("create-image-config [output-path]")
.description(cmdDesc.createImageConfig)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("--wall <colour>", optionDesc.imgColours.wallRead)
.option("--floor <colour>", optionDesc.imgColours.floorRead)
.option("--tolerance <percent>", optionDesc.imgParse.tolerancePercent)
.option("--size <number>", optionDesc.imgParse.tileSize)
.option("-x --start-x <number>", optionDesc.imgParse.originX)
.option("-y --start-y <number>", optionDesc.imgParse.originY)
.action(function (inpWritePath, options)
{
	createImageConfigMain.performCommand(inpWritePath, options);
});



// read-image-config <file-path>
program
.command("read-image-config <file-path>")
.description(cmdDesc.loadImageConfig)
.action(function (inpFilePath)
{
	readImageConfigMain.performCommand(inpFilePath);
});


// grid-to-absolute <input-grid> [output-path]
program
.command("grid-to-absolute <input-grid> [output-path]")
.description(cmdDesc.gridToAbsolute)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.action(function (inpGridPath, inpWritePath, options)
{
	gridToAbsoluteMain.performCommand(inpGridPath, inpWritePath, options);
});


// absolute-to-grid <input-absolute> [output-path]
program
.command("absolute-to-grid <input-absolute> [output-path]")
.description(cmdDesc.absoluteToGrid)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.action(function (inpAbsolutePath, inpWritePath, options)
{
	absoluteToGridMain.performCommand(inpAbsolutePath, inpWritePath, options);
});



// image-to-absolute <input-image> [output-path]
program
.command("image-to-absolute <input-image> [output-path]")
.description(cmdDesc.imageToAbsolute)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.imgParse)
.option("--load <path>", optionDesc.imgConfig.load)
.option("--save <path>", optionDesc.imgConfig.saveConv)
.option("--wall <colour>", optionDesc.imgColours.wallRead)
.option("--floor <colour>", optionDesc.imgColours.floorRead)
.option("--tolerance <percent>", optionDesc.imgParse.tolerancePercent)
.option("--size <number>", optionDesc.imgParse.tileSize)
.option("-x --start-x <number>", optionDesc.imgParse.originX)
.option("-y --start-y <number>", optionDesc.imgParse.originY)
.action(function (inpImagePath, inpWritePath, options)
{
	imageToAbsoluteMain.performCommand(inpImagePath, inpWritePath, options);
});



// image-to-grid <input-image> [output-path]
program
.command("image-to-grid <input-image> [output-path]")
.description(cmdDesc.imageToGrid)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.imgParse)
.option("--load <path>", optionDesc.imgConfig.load)
.option("--save <path>", optionDesc.imgConfig.saveConv)
.option("--wall <colour>", optionDesc.imgColours.wallRead)
.option("--floor <colour>", optionDesc.imgColours.floorRead)
.option("--tolerance <percent>", optionDesc.imgParse.tolerancePercent)
.option("--size <number>", optionDesc.imgParse.tileSize)
.option("-x --start-x <number>", optionDesc.imgParse.originX)
.option("-y --start-y <number>", optionDesc.imgParse.originY)
.action(function (inpImagePath, inpWritePath, options)
{
	imageToGridMain.performCommand(inpImagePath, inpWritePath, options);
});


// absolute-to-relative <input-absolute> [output-path]
program
.command("absolute-to-relative <input-absolute> [output-path]")
.description(cmdDesc.absoluteToRelative)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.action(function (inpFilePath, inpWritePath, options)
{
	absoluteToRelativeMain.performCommand(inpFilePath, inpWritePath, options);
});


// grid-to-relative <input-grid> [output-path]
program
.command("grid-to-relative <input-grid> [output-path]")
.description(cmdDesc.gridToRelative)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.action(function (inpFilePath, inpWritePath, options)
{
	gridToRelativeMain.performCommand(inpFilePath, inpWritePath, options);
});



// grid-to-image <input-grid> [output-path]
program
.command("grid-to-image <input-grid> [output-path]")
.description(cmdDesc.gridToImage)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.txtParse)
.option("--wall <colour>", optionDesc.imgColours.wallWrite)
.option("--floor <colour>", optionDesc.imgColours.floorWrite)
.option("--size <number>", optionDesc.imgParse.tileSize)
.action(function (inpFilePath, inpWritePath, options)
{
	gridToImageMain.performCommand(inpFilePath, inpWritePath, options);
});




// image-to-relative <input-image> [output-path]
program
.command("image-to-relative <input-image> [output-path]")
.description(cmdDesc.imageToRelative)
.option("-r --replace", optionDesc.fileOutput.replace)
.option("-i --ignore-parse-errors", optionDesc.ignoreErr.imgParse)
.option("--load <path>", optionDesc.imgConfig.load)
.option("--save <path>", optionDesc.imgConfig.saveConv)
.option("--wall <colour>", optionDesc.imgColours.wallRead)
.option("--floor <colour>", optionDesc.imgColours.floorRead)
.option("--tolerance <percent>", optionDesc.imgParse.tolerancePercent)
.option("--size <number>", optionDesc.imgParse.tileSize)
.option("-x --start-x <number>", optionDesc.imgParse.originX)
.option("-y --start-y <number>", optionDesc.imgParse.originY)
.action(function (inpImagePath, inpWritePath, options)
{
	imageToRelativeMain.performCommand(inpImagePath, inpWritePath, options);
});

// test-export [pathfinding-mode]
program
.command("test-export [pathfinding-mode]")
.description(cmdDesc.testExport)
.option("-o --output-folder <path>", optionDesc.fileOutput.folder, ".")
.option("-g --graph", optionDesc.fileOutput.exportGraph)
.option("-r --raw", optionDesc.fileOutput.exportRaw)
.action(function (inpFindMode, options)
{
	testExportMain.performCommand(inpFindMode, options);
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