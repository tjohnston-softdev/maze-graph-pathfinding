# Maze Graph Pathfinding

This is a command line application that I have developed in Node JS during my free time throughout the 2020 COVID pandemic. The program receives an [image](./info/input-types/maze.png) or [text](./info/input-types/absolute.md) input file representing a maze and outputs it as a HTML file rendered with [Cytoscape.js](https://js.cytoscape.org/). As the name suggests, this program can perform several different pathfinding operations on the maze. This includes finding the shortest path using [Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) or [A*Star](https://en.wikipedia.org/wiki/A*_search_algorithm) algorithms.

---

## Background
One afternoon, I decided on impulse to watch a [Computerphile video](https://www.youtube.com/watch?v=GazC3A4OQTE) hosted by [Dr. Mike Pound](https://github.com/mikepound) demonstrating Dijkstra's algorithm. During my free time in the following months, I set about to write a program in Node JS that can perform pathfinding on mazes either from an image, or a specific-format text file.

---

## Getting Started
After downloading the project, open a terminal inside the root folder and run `npm install`. Afterwards, run `node maze` to confirm that the program has been installed and to see a list of supported commands.

For example, the command `node maze map-absolute ./examples/absolute/input.txt dsktra` performs Dijkstra pathfinding on a maze text file. The program will then produce a file `graph.html` in the root directory.

Example maze images have been generated using Kees Meijer's [Maze Generator](https://keesiemeijer.github.io/maze-generator/)

---

## Documentation
* [Commands](./info/commands/readme.md)
* [Input Types](./info/input-types/readme.md)
* [Pathfinding Modes](./info/pathfinding-modes/readme.md)

---

## Disclaimer
This project is licensed under [MIT](https://opensource.org/licenses/MIT). I wrote this program as a personal exercise and for my professional portfolio. You are free to use this project as you see fit for both commercial and non-commercial purposes as long as proper credit is retained and that the MIT license remains intact.
