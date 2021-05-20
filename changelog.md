# Changelog

**./template/web-output/g-dynamic_all.js**
* Updated to match Cytoscape object schema.
	* resetEdgeHighlights
		* Before: `width = 1;`
		* After: `data.highlighted = false;`
	* highlightEdge
		* Replaced 'from' with 'data.source'
		* Replaced 'to' with 'data.target'
		* Replaced `width = 3;` with `data.highlighted = true;`
		* Renamed 'highlightRes' variable to 'connectionFound'
	* highlightChosenPath
		* Replaced the 'network.setData' call with 'cytoscapeGraph.json'
