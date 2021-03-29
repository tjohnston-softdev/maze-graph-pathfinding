# Changelog

**./src/common/sub-files/stream-exceptions.js**
* Corrected typo in 'getFolderCreateErrorText'
	* 'prefixRegex' to 'prefixSyntax'

---

**./src/common/sub-parse/line-types.js**
* Removed 'numberBegin' RegEx.
	* Now used locally in 'checkNumberLineType'

---

**./src/common/sub-parse/tile-set.js**
* Removed RegEx variables
	* entryWalls
	* entryFloor
* RegEx are now used locally in 'swapEntryTileCharacters'

---

**./src/common/value-prep.js**
* Removed "Captures whitespace." comment.
