function equal(src, dest) {
    return src.row === dest.row && src.col === dest.col;
}

function getAllNodes(grid) {
    return grid.reduce((acc, row) => [...acc, ...row], []);
}

function sortByDistance(nodes) {
    nodes.sort((a, b) => a.distance - b.distance);
}

function inverseSortByDistance(nodes) {
    nodes.sort((b, a) => a.distance - b.distance);
}


function getNeighbours(grid, node) {
    const neighbours = [];
    if(node.row < grid.length - 1) neighbours.push(grid[node.row + 1][node.col])
    if(node.row > 0) neighbours.push(grid[node.row - 1][node.col])
    if(node.col < grid[node.row].length - 1) neighbours.push(grid[node.row][node.col + 1])
    if(node.col > 0) neighbours.push(grid[node.row][node.col - 1])
    return neighbours.filter(node => node && !node.isVisited);
}

export {
    equal,
    getAllNodes,
    sortByDistance,
    getNeighbours,
    inverseSortByDistance,
}