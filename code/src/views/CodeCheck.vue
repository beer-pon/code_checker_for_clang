<template>
  <div class="CodeCheck">
    <FileReader @fileUp="uploadedFile" />
    <FileViewer :file="file" :fileNamePre="fileName"/>
  </div>
</template>

<script>

import FileReader from '@/components/FileReader.vue'
import FileViewer from '@/components/FileViewer.vue'

export default {
  name: 'CodeCheck',
  components: {
    FileReader ,
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
