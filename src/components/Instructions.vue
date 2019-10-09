<template>
    <div class="instructions">
        <h4 @click="showing = true"><slot name="title"></slot></h4>
        <button class="close" @click="showing = !showing">x</button>
        <transition>
            <div v-if="showing">
                <div class="content"><slot></slot></div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'instructions',
    data() {
        return {showing: true}
    }
}
</script>

<style>
    .instructions{
        position: fixed;
        bottom: 0;
        right: 0;
        background: #ccc;
        box-shadow: 1px 0 0 0 rgba(0,0,0,0.1);
        min-height: 20px;
        min-width: 20px;
        overflow: auto;
        max-width: 300px;
        max-height: 400px;
    }

    h4{
        cursor: pointer;
    }

    .close{
        position: absolute;
        top: 0;
        right: 0;
        content: 'x';
        width: 15px;
        height: 15px;
        background: grey;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        text-align: center;
        padding: 0 3px;
        outline: none;
    }

    .v-enter-to, .v-leave{
        opacity: 1;
        max-width: 300px;
        max-height: 400px;
    }

    .v-enter-active, .v-leave-active{
        transition: all .3s;
    }

    .v-enter, .v-leave-to{
        opacity: 0;
        max-width: 20px;
        max-height: 20px;
    }
</style>