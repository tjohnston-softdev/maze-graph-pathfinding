# Changelog

**./templates/web-output/a-header.html**
* Switched graph library from 'vis' to 'cytoscape'
* Added viewport \<meta\> tag.

---

**./templates/web-output/b-data.html**
* Added tabs to comment lines.
* Restructured objects to comply with Cytoscape schemas.
	* Each node and edge is contained in an object under the 'data' property.
	* 'from' = 'source'
	* 'to' = 'target'
* While the nodes do have labels, they are not rendered yet.
* 'pathContents' is not affected by this change.

---

**./templates/web-output/f-graph.js**
* Modified rendering code to use Cytoscape.
	* This is only a basic implementation.
	* No layout, styling, or physics as of yet.
