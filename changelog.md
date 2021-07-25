# Changelog

**./src/common/sub-interface/option-desc.js**
* Added requirements for the files in the 'option-text' subfolder.
* Restructured file to export 'option-text' files as a single object.
	* This is handled using the 'combineOptionText' function.
	* Function result is exported.

---

**./src/common/sub-interface/option-text/**
* Files export 'defineOptionText' as a function, and not as the result.
	* Called publicly as 'defineText'

---

**./maze.js**
* Updated 'optionDesc' references to use new object structure.
