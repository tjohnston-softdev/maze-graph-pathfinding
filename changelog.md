# Changelog

**./src/traverse/absolute-grid-map.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* Changes to 'carveGridPaths'
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'carvePathRes' parameter from series callback.
