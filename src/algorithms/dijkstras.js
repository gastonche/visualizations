function dijkstras(grid, start, finish) {
    grid = Object.assign([], grid);
    
    grid[start.row][start.col].distance = 0;

    const nodes = getAllNodes(grid);
    const visitedNodes = [];
    
    while(nodes.length > 0) {
        sortByDistance(nodes);
        const closest = nodes.shift();

        console.log(closest);

        if(closest.isWall) continue;
        
        if(closest.distance === Infinity) return {visitedNodes};

        closest.isVisited = true;
        
        visitedNodes.push(closest);

        if(equal(closest, finish)) return {visitedNodes, completed: true};

        updateNeighbours(grid, closest);
    }

    function equal(src, dest) {
        return src.row === dest.row && src.col === dest.col;
    }
}

function getAllNodes(grid) {
    return grid.reduce((acc, row) => [...acc, ...row], []);
}

function sortByDistance(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}
function updateNeighbours(nodes, node) {
    const neighbours = getNeighbours(nodes, node);
    for(let i in neighbours) {
        neighbours[i].distance = node.distance + 1;
        neighbours[i].previousNode = node;
    }
    console.log(neighbours);
}

function getNeighbours(grid, node) {
    const neighbours = [];
    if(node.row > 0) neighbours.push(grid[node.row - 1][node.col])
    if(node.row < grid.length - 1) neighbours.push(grid[node.row + 1][node.col])
    if(node.col < grid[node.row].length - 1) neighbours.push(grid[node.row][node.col + 1])
    if(node.col > 0) neighbours.push(grid[node.row][node.col - 1])
    return neighbours.filter(node => node && !node.isVisited);
}


export default dijkstras;