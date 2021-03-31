# Changelog

**./src/output/result-control.js**
* Split into different files, containing the respective functions:
	* res-ctrl-txt-graph.js
		* callTextGraphOutputTasks - Renamed to 'callOutputTasks'
		* handleTextFileClean
	* res-ctrl-img-graph.js
		* callImageGraphOutputTasks - Renamed to 'callOutputTasks'
		* handleImageFileClean
	* res-ctrl-txt-conv.js
		* callGridToAbsoluteOutputTask
		* callAbsoluteGridToRelativeOutputTasks - Renamed to '...OutputTask'
		* handleTextConversionFileClean
	* res-ctrl-img-conv.js
		* callImageToAbsoluteOutputTasks
		* callImageToGridOutputTasks
		* callImageToRelativeOutputTasks
		* handleImageConversionFileClean
	* res-ctrl-img-config.js
		* callCreateImageConfigOutputTasks - Renamed to 'callOutputTask'
		* handleCreateImageConfigFileClean
* This file is now empty except for requirements.

---

**./src/%command%.js**
* Removed './output/result-control' requirement and replaced with the respective split output file.
	* For example, in 'absolute-to-relative-main.js', the requirement is replaced with: './output/res-ctrl-txt-conv'
	* The requirement variable itself is only renamed where there is ambiguity.
