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
	
	coordinateInitialization(inpMatrixGrid, inpAllowMatrixTrim, function (gridIntlErr, gridIntlRes)
	{
		if (gridIntlErr !== null)
		{
			gridSpinner.fail("Grid Initialization Failed");
			return gridIntlCallback(gridIntlErr, null);
		}
		else
		{
			gridSpinner.succeed("Grid Initialized");
			return gridIntlCallback(null, gridIntlRes);
		}
	});
	
}



function coordinateInitialization(inpGrid, inpTrim, coordCallback)
{
	var retrievedGraph = null;
	
	series(
	[
		gridDimensions.verifyDimensions.bind(null, inpGrid, inpTrim),
		gridPoints.setEntryExit.bind(null, inpGrid)
	],
	function (intlErr, intlRes)
	{
		if (intlErr !== null)
		{
			return coordCallback(intlErr, null);
		}
		else
		{
			retrievedGraph = intlRes[1];
			return coordCallback(null, retrievedGraph);
		}
	});
}



module.exports =
{
	performIntl: performGridObjectInitialization
};