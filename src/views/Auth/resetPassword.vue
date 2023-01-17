<template>
  <div class="card border-0 shadow-sm mx-auto">
    <h4 class="text-center">Reset Password</h4>
    <div class="card-body">
      <b-alert show dismissible variant="success" v-model="sentRes"> Email sent </b-alert>
      <ValidationObserver v-slot="{ invalid }">
        <ValidationProvider
          rules="required|email"
          name="email"
          v-slot="{ errors }"
        >
          <div class="form-group">
            <label class="float-left ml-3"> Email </label>
            <input
              v-model="email"
              class="form-control form-control-md rou"
              :class="errors[0] ? 'is-invalid' : ''"
              placeholder="Enter your email address"
            />
          </div>
          <span class="text-danger float-right">{{ errors[0] }}</span>
        </ValidationProvider>
        <button
          class="btn btn-outline-danger mt-3 mb-3 btn-block rou"
          :disabled="invalid"
          @click="ResetPassword"
        >
          <span
            v-if="btn"
            class="spinner-grow spinner-grow-sm mr-1"
            role="status"
            aria-hidden="true"
          ></span>
          Reset Password
        </button>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <button
                class="btn btn-primary btn-block btn-sm rou"
                @click="loginRoute"
              >
                Login
              </button>
            </div>
            <div class="col">
              <button
                class="btn btn-secondary btn-block btn-sm rou"
                @click="registerRoute"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      btn: false,
      sentRes: false,
    };
  },
  methods: {
    registerRoute() {
      this.$router.push({ name: "register" });
    },
    loginRoute() {
      this.$router.push({ name: "login" });
    },
    ResetPassword() {
      this.btn = true;
      axios
        .post("/forgotPassword", { email: this.email })
        .then((response) => {
          if (response.data.value) {
              this.sentRes = true
              Fire.$emit("RESETTOKENSENT",this.email);
          }
          this.btn = false;
        })
        .catch((err) => {
          this.btn = false;
        });
    },
   
  },
};
</script>
