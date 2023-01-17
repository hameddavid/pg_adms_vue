<template>
   <div class="">
        <template v-if="window.width> 769">
        <div class="card border-0 bg-transparent">
        <div class="card-body">
          <div class="row">
            <div class="col p-0 p-md-2">
              <student-payment />
            </div>
            <div class="col p-0 p-md-2">
              <div class="shadow">
                <student-courses />
              </div>
            </div>
          </div>
        </div>
      </div>
      </template>

      <template v-else>
       <div>
         <div class="row">
           <div class="col-sm-12 mb-3">
             <student-payment></student-payment>
         </div>

         <div class="col-sm-12">
           <student-courses/>
         </div>
         </div>
         <!-- <transition name="fade">
           <keep-alive>
           <component :is="currentComponent" class="mb-5" />
         </keep-alive>
         </transition> -->
         <!-- <nav class="mobile-bottom-nav">
      <div class="mobile-bottom-nav__item " @click="$router.push({name:'studentPortal'})" :class="$router.history.name == 'studentPortal' ? 'mobile-bottom-nav__item--active':  ''">
        <div class="mobile-bottom-nav__item-content">
        <div>
            <b-icon icon="credit-card" class="material-icons text-center" aria-hidden="true"></b-icon>
        </div>
          <b>Home</b>
        </div>
      </div>
      <div @click="$router.push({name:'studentPayment'})" class="mobile-bottom-nav__item" :class="$router.history.name == 'studentPayment' ? 'mobile-bottom-nav__item--active':  ''">
        <div class="mobile-bottom-nav__item-content">
          <div>
            <b-icon icon="book" class="material-icons text-center"></b-icon>
          </div>
          <b>Payment</b>
        </div>
      </div>
    </nav> -->
       </div>
      </template>
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
      // console.log(this.$router)
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
    gotoHome(){
      console.log(this.router)
      this.router.push({name:"studentPortal"});
    }
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
</style>
