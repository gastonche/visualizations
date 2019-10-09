<template>
  <div id="app">
    <dijkstras/>
  </div>
</template>

<script>
import Dijkstras from './components/Dijsktras';
export default {
  name: 'app',
  components: {
    Dijkstras
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0;
}

.bar {
  height: 60px;
  background: #ccc;
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
