// Grid tiles.

const wallTileChar = "X";					// Wall
const floorTileChar = ".";					// Floor
const nodeTileChar = "O";					// Node



// Replaces binary characters with floor tiles in a string.
function swapEntryTileCharacters(rString)
{
	var swapRes = rString;
	
	swapRes = swapRes.replace(/[0]/g, wallTileChar);
	swapRes = swapRes.replace(/[1]/g, floorTileChar);
	
	return swapRes;
}




module.exports =
{
	wallTile: wallTileChar,
	floorTile: floorTileChar,
	nodeTile: nodeTileChar,
	swapEntryCharacters: swapEntryTileCharacters
};