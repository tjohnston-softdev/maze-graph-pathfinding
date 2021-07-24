# Changelog

**./src/input/arguments/image-options/hex-colour.js**
* Declared 'fullRegex' global variable.
	* Hex colour regular expression.
	* Copied from 'validator' library.
* Replaced 'validator.isHexColor' with 'fullRegex.test'
* Removed 'validator' requirement.
