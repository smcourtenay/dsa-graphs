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
  distanceOfShortestPath(start, end) {
    if (start.value === end.value) return 0; 

    let queue = [[start, 0]];
    let visitedSet = new Set();
    visitedSet.add(start);

    while (queue.length > 0){
      let [current, distance] = queue.shift();
      visitedSet.add(current);
      
      if (current.value === end.value) {
        return distance;
      } else {
        for (let neighbor of current.adjacent) {
          if (!visitedSet.has(neighbor)){
            queue.push([neighbor,distance+1]);
          }
        }
      }
    }
  }
}

module.exports = { Graph, Node }
