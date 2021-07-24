# Changelog

**./src/map-relative-main.js**
* Requirements:
	* Removed 'async'.
	* Added 'run-series'.
* executePreperationTasks
	* Declared 'parsedGraphObject' variable.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On success, 'parsedGraphObject' is assigned with `prepTaskRes[2]`
	* Replaced 'prepTaskRes.parsedGraphObject' with 'parsedGraphObject'
* executeGraphStructureTasks
	* Declared 'heuristicsValid' variable.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On success, 'heuristicsValid' is assigned with `structureRes[1]`
	* Replaced 'structureRes.heuristicsValid' with 'heuristicsValid'
* executePathfindingTasks
	* Declared 'pathfindObject' variable.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On success, 'pathfindObject' is assigned with `pathRes[0]`
	* Replaced 'pathRes.pathfindObject' with 'pathfindObject'
