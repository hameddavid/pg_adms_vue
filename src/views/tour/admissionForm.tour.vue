<template>
  <div>
      <v-tour name="admissionFormTour" :step="steps" ></v-tour>
  </div>
</template>

<script>
export default {
    name:'admissionForm',
    data() {
        return {
            steps:[
                {
                    target:'[buzztech-data="nextStep"]',
                    content:``,
                    params:{
                        placement:'top'
                    }
                },
                {
                    target:'[buzztech-data="nextPrevious"]',
                    content:``,
                    params:{
                        placement:'top'
                    }
                },
                // {
                //     target:'[buzztech-data=""]'
                // }
            ]
        }
    },
    created() {
        Fire.$on('admissionForm', ()=>{
            this.$tours['admissionFormTour'].start()
        })
    },

}
</script>

<style>

</style>