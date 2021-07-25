// Option description text.

const opIgnoreErr = require("./option-text/op-ignore-err");
const opImgColours = require("./option-text/op-img-colours");
const opImgConfig = require("./option-text/op-img-config");
const opImgParse = require("./option-text/op-img-parse");
const opOutput = require("./option-text/op-output");


function combineOptionText()
{
	var combineRes = {};
	
	combineRes["ignoreErr"] = opIgnoreErr.defineText();
	combineRes["imgColours"] = opImgColours.defineText();
	combineRes["imgConfig"] = opImgConfig.defineText();
	combineRes["imgParse"] = opImgParse.defineText();
	combineRes["fileOutput"] = opOutput.defineText();
	
	return combineRes;
}



module.exports = combineOptionText();