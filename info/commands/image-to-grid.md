## image-to-grid
**Usage:** `maze image-to-grid [options] <input-image> [output-path]`
**Example:** `maze image-to-grid ./examples/image/small.png ./output.txt -r`

Takes an existing image file, parses it into a grid, and outputs it as a definition text file.

**Options:**
| Argument | Description | Default |
| --- | --- | --- |
| -r --replace | Specifies whether existing files will be replaced. | False |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input image files. | False |
| --load <path> | Specifies the file path of an existing image configuration file.  If this is blank, no file will be loaded. | |
| --save <name> | Specifies the name of a saved image configuration file.  If this is blank, no file will be saved. | |
| --wall <colour> | The hex colour of wall pixels in the target image. | #000000 |
| --floor <colour> | The hex colour of floor pixels in the target image. | #FFFFFF |
| --tolerance <percent> | The percentage difference allowed when checking image pixel colours. | 0 |
| --size <number> | The approximate size of a maze tile in pixels. | 10 |
| -x --start-x <number> | The approximate X location of the first tile. | 0 |
| -y --start-y <number> | The approximate Y location of the first tile. | 0 |

**Note:** If no output path is specified, the output file will be created in the program folder named `grid.txt`

---

[Commands List](../command-root.md)