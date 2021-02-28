<template>
  <div class="text-reader">
    <div class="drop_area" 
      @dragenter="dragEnter" 
      @dragleave="dragLeave" 
      @dragover.prevent 
      @drop="dropFile" 
      :class="{enter: isEnter}">
        ファイルアップロード
    </div>
    <div class="upload_area">
      <input type="file" @change="inputFile">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileReader' ,
  data:  function () {
    return {
      uploadedFile: '',
      fileLines: '',
      isEnter: false
    };
  },
  methods: {
    inputFile(ev) {
      const file = ev.target.files[0];
      this.setFileData(file);
    },
    dropFile(ev){
      const file = ev.dataTransfer.files[0];
      this.setFileData(file);
      this.isEnter = false;
    },
    dragEnter(){
      console.log('dragEnter');
      this.isEnter = true;
    },
    dragLeave(){
      console.log('dragLeave');
      this.isEnter = false;
    },
    // file dataを親コンポーネントに渡す
    setFileData(file) {
      this.$emit('fileUp', file)
    },
  }
};
</script>

<style>
    .text-reader {
      display: flex;
      justify-content: center;
      padding: 10px;
    }
    .upload_area {
      margin-top: 10%;
      margin-left: 30px;
    }
    .drop_area {
      color: gray;
      font-weight: bold;
      font-size: 1.2em;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 500px;
      height: 300px;
      border: 5px solid gray;
      border-radius: 15px;
    }
    .enter {
      border: 10px dotted powderblue;
    }
</style>