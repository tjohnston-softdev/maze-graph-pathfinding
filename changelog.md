# Changelog

**./src/common/sub-interface/cmd-desc.js**
* Added substring breaks to:
	* 'writeMapDesc' at "and performs..."
	* 'writeAbsoluteConversionDesc' at "and outputs..."
	* writeRelativeConversionDesc at "and outputs..."

---

**./src/common/sub-interface/option-desc.js**
* Split the text of these functions into substrings:
	* writeIgnoreParseDesc
	* writeOriginDesc
* Added substring break to 'writeColourDesc' at "(default:"
* Wrote new function 'writeSaveImageConvConfigDesc'
	* Used to assign global variable 'saveImageConvConfigDesc'
