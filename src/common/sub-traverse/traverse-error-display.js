const trErrorTxt = require("./errors/tr-error-txt");


// Cannot add node at given position.
function showBadNodePositionErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = trErrorTxt.writeNodeBadPosition(tgtRowIndex, tgtColIndex);
}


// Missing node tile.
function showMissingNodeLocationErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = trErrorTxt.writeMissingNodeCoordinates(tgtRowIndex, tgtColIndex);
}


// Missing grid cell.
function showMissingCellErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = trErrorTxt.writeMissingCell(tgtRowIndex, tgtColIndex);
}



module.exports =
{
	showBadNodePositionError: showBadNodePositionErrorText,
	showMissingNodeLocationError: showMissingNodeLocationErrorText,
	showMissingCellError: showMissingCellErrorText
};