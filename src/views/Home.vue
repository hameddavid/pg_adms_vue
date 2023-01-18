<template>
  <div>
    <nav
      class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark"
      id="mainNav"
    >
      <div class="container">
        <img
          src="@/assets/runlogo.png"
          alt=""
          style="height: 70px"
          class="img-fluid"
        />
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="nav navbar-nav ml-auto text-uppercase"></ul>
        </div>
      </div>
    </nav>

    <header class="masthead intro-head vh-100">
      <div class="text-center">
        <div class="intro-text">
          <div class="intro-lead-in ">
            <span class="text-white pr-2 " style="background-color:rgb(21 42 122 / 75%)" 
              >Welcome to the Postgraduate Portal</span
            >
          </div>
          <div class="intro-heading text-uppercase">
            <span style="color: goldenrod">Never stop being a student</span>
          </div>
          <button @click="registerRoute"
            class="btn mt-2 btn-secondary btn-lg text-uppercase js-scroll-trigger"
            role="button"
            href="#services"
            >Create application</button
          >
          &nbsp;
          <button  @click="loginRoute"
            class="btn mt-2 btn-lg text-uppercase text-white js-scroll-trigger" style="background-color:#152a7a"
            role="button"
            href="#services"
            > Applicant Login</button
          >
          <div class="mt-2">
            <a class="btn btn-lg text-uppercase text-white btn-link" href="http://record.run.edu.ng" style="background-color:goldenrod">Student Login</a>
          </div>
        </div>
      </div>
      <footer></footer>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import image from "@/assets/intro-bg.jpg";
export default {
  name: "Home",
  data() {
    return {
      active: "guide",
      image,
    };
  },
  methods: {
    loginRoute() {
      this.$router.push({ name: "login" });
    },
    registerRoute() {
      this.$router.push({ name: "register" });
    },
    studentLoginRoute(){
      this.$router.push({name: "studentLogin"});
    },
  },
};
</script>
<style >
.intro-head {
  background-image: url("../assets/bg3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
#mainNav {
  background-color: #142a7a !important;
  padding-top: 25px;
  padding-bottom: 25px;
  transition: padding-top 0.3s, padding-bottom 0.3s;
  border: none;
  background-color: transparent;
}
header.masthead {
  text-align: center;
  color: #fff;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: 50%;
  background-size: cover;
}
header.masthead .intro-text {
  padding-top: 150px;
  padding-bottom: 100px;
}
header.masthead .intro-text .intro-lead-in {
  font-size: 22px;
  font-style: italic;
  line-height: 22px;
  margin-bottom: 25px;
  font-family: Droid Serif, Helvetica Neue, Helvetica, Arial, sans-serif;
}
header.masthead .intro-text .intro-heading {
  font-size: 50px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 25px;
  font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;
}
@media (min-width: 768px) {
  header.masthead .intro-text {
    padding-top: 300px;
    padding-bottom: 200px;
  }
  header.masthead .intro-text .intro-lead-in {
    font-size: 40px;
    font-style: italic;
    line-height: 40px;
    margin-bottom: 25px;
    font-family: Droid Serif, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  header.masthead .intro-text .intro-heading {
    font-size: 75px;
    font-weight: 700;
    line-height: 75px;
    margin-bottom: 50px;
    font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
}
</style>
