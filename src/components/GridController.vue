<template>
    <div class="controller">
        <div class="bar">
            <form @submit.prevent.stop="reset">
                <div class="value">
                    <label>Grid Height</label>
                    <input type="text" class="value" max="50" v-model="height">
                </div>
                <div class="value">
                    <label>Grid width</label>
                    <input type="text" class="value" max="50" v-model="width">
                </div>
                <button class="action">Update Grid</button>
            </form>
            <button class="action reset" @click="reset">
                Reset
            </button>
        </div>
        <grid
            :grid="grid"
            :start="start"
            :finish="finish"
            @down="down"
            @up="up"
            @over="over"
            @setNode="setNode"
        ></grid>
    </div>
</template>

<script>
import Grid from './Grid';
import {createGrid, updateGridNode} from '../services/utils';

const GRID_HEIGHT = 30,
GRID_WIDTH = 50;

export default {
    name: 'grid-controller',
    data() {
        return {
            mousePressed: false,
            width: GRID_WIDTH,
            height: GRID_HEIGHT,
        }
    },
    props: {
        grid: {
            type: Array,
            required: true,
        },
        start: {
            type: Object, required: true,
        },
        finish: {
            type: Object, required: true,
        },
    },
    components: {Grid},
    methods: {
        down(node) {
            this.mousePressed = true;
            this.setAsWall(node, true);
        },
        up(node) {
            this.mousePressed = false;
            this.setAsWall(node, true);
        },
        over(node) {
            this.mousePressed && this.setAsWall(node);
        },
        setNode(node) {
            const vm = this;
        
            if(has(this.start) && has(this.finish)) {
                set('start', node);
                set('finish', {});
            }else{
                set('finish', node);
            }

            function has(n){
                return n.col > -1 && n.row > -1;
            }

            function set(key, node) {
                vm.$emit(key, node);
            }
        },
        setAsWall(node, force) {
            this.change(updateGridNode(this.grid, node.row, node.col, {isWall: force || !node.isWall}));
        },
        change(value) {
            this.$emit('gridChange', value);
        },
        reset() {
            this.change([]);
            this.$nextTick(() => this.change(createGrid(this.height, this.width)));
        },
    },
    mounted() {
        this.reset();
    }
}
</script>

<style>
    .controller .bar{
        margin-bottom: 10px;
        background-color: #b8d7e8;
    }
</style>