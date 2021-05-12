<template>
  <div class="container">
    <b-form-select v-model="selected" @change="handlerChangeRoomType($event)">
        <option v-for="(selectOption, indexOption) in options" :key='indexOption.id' :value="selectOption.nameTypeRoom" >
              {{selectOption.nameTypeRoom}} 
        </option>
    </b-form-select>
    <div class="mt-2 mb-3">The loai phong: <strong>{{ selected=dataSetName||selected }}</strong></div>
  </div>
</template>

<script>
import {PATH, requestHeader} from '../../../index/index.js'
import axios from "axios";
  export default {
    name:"RoomType",
    props:{
      dataSetName:String
    },
    data() {
        return {
            options:null,
            selected:null,
        }
    },
    created(){
      this.loadPageRoomType();
    },
    methods: {
      loadPageRoomType(){
        axios
        .get(`${PATH}api/room-type/get-list-data`,{
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
                }
        })
        .then(response=>{
          this.options=response.data;
          // console.log(this.options)
      
        })
      },
      handlerChangeRoomType(param){
        this.$emit('eventChange',param)
      },
    }
}
</script>

<style>

</style>