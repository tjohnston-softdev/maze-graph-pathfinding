# Changelog

**./src/parsing/initialize-grid.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* Changes to 'performGridObjectInitialization'
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Replaced 'intlResult.pointsGraph' with `intlResult[1]`
