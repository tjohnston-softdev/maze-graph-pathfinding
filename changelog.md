# Changelog

**./templates/web-output/f-graph.js**
* Greatly reduced increment when zooming graph.
	* Set `wheelSensitivity` to 0.1
	* When zooming the graph, each click of the mouse wheel is 10%
* Added 'zoom' event
	* Displays current viewport zoom to console.
	* 1 = 100%
* Changes to node 'mouseover' event.
	* The tooltip will only be shown if the graph is zoomed out far enough. (Less than 0.5)
	* This is completely independent of whether the node text is shown (Hidden at around 0.4)
	* Tracked using the 'zoomLevel' variable.
