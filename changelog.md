# Changelog

**./src/output/file-write/graph-steps/path-definition.js**
* Removed the 'handleClosingText' function.
* handleResultClose
	* Split the additional line breaks into their own function 'handlePathBreak'
	* 'resCloseTxt' is now written on one line.
* Added calls to 'handlePathBreak' at the end of these functions:
	* writeSinglePathDefinition
	* writeMultiplePathDefinition
	* writeBlockPathDefinition
	* writeBlankPathDefinition
