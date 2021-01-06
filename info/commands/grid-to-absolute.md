## grid-to-absolute
**Usage:** `maze grid-to-absolute [options] <input-grid> [output-path]`
**Example:** `maze grid-to-absolute ./examples/grid/input.txt ./output.txt -r`

Takes an existing Grid definition text file, parses it into a graph, and outputs an Absolute definition text file.

**Options:**
| Argument | Description | Default |
| --- | --- | --- |
| -r --replace | Specifies whether existing files will be replaced. | False |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input text files. | False |

**Note:** If no output path is specified, the output file will be created in the program folder named `absolute.txt`

---

[Commands List](../command-root.md)