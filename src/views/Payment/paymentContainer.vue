<template>
  <div>
    <div class="card shadow-sm border-0">
      <div class="card-body p-0 pb-1">
        <div
          class="p-1 border border-left-0 border-right-0 border-primary text-center"
        >
          <b><label class="text-monospace text-primary">View Payment History</label></b>
        </div>
        <div class="mt-1 pl-2 pr-2">
          <div class="form-group">
            <label>Select Payment Category </label>
            <select
              class="form-control form-control-sm"
              v-model="payment"
              @change="fetchPaymentHistory()"
            >
              <!-- <option>All</option> -->
              <option
                v-for="payment in payments"
                :key="payment.id"
                :value="payment"
              >
                {{ payment.type }} -- {{ payment.details }}
              </option>
            </select>
          </div>
        </div>
        <!-- <template v-if="paymentDetails.length == 0">
            <div>Nothing</div>
        </template> -->
        <template>
          <ul class="list-group">
            <li
              class="list-group-item p-0 mb-2 border-0"
              v-for="(details, index) in paymentDetails"
              :key="index"
            >
              <div class="card border shadow-sm text-uppercase text-monospace">
                <div class="card-body p-2">
                   <span
                          v-if="details.busy"
                          class="spinner-border spinner-border-sm float-right"
                          role="status"
                          aria-hidden="true"
                        >
                        </span>
                  <div class="row no-gutters">
                    <div class="col small-font">ID {{ details.orderId }}</div>
                    <div class="col-8 mb-1" >
                      
                      <div class="text-right" v-if="details.status == 'success' || details.status == 'SUCCESS'">
                        <button v-if="details.amount == null" @click="crossCheckPayment(details)" v-b-tooltip.hover title="Update payment Details" class="pt-0 pb-0 d-inline btn-sm btn btn-outline-secondary small-font">
                          re-query
                        </button>
                        <button
                        @click="showReceipt(details)"
                        class="ml-1 mr-1 btn btn-info pt-0 pb-0 btn-sm small-font"
                      >
                        receipt
                      </button>
                      </div>


                      <!-- <button
                        v-if="details.status == 'success' || details.status == 'SUCCESS'"
                        @click="showReceipt(details)"
                        class="float-right ml-1 mr-1 btn btn-info pt-0 pb-0 btn-sm small-font"
                      >
                        receipt
                      </button> -->
                      
                      <!-- @click="checkRRRStatus(details.rrr)" -->
                      <button v-else
                        @click="checkRRRStatus(details, index)"
                        :disabled="details.busy"
                        class="float-right ml-1 mr-1 btn btn-outline-info pt-0 pb-0 btn-sm small-font"
                      >
                        re-query
                      </button>
                        
                    </div>
                  </div>
                  <div
                    class="text-white rounded pl-2 pr-2"
                    :class="colorForPaymentContainer(details.status)"
                  >
                    <div class="row">
                      <div class="col small-font">
                        Status {{ details.status }}
                      </div>
                      <div class="col small-font">
                        <label class="float-right small-font text-monospace">
                          Amount {{ details.amount }}
                        </label>
                      </div>
                    </div>
                    <div class="small-font">RRR {{ details.rrr }}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- <div class="d-block">
            <button
              class="btn-run-outline-primary btn-run text-goldenrod btn-sm"
            >
              View All
            </button>
            <button
              class="btn-run-outline-primary btn-run text-goldenrod btn-sm"
            >
              123
            </button>
          </div> -->
        </template>
      </div>
    </div>
    <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
      <template #overlay>
        <div class="text-center rounded">
          <h5 v-if="displayMessage" class="text-danger text-monospace">
            {{ displayMessage }}
          </h5>
          <!-- <b-icon v-else icon="loading" font-scale="4"></b-icon> -->
          <b-icon
            v-else
            icon="text-paragraph"
            animation="fade"
            font-scale="4"
          ></b-icon>
        </div>
      </template>
    </b-overlay>
    <receipt/>
  </div>
</template>

<script>
import receipt from './receipt.vue';
export default {
  components: { receipt },
  data() {
    return {
      payments: [],
      payment: "",
      paymentDetails: [],
      busy: false,
      displayMessage: "",
    };
  },
  methods: {
    crossCheckPayment(payment){
      payment.busy = true
      axios.post('crossCheckPayment', {rrr:payment.rrr})
      .then((response) => {
        payment.busy = false;
        this.fetchPaymentHistory();
      }).catch((err) => {
        Toast.fire({
          icon:"error",
          title:"unable to update payment"
        })
      });
    },
    showReceipt(payment){
      Fire.$emit('loadreceipt', payment);
    },
    colorForPaymentContainer(status){
      if (status == 'success' || status == 'SUCCESS') {
        return 'bg-success'
      } else {
        return 'bg-danger'
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    onShown() {},
    onHidden() {},
    // emit(eventName, value){
    //   return new Promise(())
    // },
    checkOrder(orderId) {
      Fire.$emit("remitaCheckOrder", orderId);
      console.log(orderId);
    },
    async checkRRRStatus(details, index) {
      details.busy = true;
      this.$forceUpdate();
      await Fire.$emit("remitaCheckRRRStatus", details, index);
      console.log("after await");
    },
    async fetchPaymentHistory() {
      this.busy = true;
      axios
        .post("fetchPaymentHistory", this.payment)
        .then(async (response) => {
          this.paymentDetails = response.data.value;
          if (this.paymentDetails.length < 1) {
            this.displayMessage = "No record for the payment selected";
            await this.sleep(2000);
          }
          this.displayMessage = "";
          this.busy = false;
        })
        .catch(async (err) => {
          this.displayMessage = "Error fetching selected payment records";
          await this.sleep(2000);
          this.displayMessage = "";
          this.busy = false;
        });
    },
  },
  created() {
    axios
      .post("applicantPaymentList")
      .then((response) => {
        this.payments = response.data.value;
      })
      .catch((err) => {});
    Fire.$on("remitaCheckRRRStatusResponse", (response, index) => {
      this.fetchPaymentHistory();
      // this.checkAndUpdatePayment(response, index);
      // console.log(response, index);
    });
  },
};
</script>

<style>
.small-font {
  font-size: 0.75rem;
}

</style>
