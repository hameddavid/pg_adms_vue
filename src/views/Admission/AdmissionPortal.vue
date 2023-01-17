<template>
  <div class="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      class="shadow bg-darkblue border-bottom border-danger"
    >
      <div class="container">
        <b-navbar-brand href="#">
          <picture>
            <source srcset="@/assets/run.png" media="(max-width: 576px)" />
            <!-- <source srcset="@/assets/run.png" media="(min-width: 576px)" style="hieght: 3.6rem; width: 25rem"  /> -->
            <img srcset="@/assets/runlogo.png" alt="…" class="app-logo" />
          </picture>
          <!-- <img class="app-logo" style="hieght: 3.6rem; width: 25rem" /> -->
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <notification class="float-right" />
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ $store.state.User.fullname }}</em>
              </template>
              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
              <b-dropdown-item href="#" @click="signOut"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <div class="container">
      <!-- TODO verify email disabled -->
      <!-- <template v-if="!$store.state.User.isVerified">
        <b-alert show variant="success" class="pt-0 pb-0">
          <div class="row align-items-center">
            <div class="col">Activate your account by verifying your email</div>
            <div class="col">
              <button
                class="btn btn-outline-danger float-right m-3"
                @click="resendVerifyMail"
              >
                Verify Mail
              </button>
            </div>
          </div>
        </b-alert>
      </template> -->

      <template >
        <template v-if="!editAdmissionform">
          <div class="row mt-3">
            <div class="col">
              <profileimage class="profilePos float-right" />
            </div>
            <div class="col align-self-center">
              <button
                buzztech-data="createApplication"
                class="mt-4 mb-4 btn-run-outline-primary btn-run text-goldenrod float-right mb-2 btn-sm"
                @click="selectProgrammeType"
              >
                Create Application
                <!-- <font-awesome-icon icon="plus" /> -->
              </button>
              <!-- <button class="btn btn-sm btn-danger mt-4 mb-4 float-right mb-2" @click="testrem">test</button> -->
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-sm-12">
              <applicationlist buzztech-data="applicationLists" />
            </div>
            <div class="col-md col-sm-12">
              <payment-container buzztech-data="paymentContainer" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="card border-0 shadow">
            <div class="card-header bg-light border-0">
              <button
                class="btn btn-danger"
                @click="editForm('back')"
                buzztech-data="backButton"
              >
                <font-awesome-icon icon="arrow-left" />
                Back
              </button>
              <!-- The view validator modal -->
              <admission-validator></admission-validator>
            </div>
            <div class="card-body">
              <regform />
            </div>
          </div>
        </template>
      </template>
    </div>
    <programme-type-modal/>
    <verifyemail />
    <remitapayment />
    <admissionTour :tourFor="tourFor" />
    <fabButton :tourFor="tourFor" />
    <!-- validate profile image -->
     <b-modal v-model="validateProfileModal" title="BootstrapVue" hide-footer
      hide-header no-close-on-backdrop centered>
        <!-- <template #default="{ hide }"> -->
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Upload Prolie Image</span>

                <!-- <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon> -->
              </div>
            </div>
      <div class="card-body p-3">
         <div class="row">
           <div class="col-6 offset-4 ">
             <profileimage class="profilePos"/>
           </div>
         </div>
      <div class="row p-3"> 
        <div class="col mt-5">
             <div class="d-block">
           <label class="mt-3 text-danger text-center">
             Please your passport photogragh is required for the admission process. Click to upload it.
           </label>
         </div>
        </div>
      </div>
      </div>
          </div>
        </div>
      <!-- </template> -->
  </b-modal>
  </div>
</template>

