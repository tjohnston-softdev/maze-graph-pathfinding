# Grid Text File
A grid text file is used to define a 2D grid which can be parsed into a graph. Each individual line is a row which consists of binary numbers that indicate whether a particular cell can be traversed.

---

##### Rules:
* Lines beginning with numbers are interprted as binary grid rows. While any number can be used, non-binary values will raise an error by default.
* Cells with the value '1' are the floor, while '0' values are walls.
* The maximum grid size is 500x500.
* Other lines will be ignored safely.

---

#### Example:
```
00000000000
11110111110
01000100010
01011111110
01010001000
01111101010
01010001010
01011101110
01000100010
01110111111
00000000000
```

---

[Input Types List](./readme.md)