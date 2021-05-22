# Changelog

**./src/common/sub-traverse/errors/traverse-error-text.js**
* Wrote new functions:
	* writeNodeNumberDoesNotExistText
	* writeInvalidEdgeDirectionText
* Error text split from:
	* ./src/traverse/conv-plot/plot-edges.js

---

**./src/common/sub-traverse/traverse-error-display.js**
* Wrote new functions:
	* showUnknownNodeNumberErrorText
	* showInvalidEdgeDirectionErrorText
* Both of these functions correspond to 'traverseErrorText'

---

**./src/traverse/conv-plot/plot-edges.js**
* Added requirement:
	* ../../common/sub-traverse/traverse-error-display
* verifyNodeExists
	* Replaced 'loopObj.errorText' assignment with 'traverseErrorDisplay'
* chooseDirection
	* Removed the 'flaggedMessage' variable.
	* Replaced 'loopObj.errorText' assignment with 'traverseErrorDisplay'
