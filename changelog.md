# Changelog

**./src/output/res-ctrl-txt-graph.js**
* Removed 'async' module requirement.
* Required 'run-series' module.
* callOutputTasks
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'outputRes' parameter from series callback.
* handleTextFileClean
	* Removed 'cleanRes' parameter from callback.

---

**./src/output/res-ctrl-img-graph.js**
* Removed 'async' module requirement.
* Required 'run-series' module.
* callOutputTasks
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'outputRes' parameter from series callback.
* handleImageFileClean
	* Removed 'cleanRes' parameter from callback.
	* Added "Error is displayed regardless." comment.

---

**./src/output/res-ctrl-img-conv.js**
* Removed 'async' module requirement.
* Required 'run-series' module.
* Changes to 'call_____OutputTasks' functions:
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'saveRes' parameter from series callback.
* Changes to 'handleImageConversionFileClean'
	* Removed 'cleanRes' parameter from callback.
	* Added "Error is displayed regardless." comment.

---

**./src/output/file-write/raw-data-export.js**
* Removed 'async' module requirement.
* Required 'run-series' module.
* Changes to 'coordinate_____Export' functions:
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'mResult' parameter from callback.

---

**./src/output/file-write/graph-file-export.js**
* Removed 'async' module requirement.
* Required 'run-series' module.
* Changes to 'compile__________' functions:
	* Replaced 'asyncModule.series' with 'series'
	* Removed 'compileRes' parameter from callback.
