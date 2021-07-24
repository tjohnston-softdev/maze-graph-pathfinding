# Changelog

**./src/map-grid-main.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* executePreperationTasks
	* Declared 'readGridObject' variable. - Stores parsed grid.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On success, 'readGridObject' is assigned with `prepRes[2]`
	* Replaced 'prepRes.readGridObject' with 'readGridObject'
* executeGraphTasks
	* Declared 'pathfindObject' variable. - Stores pathfinding result.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On success, 'pathfindObject' is assigned with `graphResult[2]`
	* Replaced 'graphResult.pathfindObject' with 'pathfindObject'
