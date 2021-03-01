<template>
  <div id="app">
    <Title/>
    <v-tabs  
      background-color="deep-purple accent-4"
      centered
      >
      <v-tab to="/" centered>Top</v-tab>
      <v-tab to="/upload">CodeCheck</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import Title from './components/Title.vue'

export default {
  name: 'App',
  components: {
    Title ,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
