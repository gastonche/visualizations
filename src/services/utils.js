function createGrid(height, width) {
    const grid = [];
    for(let row = 0; row < height; row++){
        const rowData = [];
        for(let col = 0; col < width; col++) {
            rowData.push(makeNode(row, col))
        }
        grid.push(rowData);
    }
    return grid;
}

function makeNode(row, col) {
    return {
        row,
        col,
        distance: Infinity,
        isFinish: false,
        isVisited: false,
        isStart: false,
        isWall: false,
    }
}

function updateGridNode(grid, i, j, node) {
    const nodes = [...grid];
    nodes[i][j] = {...grid[i][j], ...node};
    return nodes;
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export {
    createGrid,
    updateGridNode,
    debounce,
}