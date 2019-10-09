<template>
    <div
        class="node"
        :class="{
            start: isStart,
            finish: isFinish,
            wall: node.isWall,
            visted: node.isVisited,
            path: node.isPath,
        }"
        :id="`node-${node.row}-${node.col}`"
        @contextmenu.prevent.stop
        @mousedown="down"
        @mouseup="up"
        @mouseenter="over"
    ></div>
</template>

<script>
import {debounce} from '../services/utils';

export default {
    name: 'node',
    props: {
        node: {
            type: Object,
            required: true
        },
        start: {
            type: Object, required: true,
        },
        finish: {
            type: Object, required: true,
        },
    },
    computed: {
        isStart() { return this.start.col === this.node.col && this.start.row === this.node.row},
        isFinish() { return this.finish.col === this.node.col && this.finish.row === this.node.row},
    },
    methods: {
        down: debounce(function(e){
            if(e.which === 3) {
                this.setNode()
            }else{
                this.$emit('down', this.node);
            }
        }, 300),
        up: debounce(function(e){
            if(e.which !== 3) {
                this.$emit('up', this.node);
            }
        }, 100),
        over(){
            this.$emit('over', this.node);
        },
        setNode() {
            this.$emit('setNode', this.node)
        }
    }
}
</script>

<style>
    .node{
        display: inline-block;
        height: 20px;
        width: 20px;
        border: 1px solid #b8d7e8;
        box-sizing: border-box;
    }

    .visited{
        animation-name: visitedAnimation;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    @keyframes visitedAnimation {
        0% {
            transform: scale(0.3);
            background-color: rgba(0, 0, 66, 0.75);
            border-radius: 100%;
        }

        50% {
            background-color: rgba(17, 104, 217, 0.75);
        }

        75% {
            transform: scale(1.2);
            background-color: rgba(0, 217, 159, 0.75);
        }

        100% {
            transform: scale(1);
            background-color: rgba(0, 190, 218, 0.75);
        }
    }

    .wall{
        background: darkblue;
    }

    .path{
        animation-name: shortestPath;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    @keyframes shortestPath {
        0% {
            transform: scale(0.6);
            background-color: rgb(255, 254, 106);
        }

        50% {
            transform: scale(1.2);
            background-color: rgb(255, 254, 106);
        }

        100% {
            transform: scale(1);
            background-color: rgb(255, 254, 106);
        }
    }

    .node.start{
        background-color: orange !important;
    }

    .node.finish{
        background-color: orchid !important;
    }
    
</style>

