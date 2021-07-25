# Changelog

**./src/common/sub-interface/option-text/op-img-colours.js**
* Renamed 'writeColourDesc' parameters:
	* 'pixelDesc' to 'vDesc'
	* 'defaultHex' to 'vDefault'
* Added 'vMode' parameter to 'writeColourDesc'
	* This refers to whether the image file is being read or written.
* Wrote new function 'handlePixelType'
	* Writes option description for different pixel types. (Wall and Floor)
	* Writes separate descriptions for input and output images.
* Rewrote 'defineOptionText' to use 'handlePixelType'
	* 'wallColour' is now 'wallRead'
	* 'floorColour' is now 'floorRead'
* Wrote option descriptions for 'grid-to-image' using this new structure.
	* wallWrite
	* floorWrite

---

**./maze.js**
* Replaced 'optionDesc' references:
	* 'imgColours.wallColour' with 'imgColours.wallRead'
	* 'imgColours.floorColour' with 'imgColours.floorRead'
* Added 'grid-to-image' option descriptions for:
	* --wall
	* --floor
