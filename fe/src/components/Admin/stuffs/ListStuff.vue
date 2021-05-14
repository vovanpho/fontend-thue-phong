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
    <!-- <b-form-group
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
        @change="eventChange($event)"
      >
        {{ option.nameStuff }}
      </b-form-checkbox>
    </b-form-group> -->
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
            selected: [], // Must be an array reference!
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
        
        
    }, 
    watch:{
        statusSave: function () {
            // console.log(this.statusSave);
            console.log(this.save+"ok");
            console.log(this.nsc.length)
           
                // if(this.sc.length0){
                //     console.log(this.sc.length)
                //     this.saveChange(e, this.dataSetId)
                // }
                if(this.nsc.length>0){
                    this.nsc.forEach(element => {
                        this.deleteStuff(element, this.dataSetId)
                        // this.save=false
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
                // console.log(this.options)
            });
        },
        eventChange(e){
            // console.log(e);
            // // this.$emit('eventChangeStuff', this.selected)
            // console.log(this.selected)
            // this.selected.forEach(element => {
            //     // this.saveChange(element,this.dataSetId);
            // });
            let o=[];
                for (let j = 0; j < this.options.length; j++) {
                    o.push(this.options[j].id)
                    console.log(o); 
                }
            let so=[];
                for (let k = 0; k < this.selectedOld.length; k++) {
                    so.push(this.selectedOld[k].id)
                    console.log(so);
                }
            let sn=[];
                for (let i = 0; i < this.selected.length; i++) {
                    sn.push(this.selected[i].id)
                    console.log(sn);
                }
            let ns=[];
                ns=(o.filter(fo => !sn.includes(fo)));
                console.log(ns)
            let sc=[];
            let nsc=[];
            console.log(so.length>sn.length,"so="+so,"sn="+sn);
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
               
                // c.forEach(r=>{
                //     // console.log(r.values)
                //     // r.forEach(t=>this.deleteStuff(t, this.dataSetId))
                    
                // })
                this.sc=sc;
                this.nsc=nsc;
            console.log("sc"+this.sc,"nsc"+this.nsc)
          
            // this.loadPage();
            
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
        },
        deleteStuff(e, id){
            fetch(`${PATH}api/room/delete-stuff/${id}/${e}`, {
                method: "POST",
                headers: requestHeader().headers,
            })
            .then((response) => {
                if (!response.ok) {
                    alert("delete false");
                    this.loadPage();
                } else {
                    alert("delete thanh cong");
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