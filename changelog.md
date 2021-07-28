# Changelog

**./templates/web-output/f-graph.js**
* Wrote new function 'exportGraphImage'
	* Exports graph to PNG image.
	* Uses the whole graph and not just the current view.
	* Opens in new tab.
	* Uses blocking code for now, so the browser will freeze when exporting larger graphs.

---

**./templates/web-output/d-body.html**
* Added "Export Image" button just below graph.
	* Calls 'exportGraphImage' in 'f-graph.js'

---

**./src/output/file-write/graph-steps/graph-body.js**
* Wrote new function 'handleExportButton'
	* Prepares export button HTML programmatically.
	* Called by 'writeBodyText' after 'handleLoadSpinnerWidget'
