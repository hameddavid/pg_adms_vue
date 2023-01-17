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

    <div class="middle-hold">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-6 my-auto">
          <div class="card shadow-sm mx-auto mt-5">
            <div
              class="p-3 w-100 m-auto shadow text-center bg-darkblue text-white"
            >
              <b>Welcome, Login with your credentials</b>
            </div>
            <div class="card-body">
              <template>
                <div class="text-center mt-1">
                  <b class="text-danger small-font">{{ error.message }}</b>
                </div>
              </template>
              <ValidationObserver v-slot="{ invalid }">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <label class="float-left">Email</label>
                    <input
                      autocomplete="email"
                      v-model="form.email"
                      name="email"
                      class="form-control form-control-sm"
                      :class="errors[0] ? 'is-invalid' : ''"
                      placeholder="Email"
                    />
                    <span class="text-danger float-right">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label class="float-left">Password</label>
                    <input
                      autocomplete="current-password"
                      v-model="form.password"
                      name="password"
                      class="form-control form-control-sm"
                      :class="errors[0] ? 'is-invalid' : ''"
                      placeholder="Password"
                      type="password"
                    />
                    <span class="text-danger float-right">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="text-center mt-4 mb-2">
                  <button
                    class="btn-run btn-run-outline-primary w-50 rou"
                    type="button"
                    :disabled="invalid"
                    @click="login"
                  >
                    <span
                      v-if="loadingState"
                      class="spinner-grow spinner-grow-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Login
                  </button>
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <button
                        class="btn btn-link float-left"
                        @click="homeRoute"
                      >
                        Home
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-light float-right"
                        @click="forgotPasswordRoute"
                      >
                        Forgot password ?
                      </button>
                    </div>
                  </div>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentLogin",
  data() {
    return {
      loadingState: false,
      error: {
        message: "",
        state: false,
      },
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    homeRoute() {
      this.$router.push({ name: "Home" });
    },
    forgotPasswordRoute() {
      this.$router.push({ name: "forgotpassword" });
    },
    login() {
      this.loadingState = true;
      this.$store
        .dispatch("studentLogin", this.form)
        .then((user) => {
          if (user.type == "applicant") {
            this.loadingState = false;
            // this.$store.dispatch("getApplicationPayment");
            this.$router.replace({ name: "Home" });
          } else if (user.type == "student") {
            this.$router.replace({ name: "studentlayout" });
          }
        })
        .catch((err) => {
          this.error.message = err.response.data.error;
          this.error.state = true;
          this.loadingState = false;
        });
    },
  },
};
</script>
<style lang="scss">
.border-5 {
  border-width: 5px !important;
}
.rou {
  border-radius: 4rem;
}
.bg-hold {
  background-image: url("../../assets/bg3.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.middle-hold {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
}
</style>
