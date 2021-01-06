// Grid tiles.

const entryWalls = /[0]/g;					// Zero Regex (Wall)
const entryFloor = /[1]/g;					// One Regex (Floor)

const wallTileChar = "X";					// Wall
const floorTileChar = ".";					// Floor
const nodeTileChar = "O";					// Node



// Replaces binary characters with floor tiles in a string.
function swapEntryTileCharacters(rString)
{
	var swapRes = rString;
	
	swapRes = swapRes.replace(entryWalls, wallTileChar);
	swapRes = swapRes.replace(entryFloor, floorTileChar);
	
	return swapRes;
}




module.exports =
{
	wallTile: wallTileChar,
	floorTile: floorTileChar,
	nodeTile: nodeTileChar,
	swapEntryCharacters: swapEntryTileCharacters
};