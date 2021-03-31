## map-absolute
**Usage:** `maze map-absolute [options] <input-path> [pathfinding-mode]`  
**Example:** `maze map-absolute ./examples/absolute/input.txt dsktra`

Takes an absolute node graph text file, converts it into an interactive diagram, and performs a pathfinding algorithm.

**Options:**
| Argument                 | Description                                                          | Default        |
|--------------------------|----------------------------------------------------------------------|----------------|
| -o --output-folder       | Specifies the folder path where output result files will be written. | Program folder |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input text files.  | False          |
| -r --raw                 | Exports raw graph and path data to separate files.                   | False          |

---

[Commands List](./readme.md)