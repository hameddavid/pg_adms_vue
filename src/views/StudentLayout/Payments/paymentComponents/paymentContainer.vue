<template>
  <div>
      <component 
      :is="currentComponent" 
      :cumplusoryFee="cumplusoryFee"
      :optionalFee="optionalFee" 
      :percentage="percentage" 
      :History="History" 
      ></component>
  </div>
</template>

<script>
import paymentList from "./payment.list.vue"
export default {
    components:{paymentList},
    props: ["cumplusoryFee", "optionalFee", "percentage", "History"],
    data() {
        return {
            currentComponent:paymentList
        }
    },

    methods: {
        handleBackButton(){
            alert('browser-back');
            console.log("back button")
        }
    },
    mounted() {
        },

    created() {
        window.onbeforeunload = function() { alert("going some where") };
        document.addEventListener("backbutton", this.handleBackButton, false);
        Fire.$on("PAYMENTLIST", ()=>{
            this.currentComponent = paymentList
        })
    },
}
</script>

<style>

</style>