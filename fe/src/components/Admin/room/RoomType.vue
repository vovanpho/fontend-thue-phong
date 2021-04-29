<template>
    <div>
        <div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Tên loại</label>
                    <input type="text" class="form-control" v-model="form.name" id="" aria-describedby="">
                </div>
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'">Save</button>
                <p class="typo__p" v-if="submitStatus === 'OK'">Saved</p>
                <p class="typo__p" v-if="submitStatus === 'ERROR'"> Please fill or select the form correctly. </p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                id: null ,
                name: ''
            },
            submitStatus: null
        }
    },

    methods: {
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.register(this.form)
            this.submitStatus = 'PENDING'
            setTimeout(() => {
            this.submitStatus = 'OK'
            }, 500)
      }
    },
    register(form) {
      console.log(form)
      fetch(`${PATH}api/room/set-date-type`,
      {  method: 'POST',
          headers: { 
              'Content-Type': 'application/json'  
          },
          body: JSON.stringify(form)
      })
      .then(response => { 
        console.log(response)
          if(!response.ok){
            alert("name already exists")
          }else{
            alert("successfully")
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