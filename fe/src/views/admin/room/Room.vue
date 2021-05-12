<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1" v-if="totalRows>10">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6" class="my-1" v-if="totalRows>10">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col sm="7" md="6" class="my-1" >
        <b-button size="sm" @click="addModal = !addModal" class="mr-1">Room Add</b-button>
        <b-modal v-model="addModal" hide-footer >
              <b-input-group class="mb-3" prepend="Name">
                  <b-form-input v-model="item.nameRoom"></b-form-input>
              </b-input-group>
              <b-input-group class="mb-3" prepend="Price">
                  <b-form-input v-model="item.price"></b-form-input>
              </b-input-group>
              <b-form-group label="Description">
                <b-form-textarea
                  id="textarea-formatter"
                  v-model="item.description"
                  placeholder="Enter your text"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Lua chon the loai phong">
                  <room-type  v-on:eventChange="handlerChangeRoomType($event)"></room-type>
              </b-form-group>
              <!-- tro cap -->
                <!-- <b-form-group >
                  <list-stuff ></list-stuff>                
                </b-form-group> -->
              <b-form-group>
                  <b-input-group-append >
                    <b-button size="sm" text="Button" variant="success" @click="handlerSaveName(item)">Save</b-button>
                  </b-input-group-append>
              </b-form-group>
          </b-modal>
      </b-col>
    </b-row>
   
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      hover
    >
      <template #cell(index)="data">
            {{ data.index + 1 }}
      </template>
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>
  

      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} edit details
        </b-button>
        <!-- <b-button size="sm"  @click="deleteRoomType(row.item)"><b-icon icon="trash" aria-hidden="true"></b-icon>
        </b-button> -->
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key.id">
              <!-- name -->
                <b-input-group class="mb-3" prepend="Name" v-if="key=='nameRoom'">
                    <b-form-input v-model="row.item[key]"></b-form-input>
                </b-input-group>
              <!-- anh phong -->
                <div  class="p-4 bg-dark"  v-if="key=='roomImgs'" style=" margin: 20px 0;">
                  <p style="color: white;" >Hinh anh phong:</p>
                  <upload-file style="margin: 15px 0;" 
                  :dataSetId="row.item.id" dataSetCh="Nomal" 
                  :dataSetImgs="row.item[key]"
                  v-on:eventCallLoadPage="loadPage">
                  </upload-file>
                </div>
              <!-- mo ta -->
                <b-form-group label="Description" class="mb-0 mb-4" v-if="key=='description'">
                    <b-form-textarea
                      id="textarea-formatter"
                      v-model="row.item[key]"
                      placeholder="Enter your text"
                ></b-form-textarea>
                </b-form-group>
              <!-- tro cap -->
                <div v-if="key=='stuffs'">
                  <list-stuff :dataSetListStuff="row.item[key]" 
                  :dataSetId="row.item.id" 
                  v-on:eventChangeStuff="handlerChangeStuff($event,row.item[key])">
                  </list-stuff>                
                </div>
              <!-- tien -->
                <b-input-group class="mb-3" prepend="Price" v-if="key=='price'">
                    <b-form-input v-model="row.item[key]"></b-form-input>
                </b-input-group >
              <!-- anh tien -->
                <div  class="p-4 bg-dark"  v-if="key=='priceImgs'" style=" margin: 20px 0;">
                  <p style="color: white;">Hinh anh bang gia:</p>
                  <upload-file style="margin: 15px 0;" 
                  :dataSetId="row.item.id" dataSetCh="Price" 
                  :dataSetImgs="row.item[key]" 
                  v-on:eventCallLoadPage="loadPage"></upload-file>
                </div>
                <!-- loai phong -->
                <div v-if="key=='roomType'">
                  <room-type :dataSetName="row.item[key].nameTypeRoom" v-on:eventChange="handlerChangeRoomType($event,row.item[key])"></room-type>
                </div>
                <b-button v-if="key=='roomType'" size="sm" text="Button" variant="success" @click="handlerSaveName(row.item)">Save</b-button>
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>

  </b-container>
</template>
<style scoped src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<script>
import {PATH, requestHeader} from '../../../index/index.js'
import axios from "axios";
import UploadFile from '../../../components/Admin/UploadFile.vue';
import RoomType from '../../../components/Admin/room/RoomType.vue';
import ListStuff from '../../../components/Admin/stuffs/ListStuff.vue';
  export default {
    name: "Room",
    components:{
      UploadFile,
      RoomType,
      ListStuff
    },
    data() {
      return {
        items: [],
        item:{
            id: null,
            createdDate: null,
            createdBy: null,
            lastModifiedDate: null,
            lastModifiedBy: null,
            nameRoom: "",
            description: "",
            price: null,
            roomType: {
                id: null,
                createdDate: null,
                createdBy: null,
                lastModifiedDate: null,
                lastModifiedBy: null,
                nameTypeRoom: ""
            }, 
            stuffs: []
        },
        fields: [
          'index',
          { key: 'nameRoom', label: 'Name', sortable: true },
          { key: "roomType", label: "Room", formatter:'froomName' },
          {
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: null,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        addModal:false,
        options: null,
        selected: null
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },

    created(){
      this.loadPage();
      this.loadPageDataRoomType();
    },
    methods: {
      loadPage(){
        axios.get(`${PATH}api/room/getdata`,{
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
                }
        })
        .then(response=>{
          this.items=response.data;
          this.totalRows =response.data.length
        })
      },
      loadPageDataRoomType(){
        axios.get(`${PATH}api/room-type/get-list-data`,{
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

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      handlerSaveName(e){
        console.log(e)
          fetch(`${PATH}api/room/set-data-room`,
          { method: 'POST',
            headers: requestHeader().headers,
            body: JSON.stringify(e)
          })
          .then(response => { 
              if(!response.ok){
                alert("Name already exists")
                this.loadPage();
              }else{
                alert("Name ")
                this.loadPage();
              }
            })
          .catch(error => {
                console.log(error)
          });
      },
      handlerChangeRoomType(event, pram){
        if(pram){
          this.options.forEach(element => {
            if(element.nameTypeRoom==event){
              pram.id=element.id
              pram.nameTypeRoom=element.nameTypeRoom
            }
          });
        }
        this.options.forEach(element => {
            if(element.nameTypeRoom==event){
              this.item.roomType.id=element.id
              this.item.roomType.nameTypeRoom=element.nameTypeRoom
            }
          });
      },
      handlerChangeStuff(dt,pram){
        if(pram){
          pram=dt
          console.log(pram)
        }else{
          this.stuffs.push(dt)
          console.log(this.stuffs)
        }
        
       
      },
      deleteRoomType(e){
        fetch(`${PATH}api/room-type/delete`, {
          method: "POST",
          headers: requestHeader().headers,
          body: JSON.stringify(e),
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
      },
      froomName(value) {
        // console.log(value)
        return `${value.nameTypeRoom}`
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
              this.loadPage();
            } else {
              // alert("delete thanh cong");
              this.loadPage();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }
  }
</script>
<style >
ul,li{
   list-style: none; 
}
.modal-backdrop{
  opacity: 0.5;
}
</style>