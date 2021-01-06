/*
	* This file takes an image settings object and converts into an output format.
	* This is done by changing the property names to those used by config files.
*/


function prepareConfigObject(internalObject)
{
	var externalRes = {};
	
	externalRes["wall"] = internalObject.wallColour;
	externalRes["floor"] = internalObject.floorColour;
	externalRes["tolerance"] = internalObject.tolerancePercent;
	externalRes["tileSize"] = internalObject.tileSize;
	externalRes["x"] = internalObject.originX;
	externalRes["y"] = internalObject.originY;
	
	return externalRes;
}



module.exports =
{
	prepareConfig: prepareConfigObject
};