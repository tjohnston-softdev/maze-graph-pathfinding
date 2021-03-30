# Changelog

**maze.js**
* Added requirement for './src/image-to-relative-main'
* Implemented `image-to-relative` command.

---

**./src/image-to-relative-main.js**
* New file - Used to execute the `image-to-relative` command.

---

**./src/input/conversion-entry-validation.js**
* Wrote new function 'readImageToRelativeArguments'
	* Validates input for the `image-to-relative` command.
* Replaced 'saveNameValid' with 'loadSaveResolved' in 'coordinateImageItems'
	*  This fixes a reference error when validating image config paths for conversion commands.

---

**./src/output/result-control.js**
* Wrote new function 'callImageToRelativeOutputTasks'
	* Coordinates output for `image-to-relative`
