# Changelog

### ./src/image-to-absolute-main.js

**Requirements**
* Removed 'async'.
* Added 'run-series'.

\
**executePreperationTasks**
* Declared variables:
	* 'preparedColours' - Stores input colours in RGB.
	* 'targetImageFile' - Stores input image file.
* Replaced 'asyncModule.series' with 'series'
* 'series' now returns an array instead of an object.
* Replaced 'series' property names with comments.
* On success:
	* 'preparedColours' is assigned as `prepTaskRes[5]`
	* 'targetImageFile' is assigned as `prepTaskRes[6]`
* Replaced 'prepTaskRes.preparedColours' with 'preparedColours'
* Replaced 'prepTaskRes.targetImageFile' with 'targetImageFile'

\
**executeImageReadTasks**
* Declared 'readGridObject' variable. - Stores parsed grid object from image pixels.
* Replaced 'asyncModule.series' with 'series'
* 'series' now returns an array instead of an object.
* Replaced 'series' property names with comments.
* On success 'readGridObject' is assigned with `imageTaskRes[1]`
* Replaced 'imageTaskRes.readGridObject' with 'readGridObject'
* Renamed 'sIgnoreErrors' variable to 'sIgnore'
* Renamed parameters:
	* 'targetColoursObj' to 'tgtColsObj'
	* 'targetImageObj' to 'tgtImgObj'

\
**executeGraphTasks**
* Replaced 'asyncModule.series' with 'series'
* Removed 'graphTasksRes' parameter from 'series' callback.
