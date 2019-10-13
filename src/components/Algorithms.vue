<template>
    <div>
        <div class="bar">
            <h3>
                {{selectedAlorigthm.name}} Visualizer
            </h3>
            <div class="menu">
                <label for="select" @click="selecting = !selecting">Select Algorithm</label>
                <div class="bg" v-if="selecting" @click="selecting = !selecting"></div>
                <transition name="menu">
                    <ul class="left" v-if="selecting">
                        <li v-for="(algorithm, index) in algorithms" :key="index"  @click="selectedAlorigthm = algorithm; selecting = !selecting;">
                            {{algorithm.name}}
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <grid-controller
            :grid="grid"
            :start="startCoords"
            :finish="finishCoords"
            @gridChange="gridChange"
            @start="setStart"
            @finish="setFinish"
            @visualize="visualize"
        />
        <instructions>
            <template slot="title">{{selectedAlorigthm.name}}</template>
            <h4>What is it:</h4>
            <p>{{selectedAlorigthm.description}}</p>
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
import Instructions from './Instructions';
import algorithms from '../services/runners'

//constants
const START_POINT_COL = 0,
START_POINT_ROW = 0,
FINISH_POINT_ROW = 29,
FINISH_POINT_COL = 19,
SPEED = 20;

export default {
    name: 'Algorithms',
    components: {GridController, Instructions},
    data() {
        return {
            algorithms,
            selectedAlorigthm: algorithms[0],
            selecting: false,
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
            // eslint-disable-next-line no-console
            console.time(this.selectedAlorigthm.name);
            const {visitedNodes, completed} = this.selectedAlorigthm.run(this.grid, this.startNode, this.finishNode);
            // eslint-disable-next-line no-console
            console.timeEnd(this.selectedAlorigthm.name);
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
    .menu{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .menu label{
        cursor: pointer;
        height: 30px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.1);
        padding: 5px;
        box-sizing: border-box;
    }

    .menu ul{
        background: #fff;
        position: absolute;
        top: 25px;
        padding: 0;
        list-style-type: none;
        padding: 5px 0;
        width: fit-content;
        transition: all .3s;
        z-index: 2;
    }

    .menu li{
        padding: 3px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        white-space: nowrap;
        cursor: pointer;
    }

    .menu-enter, .menu-leave-to{
        top: 0;
        opacity: 0;
    }

    .menu-enter-to, .menu-leave{
        top: 25px;
        opacity: 1;
    }

    .bg{
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.3);
        z-index: 1;
    }
</style>