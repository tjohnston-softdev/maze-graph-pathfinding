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


// Unknown node number.
function showUnknownNodeNumberErrorText(tgtNodeNumber, traverseResult)
{
	traverseResult.errorText = traverseErrorText.writeNodeNumberDoesNotExist(tgtNodeNumber);
}


// Invalid edge direction.
function showInvalidEdgeDirectionErrorText(edgeOrigin, edgeDest, traverseResult)
{
	traverseResult.errorText = traverseErrorText.writeInvalidEdgeDirection(edgeOrigin, edgeDest);
}



module.exports =
{
	showBadNodePositionError: showBadNodePositionErrorText,
	showMissingNodeLocationError: showMissingNodeLocationErrorText,
	showMissingCellError: showMissingCellErrorText,
	showUnknownNodeNumberError: showUnknownNodeNumberErrorText,
	showInvalidEdgeDirectionError: showInvalidEdgeDirectionErrorText
};