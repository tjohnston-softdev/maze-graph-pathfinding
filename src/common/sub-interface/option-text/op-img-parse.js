function defineOptionText()
{
	var defineRes = {};
	
	defineRes["tolerancePercent"] = "the percentage difference allowed when checking image pixel colours. (default: 0)";
	defineRes["tileSize"] = "the approximate size of a maze tile in pixels. (default: 10)";
	defineRes["imageOriginX"] = writeOriginDesc("x");
	defineRes["imageOriginY"] = writeOriginDesc("y");
	
	return defineRes;
}


function writeOriginDesc(oPlane)
{
	var writeRes = "";
	
	writeRes += "the approximate ";
	writeRes += oPlane;
	writeRes += " location of the first tile. ";
	writeRes += "(default: 0)";
	
	return writeRes;
}


module.exports = defineOptionText();