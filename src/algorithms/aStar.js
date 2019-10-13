import { getAllNodes, sortByDistance, equal, getNeighbours } from './utils';

function aStar(grid, start, finish) {
    grid = Object.assign([], grid);
    
    grid[start.row][start.col].g = 0;
    grid[start.row][start.col].distance = 0;

    const nodes = getAllNodes(grid);
    const visitedNodes = [];
    
    while(nodes.length > 0) {
        sortByDistance(nodes);
        const closest = nodes.shift();

        if(closest.isWall) continue;
        
        if(closest.distance === Infinity) return {visitedNodes};

        closest.isVisited = true;
        
        visitedNodes.push(closest);

        if(equal(closest, finish)) return {visitedNodes, completed: true};

        updateNeighbours(grid, closest, finish);
    }
}

function updateNeighbours(nodes, node, finish) {
    const neighbours = getNeighbours(nodes, node);
    for(let i in neighbours) {
        const neighbour = neighbours[i];
        neighbour.g = node.g + 1;
        neighbour.h = manHattanHeuristics(neighbour, finish);
        neighbour.distance = neighbour.g + neighbour.h;

        neighbours[i].previousNode = node;
    }
}

function manHattanHeuristics(node, finish) {
    return Math.abs(node.row - finish.row) + Math.abs (node.col - finish.col) 
}

export default aStar;