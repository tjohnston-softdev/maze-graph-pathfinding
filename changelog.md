# Changelog

**./src/output/file-write/graph-steps/graph-body.js**
* Split 'handleGraphWidget' into different functions:
	* First "Seperator" to "Line break before graph." become 'handleInfoEnd'
	* "Graph container." and "Line break before loading spinner." are left as-is.
	* "Loading spinner containers." becomes 'handleLoadSpinnerWidget'
	* "End graph-body." becomes 'handleEndBody'
* Added calls to 'writeBodyText'
	* 'handleInfoEnd' before 'handleGraphWidget'
	* 'handleLoadSpinnerWidget' after 'handleGraphWidget'
	* 'handleEndBody' after 'handleLoadSpinnerWidget'
* Changed 'handleGraphWidget' header comment to refer to Cytoscape.
* Added header comments to these functions:
	* handleInfoEnd
	* handleLoadSpinnerWidget
	* handleEndBody
