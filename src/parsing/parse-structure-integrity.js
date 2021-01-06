const ora = require("ora");
const graphIntegrity = require("./actions/graph-integrity");


// Initiates graph integrity validation.
function performGraphObjectIntegrityCheck(inpGraphObject, integrityCheckCallback)
{
	var integritySpinner = ora("Verifying Graph Integrity").start();
	
	graphIntegrity.verifyParseIntegrity(inpGraphObject, function (chkError, chkRes)
	{
		if (chkError !== null)
		{
			integritySpinner.fail("Invalid Graph Integrity");
			return integrityCheckCallback(chkError, null);
		}
		else
		{
			integritySpinner.succeed("Graph Integrity Safe");
			return integrityCheckCallback(null, true);
		}
	});
	
}



module.exports =
{
	performGraphCheck: performGraphObjectIntegrityCheck
};