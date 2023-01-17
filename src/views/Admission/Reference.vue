<template>
  <div>
    <b-badge class="isCompleted" v-if="forms[0].is_form_completed" variant="success">This form is completed</b-badge>
    <div>
      <div v-for="(form, index) in forms" :key="index">
        <hr/>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Full name</label>
          <input class="form-control form-control-sm" v-model="forms[index].fullname"  @input="saveForm"/>
        </div>
        <div class="col-md-6 col-sm-12 form-group">
           <label>Title</label>
           <select class="form-control form-control-sm" v-model="forms[index].title" @change="saveForm">
             <option value="MISS">MISS</option>
             <option value="MR">MR</option>
             <option value="MRS">MRS</option>
           </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Organisation</label>
          <input class="form-control form-control-sm" v-model="forms[index].organisation" @input="saveForm" />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
           <label>Position </label>
          <input class="form-control form-control-sm" v-model="forms[index].position" @input="saveForm" />
         
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Phone</label>
          <input class="form-control form-control-sm" v-model="forms[index].phone" @input="saveForm" autocomplete="tel" />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Email</label>
          <input class="form-control form-control-sm" v-model="forms[index].email" @input="saveForm" autocomplete="email" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Address</label>
          <textarea class="form-control" v-model="forms[index].address" @input="saveForm" ></textarea>
        </div>
        <!-- <div class="col-md-6" col-sm-12 form-group>
          <label>Contact Details</label>
          <textarea class="form-control" v-model="forms[index].contactDetails" @input="saveForm" ></textarea>
        </div> -->
      </div>
     
        <div class="text-center" v-if="index >= 1">
      <button class="mb-2 text-center btn btn-danger btn-sm pt-0 pb-0" @click="removeForm(forms[index ].id)">remove</button>
    </div>
      </div>

       <div class="text-center">
      <button
        class="btn-run-outline-primary btn-run text-goldenrod"
        @click="addForm()"
      >
        Add More
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "referenceform",
  data() {
    return {
      forms: [
        {
        fullname: "",
        position: "",
        organisation: "",
        email: null,
        phone: null,
        title: null,
        // contactDetails: "",
        address: "",
      },
      ]
    };
  },
  methods: {
   
    saveForm(){
      this.$store.dispatch("ApplicationForm/saveReference",this.forms);
    },
    fillForm(){
      this.forms = this.$store.state.ApplicationForm.applicationForm.reference
    },
    addForm(){
     
      axios.post('addAndRemoveRefree',{type:'add', applicationId:this.forms[0].application_id})
      .then((response) => {
        this.forms = response.data
      }).catch((err) => {
        console.log('reference error')
      });
      this.$forceUpdate()
    },
    removeForm(refreeId){
      axios.post('addAndRemoveRefree', {type:'remove', applicationId:this.forms[0].application_id, refreeId:refreeId})
      .then((response) => {
        this.forms = response.data
      }).catch((err) => {
        console.log(err + 'remove reference form')
      });
    }
  },
  mounted() {
    this.fillForm()
  },
};
</script>

<style>
.isCompleted{
    position: absolute; 
    overflow: hidden; 
    /* left:40rem; */
     top:4rem;
     border-radius: 25px; 
     z-index:100
  }
</style>
