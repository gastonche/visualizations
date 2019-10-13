<template>
  <div id="app">
    <algorithms/>
  </div>
</template>

<script>
import Algorithms from './components/Algorithms';
export default {
  name: 'app',
  components: {
    Algorithms
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 12px;
}

body{
  margin: 0;
}

.bar {
  height: 60px;
  background: lightslategray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.action{
  padding: 10px;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
}
.value{
  display: inline-block;
  margin-right: 5px;
}
.value input{
  height: 30px;
  display: block;
}

.value label{
  font-size: 12px;
}
</style>
