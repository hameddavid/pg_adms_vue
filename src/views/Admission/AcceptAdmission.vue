<template>
  <div>
    <b-modal
      v-model="modalShow"
      id="aceptadmission-modal"
      ref="aceptadmission-modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Accept Admission</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="p-2">
                <span
                        v-if="isLoading"
                        class="spinner-border float-right spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        ></span
                      >
              <div class="border-left border-4 p-2 border-info small-font-1">
                To Accept the admission you pay the acceptance fee
                <br />
                Then medical and caution fee below
              </div>
             
            </div>
            <div class="p-2">
              <div class="shadow-sm border p-2 mb-2">
                <label>Acceptance Fee -- ₦{{ acceptance.amount }}</label>
                <template v-if="acceptance.status">
                  <template
                    v-if="
                      acceptance.status == 'success' ||
                      acceptance.status == 'SUCCESS'
                    "
                  >
                    <label class="text-success float-right">
                      paid
                      <b-icon variant="success" scale="2" icon="check"></b-icon>
                    </label>
                  </template>
                  <template v-else>
                   <div class="d-block ">
                      <button
                      @click="requery(acceptance)"
                      class="btn btn-sm btn-outline-danger mr-1 pt-0 pb-0 rou"
                    >
                      <span
                        v-if="acceptanceBtn"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        >{{ acceptance.busy }}</span
                      >
                      requery
                    </button>
                    <button @click="makePayment(acceptance)" 
                      class=" btn btn-sm btn-outline-success pl-3 pr-3 pt-0 pb-0 rou"
                    >
                      Pay
                    </button>
                   </div>
                  </template>
                </template>
                <button
                  v-else
                  class="btn btn-sm btn-success float-right"
                  @click="makePayment(acceptance)"
                >
                  <span
                    v-if="acceptanceBtn"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    >{{ acceptance.busy }}</span
                  >
                  Pay
                </button>
              </div>
              <div class="shadow-sm border p-2">
                <label>Caution Fee -- ₦{{ caution.amount }} </label>
                <template v-if="caution.status">
                  <template
                    v-if="
                      caution.status == 'success' || caution.status == 'SUCCESS'
                    "
                  >
                    <label class="text-success float-right">
                      paid
                      <b-icon variant="success" scale="2" icon="check"></b-icon>
                    </label>
                  </template>
                  <template v-else>
                    <div class="d-block ">
                      <button @click="requery(caution)"
                      class=" btn btn-sm btn-outline-danger mr-2 pt-0 pb-0 rou"
                    >
                      requery
                    </button>
                    <button @click="makePayment(caution)"
                      class=" btn btn-sm btn-outline-success pl-3 pr-3 pt-0 pb-0 rou"
                    >
                      Pay
                    </button>
                    </div>
                  </template>
                </template>
                <button
                  v-else
                  class="btn btn-sm btn-success float-right"
                  @click="makePayment(caution)"
                >
                  <span
                    v-if="cautionBtn"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    >{{ caution.busy }}</span
                  >
                  Pay
                </button>
              </div>
            </div>
            <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
              <template #overlay>
                <div class="text-center rounded">
                  <!-- <b-icon v-else icon="loading" font-scale="4"></b-icon> -->
                  <b-icon
                    icon="text-paragraph"
                    animation="fade"
                    font-scale="4"
                  ></b-icon>
                </div>
              </template>
            </b-overlay>

            <!-- <div
              class="card-body p-0"
              v-for="(notification, index) in notifications"
              :key="index"
            >
              <component
                :is="switchComponent(notification.type)"
                :notification="notification"
              />
            </div> -->
          </div>
        </div>
      </template>

      <!-- <template #modal-footer="{ ok, cancel, hide }">
        <b>Custom Footer</b>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      busy: false,
      application: "",
      acceptance: "",
      caution: "",
      acceptanceBtn: false,
      cautionBtn: false,
      isLoading:false,
    };
  },
  methods: {
    openModal() {
      return new Promise((res, rej) => {
        this.modalShow = true;
        res();
      });
    },
    onShown() {},
    onHidden() {},
    //caution and acceptance 
    async applicationPayments(payment, rrr){
      return new Promise((res, rej) =>{
        axios.post("/applicationPayments", {payment:payment , rrr:rrr, applicationId: this.application})
        .then((response) => {
         res(response)
        }).catch((err) => {
          Toast.fire({
            icon:'error',
            title:"could not prepare transaction"
          })
        });
      })
    },
    requery(payment){
      this.isLoading=true
      this.$store.dispatch("RemitaStore/checkRRRStatus" , payment.rrr)
      .then(async () => {
      // this.busy = true;
      // this.application = data;
      // await this.openModal();
      await this.checkAcceptance();
      await this.checkCaution();
      this.isLoading=false;
      // this.busy = false;
      }).catch((err) => {
        console.log(err)
        this.isLoading=false;
      });
    },
    checkAcceptance() {
      return new Promise((res, rej) => {
        axios
          .post("checkAcceptance", { applicationId: this.application })
          .then((response) => {
            this.acceptance = response.data.acceptance;
            res(true);
          })
          .catch((err) => {});
      });
    },
    checkCaution() {
      return new Promise((res, rej) => {
        axios
          .post("checkCaution", { applicationId: this.application })
          .then((response) => {
            this.caution = response.data.caution;
            res(true);
          })
          .catch((err) => {});
      });
    },
    async initTransaction(payment) {
      return new Promise((res, rej) => {
        this.$store
          .dispatch("initTransaction", payment)
          .then((response) => {
            res(response);
          })
          .catch((err) => {});
      });
    },
    async getRRR(payment) {
      return new Promise((res, rej) => {
        console.log("get rrr");
        this.$store
          .dispatch("RemitaStore/getRRR", payment)
          .then(async (response) => {
              await this.applicationPayments(payment, response.data.RRR)
            res(response);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    async UpdateTransaction(paymentDetails) {
      return new Promise((res, rej) => {
        this.$store
          .dispatch("RemitaStore/UpdateTransaction", paymentDetails)
          .then((response) => {
            res(response);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    async makePayment(payment) {
      this.isLoading = true;
      try {
        this.acceptance == payment
          ? (this.acceptanceBtn = true)
          : (this.cautionBtn = true);
          if(this.cautionBtn){
           if ( this.acceptance.status == 'pending') {
              Swal.fire({
                icon: "info",
                title: "You have to pay for acceptance.",
                text: "Pay acceptance Fee before paying for Caution",
              });
              this.isLoading = false;
              this.acceptanceBtn = false;
              this.cautionBtn = false;
              return null;
           }
          }

        let RRRdata = "";
        const initTransaction = await this.initTransaction(payment.id);
        payment.orderId = initTransaction.data.value.orderId;
        if (initTransaction.data.type == "checkRRR") {
          RRRdata = {data:{RRR:initTransaction.data.value.rrr}}
          // console.log(RRRdata);
        } else {
          RRRdata = await this.getRRR(payment);
          
        }
        let paymentData = { paymentId: payment.id, rrr: RRRdata.data.RRR };
        const paymentDetails = await this.$store.dispatch(
          "RemitaStore/saveRRR",
          paymentData
        );
        // .then((result) => {

        // }).catch((err) => {

        // });
        this.$store
          .dispatch("RemitaStore/makePayment", paymentDetails.data.transaction)
          .then(async (response) => {
            await this.UpdateTransaction({ ...payment, ...response });
            console.log(response);
            this.acceptance == payment
              ? (this.acceptanceBtn = false)
              : (this.cautionBtn = false);
              this.isLoading=false;
              await this.checkAcceptance();
      await this.checkCaution();
          })
          .catch((err) => {
            this.acceptance == payment
              ? (this.acceptanceBtn = false)
              : (this.cautionBtn = false);
            console.log(err);
          });
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.acceptance == payment
          ? (this.acceptanceBtn = false)
          : (this.cautionBtn = false);

          await this.checkAcceptance();
      await this.checkCaution();
      }
    },
    checkPaymentStatus(payment) {},
  },
  created() {
    Fire.$on("acceptAdmission", async (data) => {
      this.busy = true;
      this.application = data;
      await this.openModal();
      await this.checkAcceptance();
      await this.checkCaution();
      this.busy = false;
    });
  },
};
</script>

<style>
.small-font-1 {
  font-size: 1rem;
}
.rou {
  border-radius: 4rem;
}
</style>
