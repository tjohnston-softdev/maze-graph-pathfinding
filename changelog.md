# Changelog

**./src/output/file-clean/conversion-clean.js**
* Renamed public exports:
	* 'removeTextConversion' to 'removeTextFiles'
	* 'removeImageConversion' to 'removeImageFiles'
* Affected files:
	* ../res-ctrl-txt-conv.js
	* ../res-ctrl-img-conv.js

---

**./src/output/file-clean/image-config-clean.js**
* Renamed public export:
	* 'removeCreatedImageConfig' to 'removeFile'
* Affected file:
	* ../res-ctrl-img-config.js

---

**./src/output/file-write/**
* Changed public function names to 'performExport' where applicable:
	* performFileExport
	* performGraphExport
	* performRawDataExport
* Affected files:
	* ../res-ctrl-img-conv.js
	* ../res-ctrl-txt-conv.js
	* ../res-ctrl-img-graph.js
	* ../res-ctrl-txt-graph.js

---

**./src/output/file-write/conversion-steps/**
* Reduced whitespace above 'module.exports'
* Affected files:
	* graph-edge-coordinates.js
	* relative-start-end.js

---

**./src/output/file-write/raw-data-steps/path-data.js**
* Reduced whitespace above 'module.exports'

---

**./src/output/create-grid-image.js**
* Revised header comment to clarify overall usage.
