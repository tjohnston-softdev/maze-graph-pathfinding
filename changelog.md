# Changelog

### ./src/common/sub-output/graph-elements.js

**defineNodeElementObject**
* Restructured object to fit 'Cytoscape' node schema.
	* Properties are encapsulated inside a 'data' object.
* Removed result properties:
	* label
	* fixed
	* borderWidth
	* color
	* color.background
	* color.border
* Added 'typeFlag' result property.
	* Refers to whether the node is a start or end point.
	* They are styled accordingly using the web output.
	* It is not hard-coded during file generation like with 'vis.js'

\
**defineEdgeElementObject**
* Restructured object to fit 'Cytoscape' node schema.
	* Properties are encapsulated inside a 'data' object.
* Renamed result properties:
	* 'from' = 'source'
	* 'to' = 'target'
	* 'title' = 'distance'
* Removed result properties:
	* id
	* width
	* color
	* font
	* smooth
	* font.align
	* smooth.enabled
* Added 'highlighted' result property.
	* Refers to whether the edge will be highlighted when the graph is first rendered.
	* This refers to highlighting edges on the chosen route.

\
**Removed**
* Functions:
	* setNodeNumberTextLabel
	* setNodeTargetAttributes
	* setNodeBlockedColourAttribute
	* setEdgeHighlightAttributes
* Globals:
	* defaultNodeColour
	* startNodeColour
	* endNodeColour
	* blockedNodeColour
	* edgeColour
	* defaultWeight
	* targetWeight

\
**Comments**
* Removed "Border width"
* Changed "vis.js" to "cytoscape.js"

---

### ./src/output/file-write/graph-steps/graph-definition.js

**handleCommonNodeArray**
* Removed calls:
	* graphElements.setNodeNumberLabel
	* graphElements.setNodeTarget
* Removed "Reads node object." comment.

\
**handleEdgeArray**
* Removed the 'graphElements.setEdgeHighlight' call.
* Removed "Reads current edge object." comment.
* Edge highlighting is not set for some reason.

---

### ./templates/web-output/f-graph.js

**Style**
* Blocked nodes will now have their number label removed.
	* They are just Grey circles now.
* Highlighted edges will have a thicker line.
	* Set to 3pt for now.
	* `"width": 3`
* Changed 'line-width' property to 'width'
* Edge line widths are now rendered correctly.
