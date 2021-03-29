const traverseErrorText = require("./errors/traverse-error-text");


// Cannot add node at given position.
function showBadNodePositionErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = traverseErrorText.writeNodeBadPosition(tgtRowIndex, tgtColIndex);
}


// Missing node tile.
function showMissingNodeLocationErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = traverseErrorText.writeMissingNodeCoordinates(tgtRowIndex, tgtColIndex);
}


// Missing grid cell.
function showMissingCellErrorText(tgtRowIndex, tgtColIndex, traverseResult)
{
	traverseResult.errorText = traverseErrorText.writeMissingCell(tgtRowIndex, tgtColIndex);
}



module.exports =
{
	showBadNodePositionError: showBadNodePositionErrorText,
	showMissingNodeLocationError: showMissingNodeLocationErrorText,
	showMissingCellError: showMissingCellErrorText
};