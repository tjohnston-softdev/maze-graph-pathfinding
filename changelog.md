# Changelog

**./src/read-image-config-main.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* Changes to 'executeReadTasks'
	* Replaced 'asyncModule.series' with 'series'
	* 'series now returns an array instead of an object.
	* Removed 'readTaskRes' parameter from 'series' callback.
	* Replaced task property names with comments.
