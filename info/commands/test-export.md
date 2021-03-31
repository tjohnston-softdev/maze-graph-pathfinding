## test-export
**Usage:** `maze test-export [options] [pathfinding-mode]`  
**Example:** `maze test-export astar -o ./result-folder -g -r

Used to test file output by exporting a hard-coded graph.

**Options:**
| Argument            | Description                                                          | Default                                            |
|---------------------|----------------------------------------------------------------------|----------------------------------------------------|
| -o --output-folder  | Specifies the folder path where output result files will be written. | Program folder                                     |
| -g --graph          | Indicates whether to export the resulting graph diagram.             | False                                              |
| -r --raw            | DESC                                                                 | Exports raw graph and path data to separate files. |

**Note:** The --graph and/or --raw options must be specified.

---

[Commands List](./readme.md)