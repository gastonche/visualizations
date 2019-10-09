<template>
    <div>
        <div class="bar">
            <div class="left">
                <h3>Dijkstras Algorithm</h3>
            </div>
            <div>
                <button class="action" @click="visualize">
                    Visualize
                </button>
            </div>
        </div>
        <grid-controller
            :grid="grid"
            :start="startCoords"
            :finish="finishCoords"
            @gridChange="gridChange"
            @start="setStart"
            @finish="setFinish"
        />
        <instructions>
            <template slot="title">Dijkstra's Algorithm</template>
            <h4>What is it:</h4>
            <p>Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm)[1] is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later</p>
            <h4>How to Test It</h4>
            <p>
                To test it do the following:
                <ol>
                    <li>
                        <b>Set Start and Finish Nodes</b>
                        Set these by right clicking on the intended start and finish nodes respectively.
                    </li>
                    <li>
                        <b>Define walls/barriers/obstacles</b>
                        set obstacles to obstruct the path by clicking an ddraging on the grid
                    </li>
                    <li>
                        <b>Visualize</b>
                        Click on the visulaize button at the top right of the page
                    </li>
                </ol>
            </p>
        </instructions>
    </div>
</template>

<script>
import GridController from './GridController';
import dijkstras from '../algorithms/dijkstras';
import Instructions from './Instructions';

//constants
const START_POINT_COL = 0,
START_POINT_ROW = 0,
FINISH_POINT_ROW = 29,
FINISH_POINT_COL = 19,
SPEED = 20;

export default {
    name: 'dijkstras',
    components: {GridController, Instructions},
    data() {
        return {
            grid: [],
            startRow: START_POINT_ROW,
            startCol: START_POINT_COL,
            finishRow: FINISH_POINT_ROW,
            finishCol: FINISH_POINT_COL,
        }
    },
    computed: {
        startNode() { return this.grid[this.startRow][this.startCol] },
        finishNode() { return this.grid[this.finishRow][this.finishCol]; },
        startCoords() { return {col: this.startCol, row: this.startRow} },
        finishCoords() { return {col: this.finishCol, row: this.finishRow} },
    },
    methods: {
        visualize() {
            const {visitedNodes, completed} = dijkstras(this.grid, this.startNode, this.finishNode);
            for(let i = 0; i <= visitedNodes.length; i++) {
                if(i === visitedNodes.length && completed) {
                    this.visualizePath(visitedNodes[i - 1], i);
                    return;
                }
                const node = visitedNodes[i];
                setTimeout(() => {
                    document.getElementById(`node-${node.row}-${node.col}`).classList.add('visited');
                }, SPEED * i );
            }
        },
        visualizePath(node, i) {
            markAsPath(node);

            function markAsPath(n) {
                setTimeout(() => {
                    document.getElementById(`node-${n.row}-${n.col}`).classList.add('path');
                }, SPEED * i);
                i++;
                if(n.previousNode) {
                    markAsPath(n.previousNode);
                }
            }
        },
        gridChange(grid) {
            this.grid = Object.assign([], grid);
        },
        setStart(node) {
            this.startCol = node.col;
            this.startRow = node.row;
        },
        setFinish(node) {
            this.finishCol = node.col;
            this.finishRow = node.row;
        }
    },
}
</script>

<style>
</style>