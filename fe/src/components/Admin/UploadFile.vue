<template>
  <div class="container">
    <b-form @submit="submitFile">
      <b-form-file multiple
        accept="image/jpeg, image/png"
        v-model="files"
        :state="Boolean(files)"
        ref="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        required>
      </b-form-file>
      <b-form-select v-if="dataSetCh==''" v-model="selected" :options="options" required></b-form-select>
      <b-button type="submit" >Save</b-button>
    </b-form>
  </div>
</template>

<script>
import { PATH, requestHeader } from "../../index/index.js";
import axios from "axios";
export default {
  props:{
    dataSetId: String,
    dataSetCh: String
  },
  data(){
    return{
      files:[],
      selected: this.dataSetCh || null,
      options:[
        {value: null, text: 'Lua chon loai hinh' },
        {value: 'Nomal', text: 'Hinh anh thuong'},
        {value: 'Price', text: 'Hinh anh tien'}
      ],
      show:true,
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files;
      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.files.push( uploadedFiles[i] );
      }
    },
    submitFile(event){
     event.preventDefault();
      let formData = new FormData();
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('file', file);
        
      }
      formData.append('cateOfImg', this.selected);
      formData.append('id', this.dataSetId)
      formData.forEach(t=>console.log(t))
      axios.post( `${PATH}api/upload`,
        formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
      ).then(function(){
        console.log('SUCCESS!!');
        this.$emit('eventCallLoadPage');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
  }
}
</script>

<style>

</style>