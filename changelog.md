# Changelog

**./maze.js**
* Added requirement for './src/grid-to-image-main'
* Implemented 'grid-to-image' command.

---

**./src/grid-to-image-main.js**
* New file - Script for the 'grid-to-image' command.

---

**./src/common/sub-input/default-values.js**
* Added 'imgConversionPathString' property.
	* Default output path for 'to-image' conversion commands.
	* Assumes `.png` file type.
	* Called publicly as 'imgConversionPath'

---

**./src/sub-interface/spin-text/st-img-opts.js**
* New file - Stores spinner text for validating image options.

---

**./src/input/conversion-entry-validation.js**
* Wrote new function 'readGridToImageArguments'
	* Validates common input for the 'grid-to-image' command.
	* While some image items will be included, they are not involved here.
	* Called publicly as 'readGridToImage'

---

**./src/input/image-options-validation.js**
* Added requirement: '../common/sub-interface/spin-text/st-img-opts' (spinText)
* Moved spinner text from 'prepareImageOptionArguments' into 'spinText'
* Split 'hexColour.validateHexColour' calls to their own functions:
	* handleWallValidation
	* handleFloorValidation
* Wrote functions to validate image-related arguments for 'grid-to-image'
	* 'prepareImageOutputArguments' - Main
	* 'coordinateOutputValidation' - Secondary
	* Uses similar structure to before.
* 'prepareImageOutputArguments' is called publicly as 'prepareOutputArguments'

---

**./src/output/create-grid-image.js**
* New file - Used to create images from grids.

---

**.gitignore**
* Added '/image.png' - Default 'grid-to-image' output file name.
