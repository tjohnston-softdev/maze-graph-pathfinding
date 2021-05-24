# Changelog

**./templates/web-output/f-graph.js**
* Restored 'cytoscapeGraph.layout'
	* Preset layout will be applied by default.
	* Can be overridden with relative CoSE layout.

---

**./templates/layouts/absolute.js**
* Deleted file.

---

**./templates/layouts/relative.js**
* Moved to '../web-output/relative-layout.js

---

**./templates/layouts/readme.md**
* Placeholder file - This folder will be deleted.

---

**./stored-paths.js**
* Removed variables:
	* layoutFolder
	* absolutePathString
	* relativePathString
* Declared new public variable 'relativeLayoutPathString'

---

**./src/output/file-write/graph-steps/layout-definition.js**
* readLayout
	* Renamed to 'readRelativeLayout'
	* Removed 'layoutPath' parameter.
	* Replaced 'layoutPath' reference with 'storedPaths.relativeLayoutPath'
	* Changed error description from "Layout" to "Relative Layout"
* writeGraphStructure
	* If 'fullGraphObject.absolutePositions' is true, skip layout.
	* Otherwise, call 'readRelativeLayout'
* Changed location file path.
