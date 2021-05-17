<template>
    <div>
        <ul style="display: inline-block; padding: 0;">
            <li style="display: inline-block; margin-right: 10px"
                v-for="option in options" :key="option.id">
                <input id="stuffCheck" type="checkbox" 
                        :value="option" v-model="selected"
                        @change="eventChange($event)">
                <span style="margin-left:5px">{{option.nameStuff}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {PATH, requestHeader} from '../../../index/index.js';
import axios from "axios";
export default {
    name:'ListStuff',
    props:{
        dataSetListStuff:Array,
        dataSetId:String,
        statusSave:Boolean,
    },
    data() {
        return {
            selected: [],
            options: [],
            selectedOld:[],
            sc:[],
            nsc:[],
            save:null,
        }
    },
    mounted: function(){
        this.selected=this.dataSetListStuff
        this.selectedOld=this.dataSetListStuff
        console.log(this.selected)
        
        
    }, 
    watch:{
        statusSave: function () {

                if(this.sc[0]!=Array.isArray([])){
                    this.sc.forEach(r=>{
                         console.log(r)
                        this.saveChange(r, this.dataSetId)
                    })
                }
                if(this.nsc[0]>0){
                    this.nsc.forEach(element => {
                        console.log(element)
                        this.deleteStuff(element, this.dataSetId)
                    });
                }
        }
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
                console.log(response.data)
            });
        },
        eventChange(e){
            let o=[];
                for (let j = 0; j < this.options.length; j++) {
                    o.push(this.options[j].id)
                }
            let so=[];
                for (let k = 0; k < this.selectedOld.length; k++) {
                    so.push(this.selectedOld[k].id)
                }
            let sn=[];
                for (let i = 0; i < this.selected.length; i++) {
                    sn.push(this.selected[i].id)
                }
            let ns=[];
                ns=(o.filter(fo => !sn.includes(fo)));

            let sc=[];
            let nsc=[];
            console.log(so.length==sn.length,"so="+so,"sn="+sn);
            if (so.length>sn.length) {
                nsc.push(so.filter(fso => ns.includes(fso)));
                console.log("xoa"+nsc)
                sc.push(sn.filter(fi => !so.includes(fi)));
               console.log("them"+sc)
            }else{
                nsc.push(so.filter(fso => ns.includes(fso)));
                console.log("xoa"+nsc)
                sc.push(sn.filter(fi => !so.includes(fi)));
                console.log("them"+sc)
            }
                this.sc=sc[0];
                this.nsc=nsc[0];
            console.log("sc"+this.sc,"nsc"+this.nsc)
        },
        saveChange(e, id){
            fetch(`${PATH}api/room/set-data-room_stuff/${id}/${e}`,{ 
                method: 'POST',
                headers: requestHeader().headers,
            })
            .then(response => { 
                if(!response.ok){
                    console.log('ok')
                    this.loadPage();
                }else{
                    this.loadPage();
                }
            })
            .catch(error => {
                    console.log(error)
            });
        },
        deleteStuff(e, id){
            fetch(`${PATH}api/room/delete-stuff/${id}/${e}`, {
                method: "POST",
                headers: requestHeader().headers,
            })
            .then(response => {
                if (!response.ok) {
                    this.loadPage();
                } else {
                    this.loadPage();
                }
            })
            .catch((error) => {
                console.log(error);
            });
      }
    }
}
</script>

<style>

</style>