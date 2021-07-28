# Changelog

**./templates/web-output/f-graph.js - exportGraphImage**
* Changed output mode from 'blob' to 'blob-promise'
	* Reduces browser freeze during image export.
* 'preparedURL' is declared as a blank string before 'cytoscapeGraph.png'
* 'cytoscapeGraph.png' is now called async using a Promise.
	* 'binaryData' is now the callback parameter instead of a local variable.
* 'cytoscapeGraph.png' callback:
	* Assign 'preparedURL'
	* Call 'window.open'
