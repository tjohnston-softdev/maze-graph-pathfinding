# Changelog

**./src/common/sub-output/graph-elements.js**
* Removed the 'highlightWeight' global variable.
* defineNodeElementObject
	* Created 'position' sub-object. - Contains node coordinates.
	* Removed 'data.x' and 'data.y' to 'position'

---


** ./templates/web-output/f-graph.js**
* Specified 'preset' layout.
	* Nodes are set to absolute positions.
* Blocked node styling will now only apply if 'blocked' is true.
