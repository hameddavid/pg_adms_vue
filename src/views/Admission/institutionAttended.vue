<template>
  <div>
    <b-badge class="isCompleted" v-if="forms[0].is_form_completed"  variant="success">This form is completed</b-badge>
    <div v-for="(form , index) in forms" :key="index"> 
        <hr />
    <div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Institution Name</label>
          <input
            class="form-control form-control-sm"
            v-model="forms[index].name_of_institution"
            @input="saveForm"
          />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Institution Address</label>
          <input
            class="form-control form-control-sm"
            v-model="forms[index].address_of_institution"
            @input="saveForm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 form-group">
          <label>Date admitted</label>
          <input
            class="form-control form-control-sm"
            v-model="forms[index].date_admitted"
            @input="saveForm"
          />
        </div>
        <div class="col-md-6 col-sm-12 form-group">
          <label>Graduation Date</label>
          <input
            class="form-control form-control-sm"
            v-model="forms[index].date_graduated"
            @input="saveForm"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Class of degree</label>
        <input
          class="form-control form-control-sm"
          v-model="forms[index].class_of_degree_obtained"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Qualification Obtained </label>
        <input
          class="form-control form-control-sm"
          v-model="forms[index].qualification_obtained"
          @input="saveForm"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Field of study / Discipline</label>
        <input
          class="form-control form-control-sm"
          v-model="forms[index].field_discipline"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Other Qualifications </label>
        <input class="form-control form-control-sm" />
      </div>
    </div>
    <div class="text-center" v-if="index >= 1">
      <button class="mb-2 text-center btn btn-danger btn-sm pt-0 pb-0" @click="removeForm(forms[index].id)">remove</button>
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
  name: "institutionAttended",
  data() {
    return {
      forms: [
        {
          address_of_institution: "",
          class_of_degree_obtained: "",
          date_admitted: "",
          date_graduated: "",
          field_discipline: "",
          institution_details: "",
          is_form_completed: "",
          name_of_institution: "",
          qualification_obtained: "",
        },
      ],
    };
  },
  methods: {
    fillForm() {
      this.forms = this.$store.state.ApplicationForm.applicationForm.institutionDetails;
    },
    saveForm() {
      this.$store.dispatch("ApplicationForm/saveInstitutionDetails", this.forms);
    },
    addForm() {
      axios.post('addAndRemoveInstitution',{type:'add' , applicationId:this.forms[0].application_id})
      .then((response) => {
        this.forms = response.data
      }).catch((err) => {
        console.log(err + 'add institution error')
      });
      this.$forceUpdate();
    },
    removeForm(institutionId){
      axios.post('addAndRemoveInstitution',{type:'remove',  applicationId:this.forms[0].application_id, institutionId:institutionId})
      .then((response) => {
        this.forms = response.data
      }).catch((err) => {
        console.log(err + 'remove institution error')
      });
    }
  },
  mounted() {
    this.fillForm();
  },
  created() {
    // Fire.$on("saveApplicationForm", () => {
    //     console.log('saveInstitutionDetails inititutionAttended')
    //   this.$store
    // .dispatch("ApplicationForm/saveInstitutionDetails", this.form)
    // .then((result) => {
    //     this.$store.dispatch("ApplicationForm/saveApplicationForm");
    // })
    // .catch((err) => {});
    // });
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
