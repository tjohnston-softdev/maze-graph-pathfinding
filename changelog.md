# Changelog

**./maze.js**
* Added requirement for './src/absolute-to-grid-main'
* Added new command 'absolute-to-grid'
	* Converts absolute input file to grid input file.

---

**./src/common/sub-interface/cmd-desc.js**
* Defined new function 'writeGridConversionDesc'
	* Writes description for `<input>-to-grid` commands.
	* Replaces 'writeImageToGridDesc'
* Changed 'imageToGridDesc' variable assignment to use 'writeGridConversionDesc'
* Declared new variable 'absoluteToGridDesc'
	* Assigned using 'writeGridConversionDesc'

---

**./src/absolute-to-grid-main.js**
* New file - Main script for the 'absolute-to-grid' command.

---

**./src/input/conversion-entry-validation.js**
* Wrote new function 'readAbsoluteToGridArguments'
	* Validates arguments for the 'absolute-to-grid' command.

---

**./src/traverse/absolute-grid-map.js**
* New file - Coordinates grid mapping from Absolute graph.

---

**./src/traverse/conv-plot/**
* New folder - Contains secondary functionality to help map grids from absolute graphs.
	* 'plot-dimensions.js' - Calculates dimensions and initializes blank grid.
	* 'plot-nodes.js' - Adds floor tiles to grid based on node positions.
	* 'plot-edges.js' - Adds floor tiles between nodes based on edge paths.

---

**./src/output/res-ctrl-txt-conv.js**
* Required './file-write/grid-conversion-export'
* Wrote new function 'callAbsoluteToGridOutputTask'
	* Outputs Grid file after being converted from absolute input.
