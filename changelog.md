# Changelog

**./src/absolute-to-relative-main.js**
* Requirements:
	* Removed 'async'.
	* Added 'run-series'.
* executePreperationTasks
	* Declared 'readAbsoluteObject' variable. - Stores parsed absolute graph.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced 'series' property names with comments.
	* On success, 'readAbsoluteObject' is assigned with `prepRes[2]`
	* Replaced 'prepRes.readAbsoluteObject' with 'readAbsoluteObject'
* executeGraphTasks
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'graphTasksRes' parameter from series callback
