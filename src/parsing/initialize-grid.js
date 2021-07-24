const series = require("run-series");
const ora = require("ora");
const gridDimensions = require("./actions/grid/grid-dimensions");
const gridPoints = require("./actions/grid/grid-points");

/*
	This function is used to initialize graphs from parsed grid objects. It involves:
		* Validating grid dimensions
		* Searching for entry,exit points.
	This relates to both text and image files.
*/


function performGridObjectInitialization(inpMatrixGrid, inpAllowMatrixTrim, gridIntlCallback)
{
	var gridSpinner = ora("Initializing Grid").start();
	
	series(
	[
		gridDimensions.verifyDimensions.bind(null, inpMatrixGrid, inpAllowMatrixTrim),
		gridPoints.setEntryExit.bind(null, inpMatrixGrid)
	],
	function (intlError, intlResult)
	{
		if (intlError !== null)
		{
			gridSpinner.fail("Grid Initialization Failed");
			return gridIntlCallback(intlError, null);
		}
		else
		{
			gridSpinner.succeed("Grid Initialized");
			return gridIntlCallback(null, intlResult[1]);
		}
	});
	
}



module.exports =
{
	performGridInitialization: performGridObjectInitialization
};