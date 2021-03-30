const charShortcuts = require("../../../common/sub-output/char-shortcuts");


// This file writes object marker labels for Relative conversion output files.


// Marker label.
function writeMarkerLabel(cWriteStream, mLabelText)
{
	var resMarkerText = mLabelText + charShortcuts.lineBreak;
	cWriteStream.write(resMarkerText);
}


// Separator.
function writeSeparatorText(cWriteStream)
{
	var resSep = "";
	
	resSep += charShortcuts.lineBreak;
	resSep += charShortcuts.lineBreak;
	resSep += charShortcuts.divider;
	resSep += charShortcuts.lineBreak;
	resSep += charShortcuts.lineBreak;
	
	cWriteStream.write(resSep);
}



module.exports =
{
	writeLabel: writeMarkerLabel,
	writeSeparator: writeSeparatorText
};