## grid-to-absolute
**Usage:** `maze grid-to-image [options] <input-grid> [output-path]`  
**Example:** `maze grid-to-image ./examples/grid/input.txt ./output.png -r`

Takes an existing Grid definition text file and converts it to an image.

**Options:**
| Argument | Description | Default |
|---|---|---|
| -r --replace | Specifies whether existing files will be replaced. | False |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input text files. | False |
| --wall | The hex colour of wall pixels in the output image. | #000000 |
| --floor | The hex colour of floor pixels in the output image. | #FFFFFF |
| --size | The size of a maze tile in pixels. | 10 |


**Note:** If no output path is specified, the output file will be created in the program folder named `image.png`

---

[Commands List](./readme.md)