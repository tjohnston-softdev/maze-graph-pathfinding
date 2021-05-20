# Changelog

**Edge Highlighting**
* Now applied properly for Cytoscape graphs.
* The glitch was that the precompiled graph's edges were not highlighted properly.
* Mapped graph files appear to have been unaffected.

---

**./src/pathfinding/route-precompiled.js**
* Modified 'edgeStatus.setHighlights' call arguments.
	* Before: 'compiledObject.graphData'
	* After: 'compiledObject.graphData.edgeList'
