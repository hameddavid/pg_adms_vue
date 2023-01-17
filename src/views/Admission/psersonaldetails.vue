<template>
  <div>
    <b-badge class="isCompleted" v-if="form.is_form_completed" variant="success">This form is completed</b-badge>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Title</label>
        <select
          class="form-control form-control-sm"
          v-model="form.title"
          @change="saveForm"
        >
          <option value="MR">Mr.</option>
          <option value="MRS">Mrs.</option>
          <option value="MISS">Miss</option>
        </select>
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Gender</label>
        <b-form-radio-group
          v-model="form.gender"
          :options="genders"
          class=""
          @change="saveForm"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-radio-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Marital Status</label>
        <select
          class="form-control form-control-sm"
          v-model="form.marital_status"
          @change="saveForm"
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Separated">Separated</option>
          <option value="Divorced">Divorced</option>
          <option value="widowed">widowed</option>
        </select>
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Date of birth</label>
        <b-form-datepicker
          v-model="form.date_of_birth"
          @input="saveForm"
          locale="en"
        ></b-form-datepicker>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <label> State of origin </label>
        <select
          class="form-control form-control-sm"
          v-model="form.state_of_origin"
          @change="saveForm"
        >
          <option v-for="(state, index) in states" :key="index">
            {{ state }}
          </option>
        </select>
      </div>
      <div class="col-md-6 col-sm-12">
        <label>place of birth</label>
        <input
          class="form-control form-control-sm"
          v-model="form.place_of_birth"
          @input="saveForm"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Place of birth local Gov</label>
        <input
          class="form-control form-control-sm"
          v-model="form.place_of_birth_LG"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Nationality</label>
        <input
          class="form-control form-control-sm"
          v-model="form.nationality"
          @input="saveForm"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Health Status</label>
        <input
          class="form-control form-control-sm"
          v-model="form.health_status"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Residential Address</label>
        <textarea
          class="form-control"
          v-model="form.residential_address"
          @input="saveForm"
        ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Contact Address</label>
        <textarea
          class="form-control"
          v-model="form.contact_address"
          @input="saveForm"
        ></textarea>
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label>Next of kin's name</label>
        <input
          class="form-control form-control-sm"
          v-model="form.next_of_kin_name"
          @input="saveForm"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 form-group">
        <label>Next of kin's Relationship</label>
        <input
          class="form-control form-control-sm"
          v-model="form.next_of_kin_relationship"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12 form-group">
        <label> Next of kin's email </label>
        <input
          class="form-control form-control-sm"
          v-model="form.next_of_kin_email"
          @input="saveForm"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <label>Next of kin's phone</label>
        <input
          class="form-control form-control-sm"
          v-model="form.next_of_kin_phone"
          @input="saveForm"
        />
      </div>
      <div class="col-md-6 col-sm-12">
        <label>Next of kin's Address</label>
        <textarea
          class="form-control"
          v-model="form.next_of_kin_address"
          @input="saveForm"
        ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col mb-2">
        <label>Hobbies</label>
        <textarea
          class="form-control"
          v-model="form.hobbies"
          @input="saveForm"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personaldetails",
  data() {
    return {
      form: {
        title: "",
        gender: "",
        marital_status: "",
        date_of_birth: "",
        state_of_origin: "",
        place_of_birth: "",
        place_of_birth_LG: "",
        nationality: "",
        health_status: "",
        residential_address: "",
        contact_address: "",
        next_of_kin_name: "",
        next_of_kin_relationship: "",
        next_of_kin_email: "",
        next_of_kin_phone: "",
        next_of_kin_address: "",
        hobbies: "",
        picture: "",
      },
      genders: [
        { item: "M", name: "Male" },
        { item: "F", name: "Female" },
      ],
      gender: "",
      dob: "",
      states: [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "FCT - Abuja",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
      ],
    };
  },
  methods: {
    fillForm() {
      this.form = this.$store.state.ApplicationForm.applicationForm.personalDetails
    },
    saveForm() {
      this.$store.dispatch("ApplicationForm/savePersonalDetails", this.form);
      // Fire.$on('tempSaveApplicationForm', this.form)
    },
  },
  mounted() {
    this.fillForm();
  },
  created() {
    // Fire.$on('saveApplicationForm',()=>{
    //   console.log('personal Details comp ')
    //   this.$store.dispatch("ApplicationForm/savePersonalDetails", this.form)
    //   .then((result) => {
    //     this.$store.dispatch("ApplicationForm/saveApplicationForm");
    //   }).catch((err) => {
        
    //   });
    // })
    // Fire.$on('tempSaveApplicationForm')
    // console.log(this.$store.state.ApplicationForm);
    // this.$store.dispatch("ApplicationForm/test");
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
