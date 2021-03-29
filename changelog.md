# Changelog

**./src/input/arguments/config-write/target-path.js**
* Wrote comments for IF structure in 'validateConfigWritePathString'
* Wrote header comment for 'preparePathString'

---

**./src/input/arguments/conversion/conv-path-object.js**
* Wrote comments for 'defineImageConfigProperties'

---

**./src/input/arguments/conversion/conv-path-prep.js**
* Added "Paths are the same." to 'validateIoPathsDifferent'

---

**./src/input/arguments/conversion/conv-write.js**
* Added comments to
	* IF structure in 'validateWriteFilePathString'
	* handleStringEntry

---

**./src/input/arguments/conversion/save-config.js**
* Added comments to:
	* IF structure in 'validateSaveConfigPathString'
	* handleStringEntry

---

**./src/input/arguments/general/graph-file-path.js**
* Added comments to:
	* prepareDestinationPaths
	* appendImageConfigSaveLoadPaths

---

**./src/input/arguments/general/input-path.js**
* Added comments to:
	* preparePathString
	* checkPathLength

---

**./src/input/arguments/general/output-folder.js**
* Added comments to:
	* validateOutputFolderPathString
	* handleStringEntry

---

**./src/input/arguments/general/pathfinding-mode.js**
* Added comments:
	* "Read string." to 'validatePathfindingModeString'
	* "Parse string into mode flag." to 'handleStringEntry'
	* "Too long." to 'checkModeLength'

---

**./src/input/arguments/image-options/image-config-name.js**
* Added comments to:
	* IF structure in 'validateSaveConfigNameString'
	* handleStringEntry
	* checkFileNameLength

---

**./src/input/arguments/image-options/image-config-path.js**
* Added comments to:
	* IF structure in 'validateLoadConfigPathString'
	* handleStringEntry

---

**./src/input/arguments/image-options/image-numbers.js**
* Added comments to IF structures.

---

**./src/input/arguments/image-components/config-file.js**
* Added comments to callback IF structures.
* Removed 'writeInvalidJsonText'
	* Error text is now inline (parseImageConfigContents)


