<template>
  <div
    class="btn-group-fab dontprintbtn"
    role="group"
    @click="visible = !visible"
    :class="visible ? 'actice' : ''"
    aria-label="FAB Menu"
  >
    <b-button-group>
      <button
        id="takeTourId"
        class="btn btn-sm btn-primary rou"
        @click="startTour"
      >
        take tour
      </button>
      <button class="btn btn-sm btn-warning rou">
        help <b-icon icon="question-circle"></b-icon>
      </button>
    </b-button-group>
    <b-popover
    variant="warning"
    ref="takeTourPopOver"
      target="takeTourId"
      placement="top"
      :show=popOverTakeTour
      triggers=""
      @show="onShow"
      @shown="onOpen"
      @hidden="onClose"
    >
      Click here to take a tour <br/> of the current page
    </b-popover>
  </div>
</template>

<script>
export default {
  props: {
    tourFor: String,
  },
  data() {
    return {
      visible: false,
      popOverTakeTour: false,
    };
  },
  methods: {
   
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    onShow() {
     this.sleep(8000)
    .then(() => {
    this.$refs.takeTourPopOver.$emit("close");
    }).catch((err) => {
      
    });
    },
    onOpen() {},
    onClose() {
    },
    startTour() {
      //   console.log(this.tourFor)
      Fire.$emit(`${this.tourFor}`);
    },
  },
  mounted() {
    this.sleep(4000)
    .then(() => {
    this.$refs.takeTourPopOver.$emit("open");
    }).catch((err) => {
      
    });
    // this.popOverTakeTour = true
    // this.$refs.takeTourPopOver.$emit("open");
    //   console.log(this.tourFor);
  },
};
</script>

<style scoped>
.rou {
  border-radius: 4rem;
}
.btn-group-fab {
  position: fixed;
  /* width: 50px; */
  height: auto;
  right: 1.5rem;
  bottom: 20px;
}
.btn-group-fab div {
  position: relative;
  width: 100%;
  height: auto;
}
/* .btn-group-fab .btn {
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  display: block;
  margin-bottom: 4px;
  width: 40px;
  height: 40px;
  margin: 4px auto;
}
.btn-group-fab .btn-main {
  width: 50px;
  height: 50px;
  right: 50%;
  margin-right: -25px;
  z-index: 9;
} */

@media print {
  .dontprintbtn{
      display: none;
  }
    }
</style>
