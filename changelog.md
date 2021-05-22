# Changelog

**./templates/web-output/c-styling.html**
* `#graphContainer` is hidden by default.
* Added `#graphInfo` selector. It is hidden by default.
* Added `#loadContainer` selector.
	* Automatic margin
	* 5% width.
	* 10px padding.
	* Centred horizontally and vertically.
* Added loading spinner CSS - Uses these selectors:
	* `.loadSpinner`
	* `@keyframes spin`
* Added reference comment: "Load spinner CSS from W3Schools"

---

**./templates/web-output/d-body.html**
* Added elements for loading spinner.
	* Parent \<div\> 'loadContainer' centres the spinner element.
	* Child \<div\> 'loadSpinner' contains the spinner itself.
	* Pure CSS without any external images.

---

**./templates/web-output/f-graph.js**
* Wrote new function 'displayGraph'
	* Displays graph elements after loading.
	* Hides loading spinner.
* When the Cytoscape 'ready' event is triggered, 'displayGraph' is called.

---

**./templates/web-output/spinner.md**
* New file - References loading spinner CSS source.

---

**./src/output/file-write/graph-steps/graph-body.js - handleGraphWidget**
* Changed "Line break." comment to "Line break before graph."
* Added the following after the graph container:
	* Line break.
	* 'loadContainer' and 'loadSpinner' \<div\> elements.
