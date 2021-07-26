# Changelog

**./src/parsing/binary-grid.js**
* Revised header comment to include both commands:
	* image-to-grid
	* grid-to-image

---

**./src/parsing/initialize-grid.js**
* Changed 'performGridObjectInitialization' public name.
	* Before: 'performGridInitialization'
	* After: 'performIntl'
* Affected files:
	* ../grid-to-absolute-main.js
	* ../grid-to-image-main.js
	* ../grid-to-relative-main.js
	* ../image-to-absolute-main.js
	* ../image-to-grid-main.js
	* ../image-to-relative-main.js
	* ../map-grid-main.js
	* ../map-image-main.js

---

**./src/parsing/manual-heuristics.js**
* Renamed:
	* 'performManualHeuristicValueCheck' function to 'performValueCheck'
	* 'performManualHeuristicCheck' export to 'performCheck'
* Affected file:
	* ../map-relative-main.js

---

**./src/parsing/parse-structure-integrity.js**
* Renamed export:
	* 'performGraphCheck' to 'performCheck'
* Affected files:
	* ../absolute-to-grid-main.js
	* ../absolute-to-relative-main.js
	* ../grid-to-absolute-main.js
	* ../grid-to-relative-main.js
	* ../image-to-absolute-main.js
	* ../image-to-relative-main.js
	* ../map-absolute-main.js
	* ../map-grid-main.js
	* ../map-image-main.js
	* ../map-relative-main.js
