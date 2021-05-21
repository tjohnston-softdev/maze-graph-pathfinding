# Changelog

**./src/absolute-to-grid-main.js**
* Added requirement for './parsing/binary-grid'
* executeTileConversion
	* New function - Calls 'binaryGrid' requirement.
	* Converts grid tiles from symbol to binary characters.
* executeGraphTasks
	* Renamed 'parsedGraph' parameter to 'parsedGraphObj'
	* Moved 'resultControl' call to 'executeTileConversion'
	* 'executeTileConversion' is called if successful.

---

**./src/traverse/conv-plot/plot-dimensions.js - initializeBlankGrid**
* Changed how grid dimensions are calculated.
	* Rather than using the exact dimension values, the largest of the two is used for both.
	* For example, if the absolute graph upper limits are 15 and 18, the grid will be 18x18
	* Grids will always be an even square.
