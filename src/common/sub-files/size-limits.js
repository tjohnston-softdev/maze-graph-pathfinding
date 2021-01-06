// Defines the maximum size for input files of a particular type.


// Uses base-1000 (eg. 1000KB = 1MB)
const sizeBaseFactor = 1000;
const kbBytes = sizeBaseFactor;
const mbBytes = kbBytes * sizeBaseFactor;


// Calculates the maximum size of each file type in bytes
const templateMaxSize = kbBytes * 20;														// HTML template files
const textInputMaxSize = mbBytes * 10;														// Input text files
const imageConfigMaxSize = kbBytes * 5;														// Input image config files (JSON)
const imageFileMaxSize = mbBytes * 20;														// Input image files


// Creates size definition objects.
const maxTemplateSizeObject = defineSizeObject(templateMaxSize, "20KB");
const maxTextSizeObject = defineSizeObject(textInputMaxSize, "10MB");
const maxImageConfigSizeObject = defineSizeObject(imageConfigMaxSize, "5KB");
const maxImageFileSizeObject = defineSizeObject(imageFileMaxSize, "20MB");



function defineSizeObject(vSize, vLabel)
{
	var defineRes = {"maxBytes": vSize, "descLabel": vLabel};
	return defineRes;
}



module.exports =
{
	maxTemplateSize: maxTemplateSizeObject,
	maxTextSize: maxTextSizeObject,
	maxImageConfigSize: maxImageConfigSizeObject,
	maxImageFileSize: maxImageFileSizeObject
};