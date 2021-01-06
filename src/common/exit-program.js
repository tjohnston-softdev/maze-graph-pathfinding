/*
	* These functions are used to safely exit this program.
	* Based on: https://flaviocopes.com/node-terminate-program/
	* Retrieved: 2020-06-29
*/


function callProgramExit(exitMsg)
{
	// Error
	console.log(exitMsg);
	process.exitCode = 1;
}


function callProgramComplete()
{
	// Successful
	console.log("Complete");
	process.exitCode = 1;
}



module.exports =
{
	callExit: callProgramExit,
	callComplete: callProgramComplete
};