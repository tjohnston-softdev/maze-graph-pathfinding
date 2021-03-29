# Changelog

**./src/parsing/actions/grid/grid-dimensions.js**
* 'rowCountValid' declaration and assessment are now on separate lines.
* Added comments:
	* "Validates row count."
	* "Validates column count."

---

**./src/parsing/actions/img/\*.js**
* Added comments to callback IF structure in 'img-open.js'
* Added "Read current row." comment to 'parseImagePixelsLoop' in 'img-pixels.js'

---

**./src/parsing/actions/txt/txt-grid.js**
* readCurrentLine
	* Merged `if (safeLength === true)` inline comments.
* addNewGridRow
	* Added header comment.
	* The following variables are now declared and assigned on separate lines:
		* safeRowCount
		* addPossible
	* Added comment "Checks if add is possible based on row count."

---

**./src/parsing/actions/txt/txt-relative.js handleEdgeDefinition**
* Added comments to the following:
	* `if (formatValid === true)`
	* `if (originValid === true)`
	* `if (destinationValid === true)`
	* `if (originFlagValid === true)`
* Changed existing comment in `if (keyNumbersDifferent === true)`
	* **Before:** "Check both edge nodes exist."
	* **After:** "Check origin node exists."


