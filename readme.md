# Maze Graph Pathfinding
by Tyrone Johnston

---

### Introduction
This is a command line application that I have developed in Node JS during my free time throughout the 2020 COVID pandemic. The program receives an [image](./info/input-types/maze.png) or [text](./info/input-types/absolute.md) input file representing a maze and outputs it as a HTML file rendered with [vis.js](https://visjs.org/). As the name suggests, this program can perform several different pathfinding operations on the maze. This includes finding the shortest path using [Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) or [A*Star](https://en.wikipedia.org/wiki/A*_search_algorithm) algorithms.

### Inspiration
The inspiration for this software came about when one afternoon, I decided on impulse to watch a [Computerphile video](https://www.youtube.com/watch?v=GazC3A4OQTE) hosted by Dr. Mike Pound demonstrating Dijkstra's algorithm. During my free time in the following months, I set about to write a program in Node JS that can perform pathfinding on mazes either from an image, or a specific-format text file.

### Getting Started
After cloning/pulling a local copy of the project, open a terminal inside the root folder and run `npm install`. Afterwards, run `node maze` to confirm that the program has been installed and to see a list of supported commands.

For example, the command `node maze map-absolute ./examples/absolute/input.txt dsktra` to perform Dijkstra pathfinding on a maze text file. The program will then produce a file `graph.html` in the root directory.

Example maze images have been generated using Kees Meijer's [Maze Generator](https://keesiemeijer.github.io/maze-generator/)

### Documentation
* [Commands](./info/command-root.md)
* [Input Types](./info/input-root.md)
* [Pathfinding Modes](./info/pathfinding-modes.md)

### Disclaimer
This project is licensed under the MIT license. I wrote this program as a personal exercise and for my professional portfolio. You are free to use this project as you see fit for both commercial and non-commericial purposes as long as proper credit is retained and that the MIT license remains intact.

As this is a personal project, I am not actively looking for contributions. However, I am open to suggestions, bug reports, etc.