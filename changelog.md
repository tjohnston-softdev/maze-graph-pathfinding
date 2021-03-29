# Changelog

**./src/common/precompiled-graph/base-object.js**
* setNodeEntries
	* Removed "..." from 'etc' comment.
	* Removed "node" from the start and end comments.
* setTargetKeys
	* Replaced "indicies" with "index numbers" for comment.

---

**./src/common/precompiled-graph/append-properties.js**
* The header comments for these functions now only specify the algorithm name.
	* appendAstarNodeAttributes
	* appendAnyPossibleAttributes
	* appendBlockNodeAttributes
	* defineAstarAttributes
	* defineAnyPossibleAttributes
	* defineBlockAttributes
* 'defineDsktraAttributes' inline comments:
	* Reduced tab space
	* Removed "node"
* Removed inline comments for these functions:
	* defineAstarAttributes
	* defineAnyPossibleAttributes

---

**./src/common/precompiled-graph/edge-status.js**
* The header comments for these functions now only specify the algorithm name.
	* defineAstarEdgeHighlights
	* defineAnyPossibleEdgeHighlights

---

**./src/common/sub-graph/graph-objects.js**
* Added extra comments for 'checkNodeCoordinatesExist'

---

**./src/common/sub-input/number-format.js**
* Rewrote all comments.

---

**./src/common/sub-output/current-time.js**
* Added header comment to 'prepareCurrentTimestampString'

---

**./src/common/sub-parse/\*.js**
* Wrote comments for 'trimRowsToLength' in 'grid-help-tasks.js
* Wrote comments for functions in 'image-help-tasks.js'
	* checkImageDimensionNumbersValid
	* checkOriginPointCoordinatesExist
* Wrote comments for functions in 'parse-help-tasks.js'
	* checkSafeLineLengthNumber
	* checkAbsoluteNodeKeyNumbersDifferent
	* checkAbsoluteDistanceNumberValid
	* checkStartEndPointsDifferent
* Wrote comments for functions in 'relative-help-tasks.js'
	* checkSplitLineLength
	* checkNodeIDValid
	* checkNodeExistFlagValid
	* checkEdgeKeyNumbersDifferent

---

**./src/common/sub-pathfinding/**
* any-possible-tasks.js
	* Added loop end comment to 'findChoiceStartPoint'
	* Added "End not visited." comment to 'checkEndNodeReached'
* dsktra-help-tasks.js
	* Added "Unvisited." comment to 'checkEndNodeReached'

---

**Header Comments**
* Added function header comments for these files without any further changes
	* ./src/common/precompiled-graph/path-objects.js
	* ./src/common/sub-files/errors/file-error-text.js
	* ./src/common/sub-input/error-text.js
	* ./src/common/sub-input/export-paths.js
	* ./src/common/sub-parse/errors/*.js
	* ./src/common/sub-pathfinding/errors/path-error-text.js
	* ./src/common/sub-traverse/errors/tr-error-txt.js
