<template>
  <div class="">
    <div class="row mt-5">
      <div class="col">
        <template v-if="previousForm">
          <button
            class="btn btn-link text-darkblue btn-sm"
            @click="previousStep(previousForm)"
            buzztech-data="nextPrevious"
          >
            {{ previousForm.name }}
          </button>
        </template>
      </div>
      <div class="col">
        <template v-if="nextForm">
          <button
            class="btn btn-link text-darkblue float-right btn-sm"
            @click="nextStep(nextForm)"
            buzztech-data="nextStep"
          >
            {{ nextForm.name }}
          </button>
        </template>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Application Form</div>
      <div class="card-body">
        <div>
          <h4 class="text-center">
            <b>{{ currentform.name }}</b>
          </h4>
        </div>
        <keep-alive>
          <transition name="slide-fade">
            <component :is="currentform.com" />
          </transition>
        </keep-alive>
        <div>
          <!-- <template v-if="previousForm"> -->
          <button
            class="btn btn-dark"
            @click="previousStep(previousForm)"
            :disabled="!previousForm"
            buzztech-data="nextPrevious"
          >
            Previous
          </button>
          <!-- </template> -->

          <template>
            <button
              class="btn btn-secondary float-right"
              @click="nextStep(nextForm)"
              v-if="nextForm"
              buzztech-data="nextStep"
            >
              Next
            </button>
            <button
              class="btn btn-outline-primary float-right"
              @click="submitForm"
              v-else
            >
              <span
                v-if="busy"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submit
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import personaldetails from "./psersonaldetails";
import InstitutionAttended from "./institutionAttended.vue";
import employmenthistory from "./employmenthistory.vue";
import AssestmentForm from "./AssestmentForm.vue";

import Credentials from "./credentials.vue";
import Reference from "./Reference.vue";
export default {
  components: {
    personaldetails,
    InstitutionAttended,
    employmenthistory,
    AssestmentForm,
    Reference,
    Credentials,
  },
  data() {
    return {
      busy: false,
      dob: "",
      currentform: {
        index: 0,
        com: "personaldetails",
        name: "Personal details",
      },
      options: [
        { item: "M", name: "Male" },
        { item: "F", name: "Female" },
      ],
      formSteppers: [
        {
          name: "Personal details",
          key: "personaldetails",
        },
        {
          name: "Institution(s) Attended",
          key: "InstitutionAttended",
        },
        {
          name: "Employment History",
          key: "employmenthistory",
        },
        {
          name: "Assestment Form",
          key: "AssestmentForm",
        },
        {
          name: "Reference",
          key: "Reference",
        },
        {
          name: "Credentials",
          key: "Credentials",
        },
      ],
    };
  },
  methods: {
    nextStep(nextform) {
      this.currentform.com = nextform.key;
      this.currentform.name = nextform.name;
      this.currentform.index = this.currentform.index + 1;
      this.$store.dispatch("ApplicationForm/saveApplicationForm");
      // Fire.$emit('saveApplicationForm')
    },
    previousStep(pform) {
      this.currentform.com = pform.key;
      this.currentform.name = pform.name;
      this.currentform.index = this.currentform.index - 1;
      this.$store.dispatch("ApplicationForm/saveApplicationForm");
      // Fire.$emit('saveApplicationForm')
    },
    async submitForm() {
      this.busy = true;
      let validatio = await this.validatePersonalData();
      // console.log("okay")
      // console.log(validatio)
      this.busy = false;
    },
    validatePersonalData() {
      return new Promise((res, rej) => {
        this.$store
          .dispatch("ApplicationForm/validateForm")
          .then((response) => {
            //   Fire.$emit("editForm", "back");
            if(response == true){
              Fire.$emit("editForm", "back");
            }
            // console.log('here');
            this.busy = false;
            res(true)
          })
          .catch((err) => {
            console.log(err);
            this.busy = false;
          });
      });
    },
    validateIntitution() {},
    validateEmployment() {
      return new Promise((res, rej) => {});
    },
    validateAssestment() {
      return new Promise((res, rej) => {});
    },
    validateReference() {
      return new Promise((res, rej) => {});
    },
    validateCredentials() {
      return new Promise((res, rej) => {});
    },
  },
  computed: {
    nextForm() {
      if (this.currentform.index == 5) {
        return false;
      }
      return this.formSteppers[this.currentform.index + 1];
    },
    previousForm() {
      if (this.currentform.index == 0) {
        return false;
      }
      return this.formSteppers[this.currentform.index - 1];
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
