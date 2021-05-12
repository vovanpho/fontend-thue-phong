<template>
    <b-form-group
      label="Individual inline checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox
        v-for="option in options"
        v-model="selected"
        :key="option.id"
        :value="option"
        :aria-describedby="ariaDescribedby"
        name="flavour-4a"
        inline
        @change="eventChange()"
      >
        {{ option.nameStuff }}
      </b-form-checkbox>
    </b-form-group>
</template>

<script>
import {PATH, requestHeader} from '../../../index/index.js';
import axios from "axios";
export default {
    name:'ListStuff',
    props:{
        dataSetListStuff:Array,
        dataSetId:String
    },
    data() {
        return {
            selected: [], // Must be an array reference!
            options: []
        }
    },
    mounted: function(){
        this.selected=this.dataSetListStuff
    }, 
    created() {
        this.loadPage();
    },
    methods: {
        loadPage() {
            axios
            .get(`${PATH}api/stuffs/get-list-data`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((response) => {
                this.options = response.data;
                // console.log(this.options)
            });
        },
        eventChange(){
            // this.$emit('eventChangeStuff', this.selected)
            console.log(this.selected)
            this.selected.forEach(element => {
                this.saveChange(element,this.dataSetId);
            });
            this.loadPage()
           for (let i = 0; i < this.selected.length; i++) {
               for (let j = 0; j < this.options.length; j++) {
                   if(this.selected[i].id == this.options[j].id){
                       
                   }
                   
               }
               
           }
            
            
        },
        saveChange(e, id){
            fetch(`${PATH}api/room/set-data-room_stuff/${id}`,
            { method: 'POST',
                headers: requestHeader().headers,
                body: JSON.stringify(e)
            })
            .then(response => { 
                if(!response.ok){
                    console.log('ok')
                }else{
                }
            })
            .catch(error => {
                    console.log(error)
            });
        }
    }
}
</script>

<style>

</style>