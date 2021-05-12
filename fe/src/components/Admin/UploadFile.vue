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
      <b-button type="submit" size="sm">Save</b-button>
    </b-form>
    <div style="display: grid; grid-template-columns: 25% 25% 25% 25% ; overflow: hidden; " >
      <div v-for="(it,index) in imgs" :key="index"  style="height: 168px; margin: 0 5px; position: relative;">
        <img  :src="`data:${it.type};base64,${it.data}`" alt="Image" style="width:100%; height: auto;">
          <b-button-group  style="position: absolute; top: 0;right: 0;">
            <b-dropdown size="sm" right no-caret>
              <b-dropdown-item><b-icon class="mr-2" icon="pencil-square" aria-hidden="true"></b-icon>Edit</b-dropdown-item>
              <b-dropdown-item @click="handlerDelete(it.id)"><b-icon class="mr-2" icon="trash" aria-hidden="true"></b-icon>Delete</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { PATH, requestHeader } from "../../index/index.js";
import axios from "axios";
export default {
  props:{
    dataSetId: String,
    dataSetCh: String,
    dataSetImgs:Array
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
      imgs:null
    }
  },
  created(){
    if(this.dataSetId==null){
      this.loadData();
    }else{
      this.loadDataById();
    }
    
  },
  methods: {
    loadData(){
      axios.get(`${PATH}api/files`,{
        headers:{
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
                }
      })
      .then(response=>{
        this.imgs=response.data
        
      })
    },
    loadDataById(){
      let a=[]
      if(this.dataSetImgs){
         for (let i = 0; i < this.dataSetImgs.length; i++) {
          a.push(this.dataSetImgs[i])
        }
        this.imgs=a
      }
    },
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
      ).then((response)=>{
          this.loadData();
      })
      .catch((error)=>{
         this.loadData();
      });
    },
    handlerDelete(e){
        console.log(e)
        fetch(`${PATH}api/files/delete/${e}`, {
          method: "DELETE",
          headers: requestHeader().headers,
        })
          .then((response) => {
            if (!response.ok) {
              // alert("delete false");
              if(this.dataSetId==null){
                this.loadData();
              }else{
                this.loadDataById();
              }
            } else {
              // alert("delete thanh cong");
              if(this.dataSetId==null){
                this.loadData();
              }else{
                this.loadDataById();
              }
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
  }
}
</script>

<style>
</style>