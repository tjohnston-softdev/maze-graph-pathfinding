# Changelog

**./src/common/precompiled-graph/append-properties.js**
* Renamed public exports:
	* 'appendDsktra' to 'dsktra'
	* 'appendAstar' to 'astar'
	* 'appendAnyPossible' to 'anyPossible'
	* 'appendBlock' to 'block'
* Affected file:
	* ../../pathfinding/route-precompiled.js

---

**./src/common/sub-files/errors/file-error-text.js**
* Renamed 'dText' parameter to 'vDesc' where applicable.
* Renamed 'writeFileSizeLimitError' parameters:
	* 'dFileText' to 'vFileDesc'
	* 'dSizeText' to 'vMaxSize'
* Renamed all result variables to 'writeRes'

---

**./src/common/sub-graph/find-edges.js**
* Renamed 'checkEdgeAvailable' export to 'checkAvailable'
* Affected files:
	* ../../parsing/actions/txt/txt-absolute.js
	* ../../parsing/actions/txt/txt-relative.js
	* ../../traverse/visit/mark-points.js

---

**./src/common/sub-graph/find-nodes.js**
* Renamed 'checkNodeNumberExists' export to 'checkIdExists'
* Affected files:
	* ../../output/file-write/conversion-steps/graph-edge-coordinates.js
	* ../../output/file-write/conversion-steps/relative-edge-list.js
	* ../../parsing/actions/txt/txt-relative.js
	* ../../pathfinding/modes/pth-any_possible.js
	* ../../pathfinding/modes/pth-astar.js
	* ../../pathfinding/modes/pth-dsktra.js
	* ../../traverse/conv-plot/plot-edges.js

---

**./src/common/sub-input/default-values.js**
* Restructured public exports to remove redundancy.

---

**./src/common/sub-output/____-shortcuts.js**
* Restructured public exports to remove redundancy.

---

**./src/common/sub-output/current-time.js**
* Renamed 'prepareCurrentTimestampString' to 'prepareTimestampString'

---

**./src/common/sub-output/graph-elements.js**
* Renamed public exports:
	* 'defineNodeElement' to 'defineNode'
	* 'defineEdgeElement' to 'defineEdge'
* Affected file:
	* ../../output/file-write/graph-steps/graph-definition.js

---

**./src/common/sub-parse/grid-help-tasks.js**
* Reduced whitespace between:
	* 'checkTargetPointLoopContinue' and 'trimRowsToLength'
	* 'trimRowsToLength' and 'module.exports'

---

**./src/common/sub-parse/image-help-tasks.js**
* Renamed public export:
	* 'checkImageDimensionsValid' to 'checkDimensions'
* Affected file:
	* ../../parsing/actions/img/img-dimensions.js

---

**./src/common/value-limits.js**
* Restructured public exports to remove redundancy.
