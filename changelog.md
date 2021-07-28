# Changelog

**./templates/web-output/f-graph.js**
* Wrote new functions:
	* 'prepareNodeTooltips' - Runs loop for preparing graph node tooltips.
	* 'addNodeTooltip' - Adds tooltip for current node.
* Added new events:
	* On node 'mouseover', show tooltip.
	* On node 'mouseout', hide tooltip.
* 'prepareNodeTooltips' is called during 'cytoscapeGraph.ready'
