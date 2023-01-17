<template>
  <div>
    <b-popover
      :custom-class="popData.customClass"
      :target="popData.target"
      placement="right"
      :show.sync="popData.show"
      :variant="popData.bgColor"
      triggers="manual"
      ref="popOver"
      id="popOver"
      @show="onShow"
      @shown="onOpen"
      @hidden="onClose"
    >
      <template #title v-if="popData.title != ''" :class="popData.titleColor"
        >{{ popData.title }}
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
      </template>
      <b :class="popData.messageColor">{{ popData.message }}</b>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "popOver",
  props: {},
  data() {
    return {
      popData: {
        customClass: "",
        show: false,
        target: "",
        title: "",
        message: "",
        buttons: [],
        bgColor: "",
        titleColor: "",
        messageColor: "",
        timer: { show: 100, hide: 20 },
      },
      showState: 0,
    };
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async onOpen() {
      if (this.showState == 0) {
        const closed = await this.onClose();
      } else {
        //    const closed = await this.onClose();
      }
    this.sleep(100)
    .then(() => { 
        this.$refs.popOver.$emit("open");
        console.log('here')
        })
    .then(()=>{
        this.sleep(5000)
        .then(() => {this.onClose()})
    })
      console.log("popOver Open");
    },
    async onClose() {
      return new Promise((res, rej) => {
        try {
          this.$refs.popOver.$emit("close");
          this.showState = 0;
          res(true);
        } catch (error) {
          rej(error);
        }
      });

      // this.popData.show = false
    },
    onShow() {
      this.showState = 1;
      if (this.popData.show) {
        console.log("show is true");
        console.log(this.popData.target);
      } else {
        console.log("show is false");
        console.log(this.popData.target);
      }
    },
  },
  async created() {
    Fire.$on("validationPopOver", (data) => {
      console.log("validationPopOver" + data.action);
      let popData = { ...this.popData, ...data };
      this.popData = popData;
      if (data.action == "onOpen") {
        this.onOpen();
      } else {
        this.onClose();
      }
    });
  },
};
</script>

<style></style>
