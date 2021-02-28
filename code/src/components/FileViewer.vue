<template>
  <div class="code-area">
<!--    <h3>{{ filename }}</h3> -->
    <h3>{{fileName}}</h3>
    <v-simple-table border>
    <template v-slot:default class="code-table">
      <tbody>
      <tr v-for="line in fileLines" :key="line.index" class="code-table-tr">
        <td class="code-table-td code-table-td-number">{{line.index}}</td>
        <td class="code-table-td code-table-td-code" ><code><pre>{{line.code}}</pre></code></td>
      </tr>
      </tbody>
    </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'FileViewer' ,
  props: {
      file: [Object,File],
    } ,
  data:  function () {
    return {
      fileName: "",
      fileLines: "",
    };
  },
  watch:{
    file: {
      immediate: true,
      handler: function(afterFile){
        if(afterFile instanceof File){
          this.fileRead(afterFile);
        }
      }
    }
  },
  methods: {
    fileRead(file){
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
      reader.onload = (e) => {
        this.uploadedFile = e.target.result;
        let lines = this.uploadedFile.split("\n");
        let linesArr = [];
        for (let i = 0; i < lines.length; i++) {
          linesArr[i] = {index:i + 1,code:lines[i]};
        }
        this.fileLines = linesArr;
      };
    },    
  }
};
</script>

<style>
.code-table-td {
  border-bottom: none !important;
  height: 21px !important;
}
.code-table-td-number {
  width: 15px;
  text-align: center;
  border-right: double;
  border-right-color: inherit;
}
.code-table-td-code {
  padding-left: 10px;
  text-align: left;
}
.code-table-tr {
  height: 21px !important;
}
table {
  border:inset;
  width: auto !important;
  margin-left: auto;
  margin-right: auto;
}
.code-area {
  margin-left: auto;
  margin-right: auto;
}
</style>