<template>
    <div>
        <b-form-select
            v-model="selected"
            @change="handlerChangeRoom($event)">
            <option v-for="(selectOption, indexOption) in options"
                :key="indexOption.id"
                :value="selectOption">
                    {{ selectOption.nameRoom }}
            </option>
        </b-form-select>
        <div class="mt-2 mb-3">
            Room selected:<strong v-if="dataSetRoom">{{ selected = dataSetRoom.nameRoom|| selected }}</strong> <strong v-if="dataSetRoom">{{ selected.nameRoom }}</strong>
        </div>
    </div>
</template>

<script>
import {PATH, requestHeader} from '../../../index/index.js'
import axios from "axios";
export default {
    name:'SelectRoom',
    props:{
        dataSetRoom:Object
    },
    data(){
        return{
            options:null,
            selected:null
        }
    },
    created() {
        this.loadPageDataRoom();
    },
    methods:{
        loadPageDataRoom() {
            axios
            .get(`${PATH}api/room/getdata`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((response) => {
                this.options = response.data;
                console.log(this.options);
            });
        },
        handlerChangeRoom(event){
           this.$emit('eventChange',event)
        //    console.log(event)
        },
    }
}
</script>

<style>

</style>