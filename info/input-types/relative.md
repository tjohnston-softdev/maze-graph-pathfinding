# Relative Text File
A relative text file defines a graph by manually entering the node and edge details rather than using absolute coordinates. This input type is named so because the nodes do not have fixed locations. They are placed relative to each other using edges.

---

##### Rules:
* Lines beginning with "node" or "edge" will tell the program to start interpreting number lines as the respective object definition.
* Lines beginning with numbers will be interpreted as the current object definition. If a type has not been declared, it will be ignored.
* Node definitions use the format `<ID>, [Heuristic]`
	* Heuristics are only used with A*Star pathfinding.
* Edge definitions use the format: `<Origin Node ID>, <Destination Node ID>, <Edge Distance>`
* Lines beginning with "start" will be read as the start node ID. This must use the format: "start: 1"
* Lines beginning with "end" will be read as the end node ID.
* The Start and End nodes must already exist. Those lines should be placed after definitions.
* In order to use A*Star, all nodes must have heuristic values.
* Other lines will be ignored safely.

---

#### Example:
```
NODES:
1,10
2,9
3,7
4,8
5,8
6,6
7,3
8,6
9,4
10,4
11,3
12,6
13,0

---

EDGES:
1,4,3
1,2,7
1,3,2
2,3,3
4,12,2
2,5,4
5,3,4
5,6,5
3,8,1
6,8,3
8,7,2
7,13,2
13,11,5
9,11,4
10,11,4
12,9,4
12,10,4
9,10,6

---

Start: 1
End: 13
```

---

[Input Types List](./readme.md)