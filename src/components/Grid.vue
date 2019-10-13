<template>
    <div class="grid">
        <div class="row" v-for="(row, i) in grid" :key="i">
            <node
                v-for="(node, index) in row"
                :node="node" :key="index"
                :start="start"
                :finish="finish"
                @down="down"
                @up="up"
                @over="over"
                @setNode="setNode"
            ></node>
        </div>
    </div>
</template>

<script>
import Node from './Node';

export default {
    name: 'grid',
    components: {Node},
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
    methods: {
        down(node) {
            this.$emit('down', node);
        },
        up(node) {
            this.$emit('up', node);
        },
        over(node) {
            this.$emit('over', node);
        },
        setNode(node) {
            this.$emit('setNode', node);

        }
    }
}
</script>

<style>
    .grid{
        margin: auto;
        width: fit-content;
    }
    
    .row{
        height: 20px;
        white-space: nowrap;
    }
</style>