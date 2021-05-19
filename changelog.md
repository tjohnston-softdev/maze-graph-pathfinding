# Changelog

**./templates/web-output/b-data.html**
* Updated reference links to reflect 'Cytoscape.js'
* Updated retrieval date.
* Added 'graphStructure' variable.
	* Refers to Cytoscape layout.
	* Since this is a relative graph, this file assumes the relative layout.

---

**./relative-layout.json**
* Removed file.

---

**./src/output/file-write/graph-steps/path-definition.js**
* handleClosingText
	* Commented out calls
	* Copied to 'layout-definition.js'
* Expanded 'handleResultClose' to allow layout definition.

---

**./src/output/file-write/graph-steps/layout-definition.js**
* New file - Defines graph layout during file generation.

---

**./src/common/sub-parse/parse-objects.js - initializeParseResultsObject**
* Added parameter 'fixedLayout'
	* Indicates whether node positions are set.
	* This is true for all input types except 'Relative'
	* Corresponds to new result property 'absolutePositions'

---

**./src/common/precompiled-graph/base-object.js**
* Wrote new function 'setAbsolutePositionStatus'
	* Sets 'absolutePositions' property.

---

**./src/pathfinding/route-precompiled.js - retrievePrecompiledData**
* 'parseObjects.initializeResultObject' argument is null.
* Added call to 'baseObject.setAbsolutePosition'

---

**./src/parsing/actions/**
* Added argument to 'parseObjects.initializeResultObject' calls.
	* 'txt/txt-absolute.js' = true
	* 'txt/txt-relative.js' = false
	* 'grid/grid-points.js' = true

---

**./src/output/file-write/graph-file-export.js**
* Added requirement for './graph-steps/layout-definition'
* Added 'layoutDefinition.writeStructure' call to these functions:
	* compileShortestPath
	* compileAllPaths
	* compileBlocked
	* compileBlankPath

---

**./templates/web-output/f-graph.js**
* 'layout' property is set to 'graphStructure'
