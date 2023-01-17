<template>
  <div>
    <!-- <template v-if="tourFor"> -->
      <v-tour name="admissionTour" :steps="admissionTour"></v-tour>
      <v-tour name="admissionFormTour" :steps="admissionForm"></v-tour>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  name: "admission-tour",
  props: {
    tourFor: String,
  },
  data() {
    return {
      dynStep: [],
      admissionTour: [
        {
          target: '[buzztech-data="profileImage"]', // We're using document.querySelector() under the hood
          content: `Click here to add/change your profile photo`,
          params: {
            placement: "top",
          },
        },
        //   {
        //       target:'[buzztech-data="profileImageUploadBtn"]',
        //       content: `click <strong>here</strong> to upload or cancel `,
        //       params:{
        //           placement:'top'
        //       }
        //   },
        {
          target: '[buzztech-data="createApplication"]',
          content: `Click the Create Application Button to pay the application fee and start the application process`,
        },
        //   {
        //     target: '[buzztech-data="1"]',
        //     content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
        //     params: {
        //       placement: 'top'
        //     }
        //   },
        {
          target: '[buzztech-data="applicationLists"]',
          content: `When the application payment is successful, the application shows here click the <strong>Fill Form button</strong> to start filling it`,
          params: {
            placement: "top",
          },
        },
        {
          target: '[buzztech-data="paymentContainer"]',
          content: `view your payment history here <strong>Select a payment category</strong> and view history in that category `,
          params: {
            placement: "top",
          },
        },
      ],
      admissionForm: [
        {
          target: '[buzztech-data="nextStep"]', // We're using document.querySelector() under the hood
          content: `Click the <strong>next button</strong> to fill the next form <br>
          Form contents are saved when the Next button is clicked`,
          params: {
            placement: "bottom",
          },
        },
        {
          target: '[buzztech-data="nextPrevious"]',
          content: `Use the <strong>Previous button</strong> to move to the previous form <br>
          Form contents are saved when the Previous button is clicked
          `,
          params: {
            placement:'bottom'
          },
        },
        {
            target:'[buzztech-data="backButton"]',
            content:`Click here to go back`
        }
      ],
    };
  },
  mounted: function () {
    // this.dynStep = this.step;
    //   this.$tours['admissionTour'].start()
  },
  created() {
    Fire.$on("admissionTour", async() => {
    //   this.dynStep = await this.admissionPortalStep;
      this.$tours["admissionTour"].start();
    });
    Fire.$on("admissionFormTour", async () => {
    //   this.dynStep = await this.admissionFormStep;
    //   console.log("here tour");
      this.$tours["admissionFormTour"].start();
    });
  },
};
</script>
<style></style>
