<template>
  <div>
    <b-badge class="isCompleted" v-if="form[0].is_form_completed" variant="success">This form is completed</b-badge>
    <div v-for="(data, index) in form" :key="index">
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Organisation name</label>
          <input
            class="form-control form-control-sm"
            v-model="form[index].organisation"
            @input="saveForm"
          />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Address</label>
          <input
            class="form-control form-control-sm"
            v-model="form[index].address"
            @input="saveForm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Date From</label>
          <b-form-datepicker
            
            v-model="form[index].start_date"
            @input="saveForm"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Date To</label>
          <b-form-datepicker
            
            v-model="form[index].end_date"
            @input="saveForm"
            class="mb-2"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Last Post Held</label>
          <input
            class="form-control form-control-sm"
            v-model="form[index].last_post_held"
            @input="saveForm"
          />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Last salary per annum</label>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="form[index].last_salary_per_annum"
            @input="saveForm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Reason for leaving</label>
          <textarea
            class="form-control"
            v-model="form[index].reason_for_leaving"
            @input="saveForm"
          ></textarea>
        </div>
      </div>
       <div class="text-center" v-if="index >= 1">
      <button class="mb-2 text-center btn btn-danger btn-sm pt-0 pb-0" @click="removeForm(form[index].id)">remove</button>
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
</template>

<script>
export default {
  name: "employmenthistory",
  data() {
    return {
      form: [
        {
          address: "",
          application_id: "",
          end_date: "",
          id: "",
          is_form_complete: "",
          last_post_held: "",
          last_salary_per_annum: "",
          organisation: "",
          reason_for_leaving: "",
          start_date: "",
        },
      ],
    };
  },
  methods: {
    fillForm() {
      this.form = this.$store.state.ApplicationForm.applicationForm.employmentHistory;
    },
    saveForm() {
      this.$store.dispatch("ApplicationForm/saveEmploymentHistory", this.form);
    },
    addForm() {
      axios.post('addAndRemoveEmployment',{type:'add', applicationId:this.form[0].application_id})
      .then((response) => {
        this.form = response.data
      }).catch((err) => {
        console.log(err + 'add employment error')
      });
      // let index = this.form.length;
      // this.form[index] = {
      //   address: "",
      //   application_id: "",
      //   end_date: "",
      //   id: "",
      //   is_form_complete: "",
      //   last_post_held: "",
      //   last_salary_per_annum: "",
      //   organisation: "",
      //   reason_for_leaving: "",
      //   start_date: "",
      // };
      this.$forceUpdate();
      // console.log(this.form);
    },
    removeForm(employmentId){
      axios.post('addAndRemoveEmployment',{type:'remove', applicationId:this.form[0].application_id,employmentId:employmentId})
      .then((response) => {
        this.form = response.data
      }).catch((err) => {
        console.log(err + 'remove employment error');
      });
    }
  },
  mounted() {
    this.fillForm();
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
