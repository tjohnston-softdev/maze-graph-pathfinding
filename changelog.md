# Changelog

**./src/absolute-grid-main.js**
* Requirements:
	* Removed 'async'.
	* Added 'run-series'.
* executePreperationTasks
	* Declared 'readAbsoluteObject' variable - Stores parsed grid.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaces 'series' property names with comments.
	* On success, 'readAbsoluteObject' is assigned with `prepRes[2]`
	* Replaced 'prepRes.readAbsoluteObject' with 'readAbsoluteObject'
* executeGraphTasks
	* Declared 'preparedGrid' variable - Stores converted grid object.
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaces 'series' property names with comments.
	* On success, 'preparedGrid' is assigned with `graphTasksRes[1]`
	* Replaced 'graphTasksRes.preparedGrid' with 'preparedGrid'
