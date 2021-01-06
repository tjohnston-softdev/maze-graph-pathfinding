/*
	* Options used when writing output files (fs.createWriteStream)
	* Based on: https://codeburst.io/node-js-fs-module-write-streams-657cdbcc3f47
	* Retrieved: 2020-07-10
*/


const streamSettingsObject =
{
	flags: "w",
	encoding: "utf8",
	autoClose: true,
	emitClose: true,
	start: 0
};


module.exports =
{
	streamSettings: streamSettingsObject
};