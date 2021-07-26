## absolute-to-relative
**Usage:** `maze absolute-to-relative [options] <input-absolute> [output-path]`  
**Example:** `maze absolute-to-relative ./examples/absolute/input.txt ./output.txt -r`

Takes an existing Absolute definition text file, parses it into a graph, and outputs a Relative definition text file.

**Options:**
| Argument | Description | Default |
|---|---|---|
| -r --replace | Specifies whether existing files will be replaced. | False |
| -i --ignore-parse-errors | Ignores or corrects non-fatal errors when parsing input text files. | False |


**Note:** If no output path is specified, the output file will be created in the program folder named `relative.txt`

---

[Commands List](./readme.md)