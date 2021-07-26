## map-image
**Usage:** `maze map-image [options] <input-path> [pathfinding-mode]`  
**Example:** `maze map-image ./examples/image/small.png dsktra`

Takes an existing image file of a maze, converts it into an interactive diagram, and performs a pathfinding algorithm.

**Options:**
| Argument | Description | Default |
|---|---|---|
| -o --output-folder | Specifies the folder path where output result files will be written. | Program folder |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input image files. | False |
| -r --raw | Exports raw graph and path data to separate files. | False |
| --load | Specifies the file path of an existing image configuration file.  If this is blank, no file will be loaded. |  |
| --save | Specifies the name of a saved image configuration file.  If this is blank, no file will be saved. |  |
| --wall | The hex colour of wall pixels in the input image. | #000000 |
| --floor | The hex colour of floor pixels in the input image. | #FFFFFF |
| --tolerance | The percentage difference allowed when checking image pixel colours. | 0 |
| --size | The size of a maze tile in pixels. | 10 |
| -x --start-x | The X location of the first tile. | 0 |
| -y --start-y | The Y location of the first tile. | 0 |


---

[Commands List](./readme.md)