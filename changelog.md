# Changelog

**./src/test-export-main.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* Changes to 'executePreperationTasks'
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'prepRes' parameter from callback.
