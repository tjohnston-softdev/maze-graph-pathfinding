# Changelog

**./src/common/sub-output/graph-elements.js**
* Wrote new function 'setNodeBlockStatus'
	* Appends 'blocked' property to node object.
	* Used when searching for blocked nodes.
	* Called publicly as 'setNodeBlocked'

---

**./src/output/file-write/graph-steps/graph-definition.js**
* handleBlockNodeArray
	* Removed `currentNode.blocked === true` IF structure.
	* Added 'graphElements.setNodeBlocked' call.
	* Removed blank 'currentLine' assignment.
