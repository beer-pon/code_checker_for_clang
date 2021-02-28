<template>
  <div id="app">
    <Title/>
    <FileReader @fileUp="uploadedFile" />
    <FileViewer :file="file" :fileNamePre="fileName"/>
  </div>
</template>

<script>
import Title from './components/Title.vue'
import FileReader from './components/FileReader.vue'
import FileViewer from './components/FileViewer.vue'

export default {
  name: 'App',
  components: {
    Title ,
    FileReader,
    FileViewer
  },
  data: function () {
    return {
      file: {},
      fileName: ""
    };
  },
  methods: {
    uploadedFile(file) {
      this.file=file;
      this.fileName=file.name;
    }
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
