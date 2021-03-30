# Changelog

**./src/absolute-to-relative-main.js**
* The `series` in 'executeGraphTasks' now uses an array instead of an object.
	* This saves space and makes the code more readable.
	* The result properties are not necessary in this batch.
