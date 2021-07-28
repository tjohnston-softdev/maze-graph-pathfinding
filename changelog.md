# Changelog

**./templates/web-output/f-graph.js**
* Added missing comma when setting 'wheelSensitivity' property.
* Wrote new function 'setInitialView'
	* Position set to start node, offset by 300x250
	* Called during 'cytoscapeGraph.ready'
* Should work for all graph sizes.
