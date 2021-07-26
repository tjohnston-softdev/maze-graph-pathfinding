# Changelog

**./src/input/conversion-entry-validation.js**
* Renamed 'coordinateMainArguments' to 'coordinateMain'
* References to 'defaultValues._____ConversionPath' are now local variables in their respective functions.

---

**./src/input/image-colour-validation.js**
* Renamed functions:
	* 'performTargetColourConversion' to 'performColourConversion'
	* 'coordinateTargetColours' to 'coordinateColours'
* 'performColourConversion' is called publicly as 'convertColours'
* Affected files:
	* ../image-to-absolute-main.js
	* ../image-to-grid-main.js
	* ../image-to-relative-main.js
	* ../map-image-main.js
	* ../read-image-config-main.js

---

**./src/input/image-options-validation.js**
* Renamed functions:
	* 'prepareImageOptionArguments' to 'prepareImageGeneralArguments'
	* 'coordinateOptionValidation' to 'coordinateGeneralValidation'
* 'prepareImageGeneralArguments' is called publicly as 'prepareGeneral'
* Renamed 'prepareImageOutputArguments' public export.
	* Before: 'prepareOutputArguments'
	* After: 'prepareOutput'
* Affected files:
	* ../create-image-config-main.js
	* ../image-to-absolute-main.js
	* ../image-to-grid-main.js
	* ../image-to-relative-main.js
	* ../map-image-main.js
	* ../read-image-config-main.js
	* ../grid-to-image-main.js

---

**./src/input/arguments/conversion/save-config.js**
* Renamed 'validateSaveConfigPathString' to 'validateSavePathString'
	* Called publicly as 'validateSavePath'
* Affected file:
	* ../../conversion-entry-validation.js

---

**./src/input/arguments/general/test-export-flags.js**
* Renamed 'validateTestExportFlagsSet' public export.
	* Before: 'validateTestExportFlags'
	* After: 'validateFlags'
* Affected file:
	* ../../export-entry-validation.js

---

**./src/input/arguments/image-options/hex-colour.js**
* Renamed public exports:
	* 'validateHexColour' to 'validateString'
	* 'validateStringsDifferent' to 'validateDifferent'
	* 'prepareHex' to 'prepareString'
* Affected files:
	* ../../image-colour-validation.js
	* ../../image-options-validation.js