<script>
import verifyemail from "../Auth/VerifyEmail";
import regform from "./registrationForm";
import applicationlist from "./ApplicationList";
import paymentContainer from "../Payment/paymentContainer";
import admissionTour from "../tour/admission.tour";
import AdmissionValidator from './admissionValidator.vue';
import ProgrammeTypeModal from '../../components/programme.type.modal.vue';
export default {
  components: { regform, applicationlist, paymentContainer, admissionTour,AdmissionValidator, ProgrammeTypeModal },
  data() {
    return {
      profileImage: null,
      validateProfileModal:false,
      // tourFor:'admissionFormTour',
      // applicationList: [
      //   { id: 1, programme: "MSC computer", status: "pending" },
      //   { id: 2, programme: "MSC computer eng", status: "submitted" },
      //   { id: 3, programme: "MSC computer eng", status: "approved" },
      //   { id: 4, programme: "MSC computer eng", status: "denied" },
      // ],
      editAdmissionform: false,
    };
  },
  computed: {
    tourFor() {
      if (!this.editAdmissionform) {
        return "admissionTour";
      } else {
        return "admissionFormTour";
      }
    },
  },

  methods: {
    tourForValue() {
      if (!this.editAdmissionform) {
        return "admissionTour";
      } else {
        return "admissionFormTour";
      }
    },
    testrem() {
      let dtat = [{ id: 1, name: "paul" }];
      axios
        .post("test/remita", dtat)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resendVerifyMail() {
      this.$store
        .dispatch("resendVerifyMail", this.$store.state.User)
        .then((response) => {
          console.log(response);
          this.$root.$emit("bv::show::modal", "verifymodal", "#btnShow");
        })
        .catch((err) => {});
    },
    signOut() {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.replace({ name: "login" });
        })
        .catch((err) => {});
    },
    editForm(back) {
      if (back == "back") {
        Fire.$emit("saveApplicationForm");
      }
      this.editAdmissionform = !this.editAdmissionform;
    },

    selectProgrammeType() {
      Fire.$emit('programmetype-modal');
    },
  },
  created() {
    Fire.$on("validateProfileImg" , ()=>{
      // console.log("validateProfileImg")
      this.validateProfileModal = true
    }),
    Fire.$on('closeValidateProfileImgModal', ()=>{
      // console.log()
      this.validateProfileModal = false
    })
    Fire.$on("remitaSuccess", (data) => {
      this.$store
        .dispatch("paymentApplicationSuccess", data)
        .then((response) => {
          this.$store
            .dispatch("applicationLists")
            .then((result) => {})
            .catch((err) => {
              console.log(
                "error after payment application success while getting application list"
              );
            });
        })
        .catch((err) => {
          console.log(
            "Was successful from remita buh error on paymentApplicationSuccess action"
          );
        });
    });

    Fire.$on("remitaFail", (data) => {
      console.log("remita fail listener admission");
    });

    Fire.$on("editForm", (list) => {
      if(list == 'back'){
        this.editForm(list);
      }else{
         this.$store
        .dispatch("applicationForm", list)
        .then((result) => {
          this.editForm();
        })
        .catch((err) => {});
      }
     
    });
  },
};
</script>

<style scoped>
.border-5 {
  border-width: 5px !important;
}
.app {
  background-color: aliceblue;
  height: 100vh;
}
@media (max-width: 576px) {
  .app-logo {
    height: 2.6rem;
    width: 5rem;
  }
}
@media (min-width: 576px) {
  .app-logo {
    height: 3.2rem;
    width: 25rem;
  }
}

@media (max-width: 576px) {
  .profilePos {
    position: absolute;
    left: 1rem;
    top: -1rem;
    z-index: 100;
  }
}
@media (min-width: 576px) {
  .profilePos {
    position: absolute;
    left: 1rem;
    top: -1rem;
    z-index: 100;
  }
}

@media (min-width: 768px) {
  .profilePos {
    position: absolute;
    left: 1rem;
    top: -1rem;
    z-index: 100;
  }
}

@media (min-width: 992px) {
  .profilePos {
    position: absolute;
    left: 1rem;
    top: -1rem;
    z-index: 100;
  }
}

@media (min-width: 1200px) {
  .profilePos {
    position: absolute;
    left: 1rem;
    top: -1rem;
    z-index: 100;
  }
  .upload {
    position: absolute;
    left: 10rem;
    top: 20rem;
    z-index: 100;
  }
}

/*Profile Pic End*/
</style>
>
