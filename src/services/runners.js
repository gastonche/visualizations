import Dijkstra from '../algorithms/dijkstras';
import aStar from '../algorithms/aStar';
import greedy from '../algorithms/greedyBestFirstSearch';
import depthFirst from '../algorithms/depthFirst';
import breadthFirst from '../algorithms/breadthFirst';

export default [
    {
        name: 'Dijsktra’s Algorithm',
        description: `
            Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later
        `,
        run: Dijkstra
    },
    {
        name: 'A* Algorithm',
        description: `
            A* is an informed search algorithm, or a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.).
        `,
        run: aStar
    },
    {
        name: 'Greedy best-first Search',
        description: `
            Greedy best-first search tries to expand the node that is closest to the goal, on the grounds that this is likely to lead to a solution quickly. Thus, it evaluates nodes by using just the heuristic function; that is, f(n)=h(n)
        `,
        run: greedy
    },
    {
        name: 'Depth First Search',
        description: `
            DFS stands for Depth First Search is a edge based technique. It uses the Stack data structure, performs two stages, first visited vertices are pushed into stack and second if there is no vertices then visited vertices are popped.
        `,
        run: depthFirst
    },
    {
        name: 'Breadth First Search',
        description: `
            BFS stands for Breadth First Search is a vertex based technique for finding a shortest path in graph. It uses a Queue data structure which follows first in first out. In BFS, one vertex is selected at a time when it is visited and marked then its adjacent are visited and stored in the queue. It is slower than DFS.
        `,
        run: breadthFirst
    },
]