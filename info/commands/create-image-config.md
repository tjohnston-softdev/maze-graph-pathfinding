## create-image-config
**Usage:** `maze create-image-config [options] [output-path]`  
**Example:** `maze create-image-config ./result.json --wall #000000 --floor #FFFFFF`

Creates a configuration file that can be used when reading images.

**Options:**
| Argument | Description | Default |
|---|---|---|
| -r --replace | Specifies whether existing files will be replaced. | False |
| --wall | The hex colour of wall pixels in the input image. | #000000 |
| --floor | The hex colour of floor pixels in the input image. | #FFFFFF |
| --tolerance | The percentage difference allowed when checking image pixel colours. | 0 |
| --size | The size of a maze tile in pixels. | 10 |
| -x --start-x | The X location of the first tile. | 0 |
| -y --start-y | The Y location of the first tile. | 0 |


**Note:** If no path is specified, the config file will be created in the program folder named `image-config.json`

---

[Commands List](./readme.md)