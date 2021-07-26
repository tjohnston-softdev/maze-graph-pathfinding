# Pathfinding modes
maze-graph-pathfinding can perform several different algorithms on parsed node graphs. A pathfinding mode is chosen by entering a given string for the \[pathfinding-mode\] argument. This affects the `map-example` and `test-export` commands.

| Mode | Description | Link |
|---|---|---|
| Dijkstra | Finds the shortest path between the start and end nodes using Dijkstra's Algorithm | [Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) |
| A*Star | Finds the shortest path between the start and end nodes using the A*Star Algorithm | [Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm) |
| All-Possible | Attempts to find all possible paths between the start and end nodes. This only works for graphs with up to 500 nodes, otherwise it will use too much time and memory. | N/A |
| Any-Possible | Attempts to find any possible path between the start and end nodes at random. This uses a mix between the 'Dijkstra' and 'Random Mouse' algorithms. Unlike 'all-possible', this works for graphs of any size. | [Wikipedia](https://en.wikipedia.org/wiki/Maze_solving_algorithm#Random_mouse_algorithm) |
| Block | This does not find a complete path. Rather, it finds and blocks all nodes which lead to a dead-end. | N/A |
| Blank | Skips pathfinding and uses the graph as-is. (Default) | N/A |

\
**Links Retrieved:** 2020-10-15

---

[Return to index](../readme.md)