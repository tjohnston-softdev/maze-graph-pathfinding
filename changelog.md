# Changelog

**./src/input/load-image-config.js**
* Removed 'async' requirement.
* Added 'run-series' requirement.
* Changes to 'callFileRead'
	* Replaced 'asyncModule.series' with 'series'
	* 'series' now returns an array instead of an object.
	* Declared 'retrievedConfig' variable - Will store results of 'configFile.readConfig'
	* Added 'retrievedConfig' argument to 'configFile.readConfig' call.
	* Replaced 'cReadRes.configFileData' with 'retrievedConfig.data'

---

**./src/input/image-components/config-file.js - readImageConfigFile**
* Added 'cMemory' parameter.
	* Retrieved data will be written into this object.
	* Passed as reference.
* On successful result:
	* 'cMemory.data' is assigned with 'rData'
	* Callback returns `true`
