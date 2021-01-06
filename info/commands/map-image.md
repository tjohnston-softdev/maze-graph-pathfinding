## map-image
**Usage:** `maze map-image [options] <input-path> [pathfinding-mode]`
**Example:** `maze map-image ./examples/image/small.png dsktra`

Takes an existing image file of a maze, converts it into an interactive diagram, and performs a pathfinding algorithm.

**Options:**
| Argument | Description | Default |
| --- | --- | --- |
| -o --output-folder <path> | Specifies the folder path where output result files will be written. | Program folder |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input image files. | False |
| -r --raw | Exports raw graph and path data to separate files. | False |
| --load <path> | Specifies the file path of an existing image configuration file.  If this is blank, no file will be loaded. | |
| --save <name> | Specifies the name of a saved image configuration file.  If this is blank, no file will be saved. | |
| --wall <colour> | The hex colour of wall pixels in the target image. | #000000 |
| --floor <colour> | The hex colour of floor pixels in the target image. | #FFFFFF |
| --tolerance <percent> | The percentage difference allowed when checking image pixel colours. | 0 |
| --size <number> | The approximate size of a maze tile in pixels. | 10 |
| -x --start-x <number> | The approximate X location of the first tile. | 0 |
| -y --start-y <number> | The approximate Y location of the first tile. | 0 |

---

[Commands List](../command-root.md)