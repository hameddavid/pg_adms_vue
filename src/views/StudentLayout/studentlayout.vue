<template>
  <div class="bg-cus  dontprintcom">
    <div class="mt-2 p-2 w-100">
      <div class="card bg-transparent border-0">
        <div class="card-body bg-transparent">
          <img src="@/assets/run.png" style="height: 80px" class="img-fluid dontprintcom" />
          <div class="float-right dontprintcom">
            <b-icon
              icon="question-circle-fill"
              variant="light"
              class="rounded p-2 mr-4 mt-4"
              scale="2"
            ></b-icon>
            <b-icon
              icon="bell-fill"
              variant="light"
              class="rounded p-2 ml-4 mt-4"
              scale="2"
            ></b-icon>
            <b-icon
              icon="three-dots-vertical"
              variant="light"
              class="rounded mt-4 ml-5 p-2"
              scale="2"
            ></b-icon>
          </div>
        </div>
      </div>
    <div class="container-fluid dontprintcom">
        <template v-if="window.width> 769">
        </template>
        <template v-else>
            <nav class="mobile-bottom-nav">
      <div class="mobile-bottom-nav__item " @click="$router.push({name:'studentPortal'})" :class="this.$router.history.current.name == 'studentPortal' ? 'mobile-bottom-nav__item--active':  ''">
        <div class="mobile-bottom-nav__item-content">
        <div>
            <b-icon icon="credit-card" class="material-icons text-center" aria-hidden="true"></b-icon>
        </div>
          <b>Home </b>
        </div>
      </div>
      <div @click="$router.push({name:'studentPayment'})" class="mobile-bottom-nav__item" :class="this.$router.history.current.name == 'studentPayment' ? 'mobile-bottom-nav__item--active':  ''">
        <div class="mobile-bottom-nav__item-content">
          <div>
            <b-icon icon="book" class="material-icons text-center"></b-icon>
          </div>
          <b>Payment</b>
        </div>
      </div>
    </nav>
        </template>
      <div class="float-left">
        <ul class="list-group quick-link" v-if="window.width> 769">
    <li class="list-group-item mb-1 border-0 border-1 shadow-sm" @click="$router.push({name:'studentPortal'})">
      <div class="text-monospace text-center"><b>Home</b></div>
    </li>
    <li class="list-group-item shadow-sm" @click="$router.push({name:'studentPayment'})">
      <div><b>Payment</b></div>
    </li>
</ul>

        <!-- <ul class="quick-link " v-if="window.width> 769">
          <li @click="$router.push({name:'studentPortal'})">Home</li>
          <li @click="$router.push({name:'studentPayment'})">Payment</li>
        </ul> -->
      </div>
        <div class="container">
          <router-view></router-view>
      </div>
    </div>

    </div>
   
  </div>
</template>

<script>
import StudentCourses from "./Courses/Student..Courses.vue";
import StudentPayment from "./Payments/Student.Payment.vue";

export default {
  components: { StudentPayment, StudentCourses },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      currentComponent:"StudentPayment"
    };
  },
  created() {
    console.log(this.$router.history.current.name)
    this.$router.push({name:"studentPortal"})
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
};
</script>

<style lang="scss">

@media (max-width: 576px) {
  .quick-link {
    position: absolute;
    left:4rem ;
    top:10rem;
    z-index:100;

  }
}

@media (min-width: 576px) {
  .quick-link {
     position: absolute;
    left:4rem ;
    top:10rem;
    z-index:100;
  }
}


@media (min-width: 768px) {
  .quick-link {
    position: absolute;
    left: 1rem;
    top: 10rem;
    z-index: 100;
  }
}

@media (min-width: 992px) {
  .quick-link {
     position: absolute;
    left:1rem ;
    top:10rem;
    z-index:100
  }
}

@media only screen and (min-width: 1200px) {
  .quick-link {
     position: absolute;
    left:2rem ;
    top:10rem;
    z-index:100
  }
}

.bg-cus {
  background-image: url("../../assets/bg-color.svg");
  color: #444;
  background-color: #fff;
  -webkit-box-align: center;
  align-items: center;
  background-size: 100% 396px;
  background-repeat: no-repeat;
  /* display: -webkit-box; */
  display: flex;
  -webkit-box-orient: vertical;
  /* -webkit-box-direction: normal; */
  flex-direction: column;
  /* -webkit-box-pack: justify; */
  justify-content: space-between;
  /* font-size: 16px; */
  /* min-width: 375px; */
  /* /* -webkit-transition: background-color 0.3s ease-out; */
  transition: background-color 0.3s ease-out;
  /* padding: 0 40px 0 72px; */
}

.mobile-bottom-nav{
	position:fixed;
	bottom:0;
	left:0;
	right:0;
	z-index:1000;
	will-change:transform;
	transform: translateZ(0);
	
	display:flex;	
	
	height:50px;
	
	box-shadow: 0 -2px 5px -2px #333;
	background-color:#fff;
	
	&__item{
		flex-grow:1;
		text-align:center;
		font-size:12px;
		
		display:flex;
		flex-direction:column;
		justify-content:center;
	}
	&__item--active{
		//dev
		color:rgb(49, 60, 223);
	}
	&__item-content{ 
		display:flex;
		flex-direction:column;		
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}
.dontprint{
    display: none;
}
@media print {
  .dontprintcom {
    display: none;
  }
}
</style>
