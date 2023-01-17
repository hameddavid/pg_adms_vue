<template>
  <div>
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
    <div class="container">
      <div class="row vh-100 justify-content-center">
        <div class="col-sm-12 col-md-6 my-auto">
          <transition name="fade">
          <component :is="currentComp" :email="email"></component>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resetPassword from './resetPassword.vue'
import newPassword from './newPassword.vue'
export default {
  components:{resetPassword, newPassword},
  data() {
    return {
      email:null,
      currentComp:resetPassword
    };
  },
  methods: {
    // registerRoute() {
    //   this.$router.push({ name: "register" });
    // },
    // loginRoute() {
    //   this.$router.push({ name: "login" });
    // },
    // ResetPassword() {
    //   this.btn = true;
    //   axios
    //     .post("/forgotPassword", { email: this.email })
    //     .then((response) => {
    //       this.sentRes = true;
    //       this.btn = false
    //     })
    //     .catch((err) => {
    //       this.btn = false
    //     });
    // },
  },
  created() {
    Fire.$on("GOTORESET",()=>{
      this.currentComp = resetPassword
    });
    Fire.$on('RESETTOKENSENT', (email) => {
      this.email = email;

      this.currentComp = newPassword;
    })
  },
};
</script>

<style>
.rou {
  border-radius: 4rem;
}
</style>
