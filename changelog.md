# Changelog

**./src/grid-to-absolute-main.js**
* Requirements:
	* Removed 'async'.
	* Added 'run-series'.
* executePreperationTasks
	* Declared 'readGridObject' variable. - Stores parsed input grid.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced 'series' property names with comments.
	* On success, 'readGridObject' is assigned with `prepRes[2]`
	* Replaced 'prepRes.readGridObject' with 'readGridObject'
* executeGraphTasks
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'graphResult' parameter from 'series' callback.
