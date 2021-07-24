# Changelog

**./src/map-absolute-main.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* executePreperationTasks
	* Declared 'parsedGraphObject' variable.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On successful result, 'parsedGraphObject' is assigned with `prepRes[2]`
	* Replaced 'prepRes.parsedGraphObject' with 'parsedGraphObject'
* executePathfindingTasks
	* Declared 'pathfindObject' variable.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced property names with comments.
	* On successful result, 'pathfindObject' is assigned with `pathRes[1]`
	* Replaced 'pathRes.pathfindObject' with 'pathfindObject'
