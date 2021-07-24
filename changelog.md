# Changelog

### ./src/map-image-main.js

**Requirements**
* Removed 'async' requirement.
* Added 'run-series' requirement.

\
**executePreperationTasks**
* Declared variables:
	* 'preparedColours' - Stores prepared target hex colours.
	* 'targetImageFile' - Stores input image file.
* Replaced 'asyncModule.series' with 'series'
* 'series' now returns an array instead of an object.
* Replaced property names with comments.
* On success:
	* 'preparedColours' is assigned with `prepRes[2]`
	* 'targetImageFile' is assigned with `prepRes[5]`
* Replaced 'prepRes.preparedColours' with 'preparedColours'
* Replaced 'prepRes.targetImageFile' with 'targetImageFile'

\
**executeImageReadTasks**
* Declared 'readGridObject' variable.
	* Stores parsed grid from image pixels.
* Replaced 'asyncModule.series' with 'series'
* 'series' now returns an array instead of an object.
* On success, 'readGridObject' is assigned with `imgReadRes[1]`
* Replaced 'imgReadRes.readGridObject' with 'readGridObject'

\
**executeGraphTasks**
* Declared 'pathfindObject' variable - Stores pathfinding result.
* Replaced 'asyncModule.series' with 'series'
* 'series' now returns an array instead of an object.
* Replaced property names with comments.
* On success, 'pathfindObject' is assigned with `graphTaskRes[2]`
* Replaced 'graphTaskRes.pathfindObject' with 'pathfindObject'
