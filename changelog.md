# Changelog

**maze.js**
* Added requirement for './src/absolute-to-relative-main'
* The `absolute-to-relative` command has been implemented.

---

**./src/common/sub-input/default-values.js**
* Declared new variable 'relativeConversionPathString'
	* Default output path when converting to Relative.

---

**./src/input/conversion-entry-validation.js**
* Wrote new function 'readTextToRelativeArguments'
	* Reads and validates arguments for these commands:
		* absolute-to-relative
		* grid-to-relative
	* Since both commands use the same arguments, they can be validated in the same way.

---

**./src/absolute-to-relative-main.js**
* New file. - Used to run the `absolute-to-relative` command.

---

**./src/parsing/automatic-heuristics.js**
* New file - Automatically calculates node heuristics.
* Used when converting graphs to Relative input.
* This is a stand-alone file. It does not rely on pathfinding.
* Normally, automatic heuristics are only used for A*Star pathfinding but it is necessary when converting to Relative so that the input can still use A*Star.

---

**./src/output/result-control.js**
* Added requirement for './file-write/relative-conversion-export'
* Wrote new function 'callAbsoluteGridToRelativeOutputTasks'
	* Coordinates output for the commands:
		* `absolute-to-relative`
		* `grid-to-relative`
	* Used to call 'relativeConversionExport'
* Changed 'handleTextConversionFileClean' header comment to refer to:
	* callGridToAbsoluteOutputTask
	* callAbsoluteGridToRelativeOutputTasks

---

**./src/output/file-write/**
* Updated 'headerInfo' call to use 'writeAbsoluteGridHeader' in the following files:
	* absolute-conversion-export.js
	* grid-conversion-export.js
* Created new file 'relative-conversion-export.js'
	* Exports graph data as a Relative definition text file.

---

**./src/output/file-write/conversion-steps/header-info.js**
* Renamed function:
	* **Before:** 'writeConversionFileHeaderInformation'
	* **After:** 'writeAbsoluteGridConversionHeader'
	* Changed header comment to "Main function - Absolute, Grid"
	* Called publicly as 'writeAbsoluteGridHeader'
* Appended to 'handleIntroSection' header comment:
	* "Writes Relative header"
* 'handleIntroSection' can be called publicly as 'writeRelativeHeader'

---

**./src/output/file-write/conversion-steps/relative-markers.js**
* New file - Writes marker text for Relative conversion output files.
	* *NODES:*
	* *EDGES:*

---

**./src/output/file-write/conversion-steps/relative-node-list.js**
* New file - Writes nodes for Relative conversion output files.

---

**./src/output/file-write/conversion-steps/relative-edge-list.js**
* New file - Writes edges for Relative conversion output files.

---

**./src/output/file-write/conversion-steps/relative-start-end.js**
* New file - Writes start and end points for Relative conversion output files.
