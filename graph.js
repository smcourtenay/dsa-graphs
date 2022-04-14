/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let neighbor in vertex.adjacent) {
      neighbor.adjacent.removeEdge(neighbor, vertex);
    }
    this.nodes.delete(vertex);
  }


  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, visitedSet = new Set(), result = []) {
    if (start.adjacent.size === 0) return [start.value];

    visitedSet.add(start);
    result.push(start.value);

    for (let neighbor of start.adjacent) {
      if (!visitedSet.has(neighbor)) {
        visitedSet.add(neighbor);
        this.depthFirstSearch(neighbor, visitedSet, result)
      }
    }
    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    if (start.adjacent.size === 0) return [start.value];
    let visitingQueue = [start];
    let visitedSet = new Set();
    visitedSet.add(start);
    let result = [];
    while (visitingQueue.length !== 0) {
      let current = visitingQueue.shift();
      result.push(current.value);
      for (let neighbor of current.adjacent) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          visitingQueue.push(neighbor);
        }
      }
    }
    return result;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, visitedSet = new Set()) {
    console.log("Start: ", start.value);
    console.log("End: ", end.value);
    console.log("visitedSet: ", visitedSet);

    let pathLength = 0;
    if (start.adjacent.size === 0) return 0;
    
    if (start.value === end.value) return pathLength;

    if (visitedSet.size === this.nodes.size && start.value !== end.value) return undefined;

    visitedSet.add(start);

    for (let neighbor of start.adjacent) {
      if (!visitedSet.has(neighbor)) {
        visitedSet.add(neighbor);
        pathLength = this.distanceOfShortestPath(neighbor, end, visitedSet) + 1;
      }
    }
    console.log("REACHING END")
  }
}

module.exports = { Graph, Node }
