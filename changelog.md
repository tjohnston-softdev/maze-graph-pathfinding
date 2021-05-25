# Changelog

**./templates/web-output/a-header.html**
* Added external scripts for Cytoscape tooltips:
	* popper.js
	* cytoscape-popper.min.js
	* tippy-bundle.iife.js

---

**./templates/web-output/f-graph.js**
* Wrote function 'addEdgeTooltip'
	* Defines tooltip data for a particular edge.
	* Displays distance between two nodes.
	* Uses 'popper.js' and 'tippy.js'
* Wrote new function 'prepareEdgeTooltips'
	* Loops graph edges to add tooltips.
	* Calls 'addEdgeTooltip' for each edge.
	* Called on 'cytoscapeGraph.ready'
* Adds edge hover events:
	* On entry, show distance tooltip.
	* On exit, hide tooltip.
* Added an extra blank line at the end of the file.

---

**./tooltips.html**
* Deleted file.
