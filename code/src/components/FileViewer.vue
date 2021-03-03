<template>
  <div class="code-area">
    <h3>{{fileName}}</h3>
    <v-simple-table border>
    <template v-slot:default class="code-table">
      <tbody>
      <tr v-for="line in fileLines" :key="line.index" class="code-table-tr">
        <td class="code-table-td code-table-td-number">{{line.number}}</td>
        <v-tooltip bottom v-if="line.errorMsg">
          <template v-slot:activator="{ on }" >
          <v-app id="tooltip-app">
            <td v-on="on" class="code-table-td code-table-td-code error"><pre>{{line.code}}</pre></td>
          </v-app>
          </template>
          <span>{{line.errorMsg}}</span>
        </v-tooltip>
        <td class="code-table-td code-table-td-code" v-if="!line.errorMsg"><pre>{{line.code}}</pre></td>
      </tr>
      </tbody>
    </template>
    </v-simple-table>
  </div>
</template>

<script>
import { codeCheck } from '@/logic/codeCheck'
export default {
  components: {  },
  name: 'FileViewer' ,
  props: {
      file: [Object,File],
    } ,
  data:  function () {
    return {
      fileName: "",
      fileLines: {},
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
        this.fileLines = codeCheck(lines);
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
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.code-area {
  margin-left: auto;
  margin-right: auto;
}
.error{
  background-color: red;
}
.v-application--wrap{
    width: 100% !important;
    flex: inherit !important;
    min-height: 0 !important;
    background-color: inherit !important;
}
#tooltip-app{
    background-color: inherit !important;
}
</style>