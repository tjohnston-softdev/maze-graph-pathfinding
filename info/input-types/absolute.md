# Absolute Text File
An absolute text file defines a graph by using absolute coordinates on a 2D grid. Any found coordinates are interpreted as nodes and linked together accordingly.

---

##### Rules:
* Coordinates are written in the format "Y,X" or "Row,Column" (eg. "1,2")
* Lines beginning with "start" will be read as the start coordinates field. Must use the format: "start: 1,1"
* Lines beginning with "end" will be read as the end coordinates.
* Lines beginning with numbers will be interpreted as an edge between coordinates. Nodes will be created dynamically. Must use the format: "1,2 - 3,4"
* Other lines will be ignored safely. This means you can include additional information such as "Grid Size: 5x5"

---

#### Example:
```
Start: 2,1
End: 10,11
---
2,1 - 2,2
2,2 - 8,2
8,2 - 10,2
10,2 - 10,4
8,2 - 8,4
8,4 - 4,4
4,4 - 4,6
4,6 - 6,6
4,6 - 2,6
2,2 - 2,6
2,6 - 2,8
2,8 - 2,10
2,8 - 6,8
6,8 - 6,10
6,10 - 4,10
6,10 - 10,10
10,10 - 10,11
8,4 - 8,6
8,6 - 8,8
8,6 - 10,6
10,6 - 10,10
```

---

[Input Types List](./readme.md)