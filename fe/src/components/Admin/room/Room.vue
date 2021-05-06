<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1" v-if="perPage>10">
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
      <b-col sm="7" md="6" class="my-1" v-if="perPage>10">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-button @click="addModal = !addModal" class="mr-1">+</b-button>
    <b-modal v-model="addModal" hide-footer >
          <b-input-group class="mb-3" prepend="Name">
              <b-form-input v-model="item.nameRoom"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3" prepend="Price">
              <b-form-input v-model="item.price"></b-form-input>
          </b-input-group>
          <!-- <b-input-group class="mb-3" prepend="Description">
              <b-form-input v-model="item.description"></b-form-input>
          </b-input-group> -->
          <b-form-group
            label="Description"
            class="mb-0"
          >
            <b-form-textarea
              id="textarea-formatter"
              v-model="item.description"
              placeholder="Enter your text"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group class="mt-3 mb-0" label="Lua chon the loai phong">
              <b-form-select v-model="item.roomType.nameTypeRoom" @change="handlerChangeRoomType($event, item.roomType)">
                <option v-for="(selectOption, indexOption) in options" :key='indexOption.id' :value="selectOption.nameTypeRoom" >
                            {{selectOption.nameTypeRoom}} 
                </option>
              </b-form-select>
              <div class="mt-3">Selected: <strong>{{ item.roomType.nameTypeRoom }}</strong></div>
              <b-input-group-append >
                <b-button size="sm" text="Button" variant="success" @click="handlerSaveName(item)">Save</b-button>
              </b-input-group-append>
          </b-form-group>
      </b-modal>
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
                <b-input-group class="mb-3" prepend="Name" v-if="key=='nameRoom'">
                    <b-form-input v-model="row.item[key]"></b-form-input>
                    <b-input-group-append>
                    <b-button size="sm" text="Button" variant="success" @click="handlerSaveName(row.item)">Save</b-button>
                    </b-input-group-append>
                </b-input-group>
                <div  class="p-4 bg-dark"  v-if="key=='roomImgs'" style=" margin: 20px 0;">
                  <p style="color: white;" >Hinh anh phong:</p>
                  <upload-file style="margin: 15px 0;" :dataSetId="row.item.id" dataSetCh="Nomal" ></upload-file>
                  <div style="display: grid; grid-template-columns: 25% 25% 25% 25% ; overflow: hidden; " v-if="row.item[key].length>0">
                    <div v-for="(it,index) in row.item[key]" :key="index" @load="handleLoadImg(it.data)" style="height: 168px; margin: 0 5px;">
                      <img  :src="`data:${it.type};base64,${it.data}`" alt="Image" style="width:100%; height: auto;">
                    </div>
                  </div>
                </div>
                <b-form-group 
                          label="Description"
                          class="mb-0 mb-4"
                          v-if="key=='description'"
                        >
                          <b-form-textarea
                            id="textarea-formatter"
                            v-model="row.item[key]"
                            placeholder="Enter your text"
                          ></b-form-textarea>
                </b-form-group>
                <b-input-group class="mb-3" prepend="Price" v-if="key=='price'">
                    <b-form-input v-model="row.item[key]"></b-form-input>
                    <b-input-group-append>
                    <b-button size="sm" text="Button" variant="success" @click="handlerSaveName(row.item)">Save</b-button>
                    </b-input-group-append>
                </b-input-group >

                <div  class="p-4 bg-dark"  v-if="key=='priceImgs'" style=" margin: 20px 0;">
                  <p style="color: white;">Hinh anh bang gia:</p>
                  <upload-file style="margin: 15px 0;" :dataSetId="row.item.id" dataSetCh="Price"></upload-file>
                  <div style="display: grid; grid-template-columns: 25% 25% 25% 25% ; overflow: hidden;  " v-if="row.item[key].length>0">
                    <div v-for="(it,index) in row.item[key]" :key="index" @load="handleLoadImg(it.data)" style="height: 168px; margin: 0 5px;">
                      <img  :src="`data:${it.type};base64,${it.data}`" alt="Image" style="width:100%; height: auto;">
                    </div>
                  </div>
                </div>
                
                <div v-if="key=='roomType'">
                    <b-form-select v-model="selected" @change="handlerChangeRoomType($event, row.item[key])">
                        <option v-for="(selectOption, indexOption) in options" :key='indexOption.id' :value="selectOption.nameTypeRoom" >
                            {{selectOption.nameTypeRoom}} 
                        </option>
                    </b-form-select>
                    <div class="mt-3">The loai phong: <strong>{{ selected=row.item[key].nameTypeRoom }}</strong></div>
                    <b-input-group-append >
                        <b-button size="sm" text="Button" variant="success" @click="handlerSaveName(row.item)">Save</b-button>
                    </b-input-group-append>
                </div>
                <!-- <div v-if="key=='roomImgs'">
                    <div   v-for="(it,index) in row.item[key]" :key="index" @load="handleLoadImg(it.data)">
                    <img :src="`data:${it.type};base64,${it.data}`">  
                    </div>
                </div> -->
                
                
                
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
import UploadFile from '../UploadFile.vue';
  export default {
    name: "Room",
    components:{
      UploadFile
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
            }
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
          console.log(this.items)
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
          console.log(this.options)
      
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
            console.log(response)
              if(!response.ok){
                alert("Name already exists")
                this.loadPage();
                // this.$refs.table.refresh()
                // this.$router.go(this.$router.currentRoute)
              }else{
                alert("Name ")
                this.loadPage();
                // this.$router.go(this.$router.currentRoute)

              }
            })
          .catch(error => {
                console.log(error)
          });
      },
      handlerChangeRoomType(event, pram){
        this.options.forEach(element => {
          if(element.nameTypeRoom==event){
            pram.id=element.id
            pram.nameTypeRoom=element.nameTypeRoom
          }
        });
        console.log(this.items)
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
      handleLoadImg(data){
        
      },
      froomName(value) {
        // console.log(value)
        return `${value.nameTypeRoom}`
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