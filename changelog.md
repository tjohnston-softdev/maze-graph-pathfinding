# Changelog

**./src/grid-to-relative-main.js**
* Requirements:
	* Removed 'async'.
	* Added 'run-series'.
* executePreperationTasks
	* Declared 'readGridObject' variable. - Stores parsed input grid.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced 'series' property names with comments.
	* On success, 'readGridObject' is assigned with `prepTasksRes[2]`
	* Replaced 'prepTasksRes.readGridObject' with 'readGridObject'
* executeGraphTasks
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'graphResult' parameter from 'series' callback.
	* Renamed 'pArguments' parameter to 'pArgs'
