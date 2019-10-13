import { getNeighbours, equal } from '../algorithms/utils';

function breadthFirst(grid, start, finish) {
    grid = Object.assign([], grid);
    
    grid[start.row][start.col].distance = 0;
    
    const nodes = [start];

    const visitedNodes = [];
    while(nodes.length > 0){
        const node = nodes.shift();

        if(node.isWall) continue;

        node.isVisited = true;
        visitedNodes.push(node);

        if(equal(node, finish)) return {visitedNodes, completed: true}

        Array.prototype.push.apply(nodes, updateNeighbors(grid, node, nodes));
    }
    return {visitedNodes};
}

function updateNeighbors(grid, node, nodes) {
    const neighbours = getNeighbours(grid, node).filter(n => !nodes.find(nn => equal(n, nn)));
    for(let i in neighbours) {
        neighbours[i].previousNode = node;
    }

    return neighbours;
}

export default breadthFirst;