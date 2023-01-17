<template>
  <div>
    <div class="bg-hold"></div>
    <nav
      class="navbar navbar-dark border-bottom border-warning border-5 fixed-top bg-dark"
      id="mainNav"
    >
      <div class="container">
        <img
          src="@/assets/runlogo.png"
          alt=""
          style="height: 60px"
          class="img-fluid"
        />
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="nav navbar-nav ml-auto text-uppercase"></ul>
        </div>
      </div>
    </nav>
    <div class="container middle-hold">
      <div class="row justify-content-center">
        <div class="col-sm-12 my-auto">
          <div class="card shadow-sm mx-auto mt-5">
            <div
              class="card-header text-center text-white"
              style="background-color: #00008b"
            >
              <b>Create Account</b>
            </div>
            <div class="card-body">
              <template>
                <div class="text-center mt-1">
                  <b class="text-danger small-font">{{ error.message }}</b>
                </div>
              </template>
              <ValidationObserver v-slot="{ invalid }">
                <!-- <form @submit.prevent="regform" id="regform"> -->
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <ValidationProvider rules="required">
                      <div class="form-group" slot-scope="{ errors }">
                        <label class="float-left"> Surname </label>
                        <input
                          autocomplete="family-name"
                          name="surname"
                          v-model="form.surname"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          placeholder="surname"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <ValidationProvider name="firstname" rules="required">
                      <div class="form-group" slot-scope="{ errors }">
                        <label class="float-left"> First Name </label>
                        <input
                          name="firstname"
                          autocomplete="name"
                          v-model="form.firstname"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          placeholder="firstname"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label class="float-left"> Middle Name</label>
                      <ValidationProvider
                        :rules="{ required: true }"
                        v-slot="{ errors }"
                      >
                        <input
                          name="middlename"
                          autocomplete="additional-name"
                          v-model="form.lastname"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          placeholder="Middle Name"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label class="float-left">Mobile </label>
                      <ValidationProvider
                        :rules="{
                          required: true,
                          min: 11,
                          mobile: 11,
                          takenMobile: check.mobile,
                        }"
                        v-slot="{ errors }"
                      >
                        <input
                          name="mobile"
                          autocomplete="mobile"
                          max="11"
                          type="tel"
                          v-model="form.mobile"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          placeholder="mobile"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label class="float-left"> Email </label>
                      <ValidationProvider
                        name="email"
                        :rules="{
                          required: true,
                          email: true,
                          takenEmail: check.email,
                        }"
                        v-slot="{ errors }"
                      >
                        <input
                          name="email"
                          autocomplete="email"
                          v-model="form.email"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          type="email"
                          placeholder="Email"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label class="float-left">Password</label>
                      <ValidationProvider
                        :rules="{ required: true, min: 6 }"
                        v-slot="{ errors }"
                      >
                        <input
                          name="password"
                          autocomplete="new-password"
                          v-model="form.password"
                          class="form-control form-control-sm"
                          :class="errors[0] ? 'is-invalid' : ''"
                          type="password"
                          placeholder="password"
                        />
                        <span class="text-danger float-right">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-outline-primary btn-block round-corners rou"
                    type="button"
                    @click="regform"
                    :disabled="invalid"
                  >
                    <span
                      v-if="loadingState"
                      class="spinner-grow spinner-grow-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Register
                  </button>
                  <!-- <button @click="test">cs</button> -->
                  <div class="mt-1 d-block" v-if="form.isRegistered">
                    <button
                      class="btn btn-info text-center"
                      @click="verifyEmailModal"
                    >
                      Verify Email
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <button class="btn btn-link" @click="loginRoute">
                        Have an account? Login
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-link float-right"
                        @click="forgotPasswordRoute"
                      >
                        Forgot Password
                      </button>
                    </div>
                  </div>
                </div>
                <!-- </form> -->
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
      <verifyemail />
    </div>
  </div>
</template>

<script>
// import { Form,} from 'vform'
import verifyemail from "./VerifyEmail.vue";
export default {
  name: "Register",
  components: { verifyemail },
  data() {
    return {
      loadingState: false,
      error: {
        message: "",
        state: false,
      },
      form: {
        surname: "",
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
        password: "",
        isRegistered: false,
      },
      applicant: {},
      check: {
        email: false,
        mobile: false,
      },
    };
  },
  methods: {
    async checkEmailorMobile(type) {
      return new Promise((res, rej) => {
        let value = type == "email" ? this.form.email : this.form.mobile;
        axios
          .post("checkEmailorMobile", { type: type, value: value })
          .then((response) => {
            console.log(response);
            if (type == "email") {
              this.check.email = response.data.value;
              res(response.data.value);
            } else {
              this.check.mobile = response.data.value;
              res(response.data.value);
            }
          })
          .catch((err) => {
            console.log("unable to check");
            rej();
          });
      });
    },
    test() {
      this.axios
        .post("/test")
        .then((r) => {
          console.log(r);
        })
        .catch((err) => {});
    },
    verifyEmailModal() {
      this.$root.$emit("bv::show::modal", "verifymodal", "#btnShow");
    },
    loginRoute() {
      this.$router.push({ name: "login" });
    },
    forgotPasswordRoute() {
      this.$router.push({ name: "forgotpassword" });
    },
    async regform() {
      let mobile = await this.checkEmailorMobile("mobile");
      let email = await this.checkEmailorMobile("email");
      if (!mobile && !email) {
        this.loadingState = true;
        axios
          .post("/pgCreateAccount", this.form)
          .then((response) => {
            console.log(response);
            if (response.data.msg == "success") {
              this.loadingState = false;
              // TODO verify email disabled
              // this.verifyEmailModal();
              this.form.isRegistered = true;
              this.applicant = response.data.applicant;
              // console.log('dispatch')
              // console.log()
              this.$store.dispatch("getUser", this.applicant);
              //TODO Remove 
              Toast.fire({
                icon:"info",
                title:"Account Created Successfully, Pls Login"
              });
              this.$router.replace({name:'login'});

            }
          })
          .catch((err) => {
            this.error.message = err.response.data.error;
            this.error.state = true;
            this.loadingState = false;
          });
      } else {
        Toast.fire({
          icon: "info",
          title: "Check for errors on the form",
        });
      }
    },
  },
  watch: {
    // form:{
    //   deep:true,
    // handler(){
    // }
    // },
    "form.email": function () {
      this.check.email = false;
    },
    "form.mobile": function () {
      this.check.mobile = false;
    },
  },
};
</script>

<style lang="scss">
.border-5 {
  border-width: 5px !important;
}
.bg-hold {
  background-image: url("../../assets/bg3.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
@media (max-width: 576px) {
  .middle-hold {
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
    width: 95vw;
  }
}
@media (min-width: 576px) {
   .middle-hold {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 95vw;
  }
}

</style>
