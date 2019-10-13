import {getNeighbours, equal, getAllNodes, sortByDistance} from './utils';

function dijkstras(grid, start, finish) {
    grid = Object.assign([], grid);
    
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

        updateNeighbours(grid, closest);
    }
}


function updateNeighbours(nodes, node) {
    const neighbours = getNeighbours(nodes, node);
    for(let i in neighbours) {
        neighbours[i].distance = node.distance + 1;
        neighbours[i].previousNode = node;
    }
}

export default dijkstras;