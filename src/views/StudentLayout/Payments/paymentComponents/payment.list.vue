<template>
  <div class="p-2 border rounded bg-light shadow">
    <div >
      <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-alert show>Important note : <b> 60% of the cumplusory fee is needed for course registration </b> </b-alert>
        <div class="d-block border-0 p-1" v-b-toggle.accordion-3>
          <label class="m-0">Cumplusory Fee</label>
          <label class="m-0 float-right"
            >Balance ₦{{ cumplusoryFeeTotal }}</label
          >
        </div>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body class="p-1">
          <div
            class="d-block bg-info rounded-pill"
            v-for="(fee, index) in cumplusoryPayments"
            :key="index"
          >
            <div class="mt-1 ml-2 mr-2 text-white">
              <label class="text-monospace m-0 p-0">{{ fee.type }}</label>
              <label class="text-monospace float-right m-0 p-0">
                ₦{{ fee.amount }}
              </label>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <div class="d-block border-0 p-1" v-b-toggle.accordion-1>
          <label class="m-0">Optional Fee</label>
          <label class="m-0 float-right">Balance ₦{{ optionalFeeTotal }}</label>
        </div>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div
            class="d-block bg-info rounded-pill"
            v-for="(fee, index) in optionalPayments"
            :key="index"
          >
            <div class="mt-1 ml-2 mr-2 text-white">
              <label class="text-monospace m-0 p-0">{{ fee.type }}</label>
              <label class="text-monospace float-right m-0 p-0">
                ₦{{ fee.amount }}
              </label>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>

    <hr class="w-100 my-1" />
    <!-- history -->

    <div class="p-2 bg-aliceblue">
      <div class="d-block">
        <b-button v-b-toggle.history class="btn-sm btn-block"
          >View Payment History</b-button
        >
        <b-collapse id="history" class="mt-2">
        <div class="">
          <div class="card" v-for="(transaction, index) in studentTranssactions" :key="index">
            <div class="card-body pt-3 pl-2 pr-2 pb-1 border-4 border-left border-info">
              <div>
                <div class="float-left">Date {{transaction.created_at}}</div>
                <div class="float-right" v-if="transaction.status !='pending'">
                  <button class="btn btn-sm rounded btn-success" @click="showReceipt(transaction)">receipt</button>
                </div>
                <br/>
                <div class="mt-2" >
                  <div class="float-left"> <b>Amount {{transaction.amount}}</b> </div>
                  <div class="float-right" v-if="transaction.status =='pending'">
                    <b :class="transaction.status =='pending'? 'text-danger ' : 'text-success'" >{{transaction.status}}</b>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

          <!-- <div class="d-block w-100">
            <label class="text-primary"> + More Details</label>
          </div> -->
        </b-collapse>
      </div>

      <!-- <div class="row bg-light">
        <div class="col">
          <label class="m-0">TOTAL</label>
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              <hr class="m-0 w-50 border-3 border-success float-right" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="mb-0 float-right">₦{{ optionalFeeTotal }}</label>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="row font-weight-bold text-danger">
        <div class="col">OUTSTANDING</div>
        <div class="col">
          <label class="m-0 float-right">₦280000</label>
        </div>
      </div> -->
      <div class="">
        <!-- <button
          class="btn btn-success btn-sm rounded-bottom mx-2 font-weight-bold my-1"
          @click="modalShow = !modalShow"
        >
          Pay Fees
        </button> -->
        <!-- <button
          class="btn btn-info rounded-bottom mx-2 btn-sm font-weight-bold"
        >
          Receipt
        </button> -->
      </div>
    </div>
    <b-modal
      v-model="modalShow"
      id="makePaymentModal"
      ref="makePaymentModal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Select Payment</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="border m-1 p-2 shadow-sm" id="cumplusoryFeeMakePayment">
                <span>Cumplusory Fee's Total amount ₦{{cumplusoryFeeTotal}} </span>
                <input type="number" class="form-control form-control-sm" v-model="cumplusoryAmountToBePaid" placeholder="Enter the amount to be paid" @change=""/>
              </div>
              <ul class="list-group">
                <li
                  class="list-group-item mb-2 border-top-0 border-right-0 mx-1 border-2 border-bottom border-warning pt-1 pl-2 pr-2 pb-1"
                  v-for="(f, index) in fee"
                  v-show="f.amount"
                  :key="index"
                >
                  <div class="row">
                    <div class="col">
                      <b-form-checkbox
                        class="d-inline"
                        @input="selectPayment($event, f, index)"
                        v-model="selectedPayment[index]"
                        >{{ f.type }}</b-form-checkbox
                      >
                      <template v-if="paymentSelection[index]">
                        <input
                          class="float-right form-control w-25 form-control-sm d-inline"
                          :disabled="!f.installment"
                          type="number"
                          @input="changeAmount($event, index)"
                          v-model.number="paymentSelection[index].amount"
                        />
                      </template>
                    </div>
                  </div>
                  <hr class="p-0 mb-0 ml-0 mr-0 mt-1" />
                  <div class="row">
                    <div class="col">
                      <b>₦{{ f.amount }}</b>
                    </div>
                    <div class="col">
                      <!-- <b class="float-right">₦20000</b> -->
                    </div>
                  </div>
                </li>
                <!-- <li class="list-group-item">
                  <b-form-checkbox  class="d-inline">Small</b-form-checkbox> 
                  <input class="float-right form-control w-50 form-control-sm d-inline"   />
                </li> -->
              </ul>
              <div class="p-2">
                <div class="row">
                  <div class="col">
                    <label class=""> Total ₦{{ calculateAmountToBePaid() }} </label>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-sm btn-outline-primary float-right"
                      @click="makePayment"
                    >
                     <span
                      v-if="payBtn"
                      class="spinner-grow spinner-grow-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                      Pay
                    </button>
                  </div>
                </div>
                <span class="text-danger">{{ errorMsg }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
    </div>
    <studentreceipt></studentreceipt>
  </div>
</template>

<script>
import studentreceipt from '../../../Payment/studentreceipt.vue';
// import collect from "collect.js";
// import { forEach } from "lodash";
// import { forEach, toArray } from "lodash";
export default {
  components: { studentreceipt },
  props: ["cumplusoryFee", "optionalFee", "percentage", "History"],
  data() {
    return {
      // cumplusoryFeeTotal: "",
      // optionalFeeTotal: "",
      modalShow: false,
      fee: [...this.optionalFee],
      cumplusoryPercentage: [60, 40],
      cumplusoryInstallment: 2,
      cumplusoryPayments: [],
      optionalPayments:[],
      paymentSelection: [],
      selectedPayment: [],
      historySuccess: this.historyList("SUCCESS"),
      historyPending: this.historyList("pending"),
      cumplusoryAmountToBePaid:0,
      totalAmountToBePaid:0,
      userTotal: 0,
      errorMsg: "",
      payBtn:false,
      studentTranssactions:[],
      previewUrl:null,
      showReceiptView:false
    };
  },
  computed: {
    cumplusoryFeeTotal() {
      let Feetotal = 0;
      this.cumplusoryPayments.forEach((el) => {
        Feetotal += el.amount;
      });
      // let historyTotal = 0
      // this.History.cumpulsoryHistory.forEach((el)=>{
      //   historyTotal += el.amount;
      // })
      // let total = 0;
      // try {
      //   total = Number(Feetotal) - Number(historyTotal)
      // } catch (error) {
      //   total =0
      // }
      return Feetotal;
    },
    optionalFeeTotal() {
      let total = 0;
      this.optionalPayments.forEach((el) => {
        total += el.amount;
      });
      return total;
    },
    // userTotal(){
    //   let total = 0;
    //   this.paymentSelection.forEach(el => {
    //     // return el.amount
    //     if(el){
    //       total = total + el.amount;
    //     }
    //   });
    //   return total;
    // }
  },

  methods: {
    showReceipt(transaction){
      Fire.$emit("loadstudentreceipt", transaction)
    },
    calculateAmountToBePaid(event, index){
      let total = 0;
      for (let index = 0; index < this.paymentSelection.length; index++) {
        const element = this.paymentSelection[index]? Number(this.paymentSelection[index].amount) : 0;
        total = Number(element) + Number(total);
      }
      total = Number(this.cumplusoryAmountToBePaid) + Number(total);
      console.log(total)
      return total;
    },
    cumplusoryFeeCalculate() {
      // console.log("here")
      let val = this.cumplusoryPayments;
      for (let index = 0; index < val.length; index++) {
        let el = val[index];
        // console.log(el)
        this.historySuccess.forEach((h) => {
          // console.log(h);
          if (el.id == h.id) {
            el.amount = el.amount - h.amount;
            // console.log(el)
          }
        });
      
      }
      console.log(val);
    },
    optionalFeeCalculate(){
      let val = this.optionalPayments;
      for (let index = 0; index < val.length; index++) {
        let el = val[index];
        // console.log(el)
        this.historySuccess.forEach((h) => {
          // console.log(h);
          if (el.id == h.id) {
            el.amount = el.amount - h.amount;
            // console.log(el)
          }
        });
      }
    },
    selectPayment(e, f, index) {
      // console.log(f);
      // this.selectedPayment[type] =true
      if (e) {
        this.paymentSelection[index] = {
          amount: f.amount,
          id: f.id,
          type: f.type,
        };
        if (f.installment) {
          this.paymentSelection[index].installment = f.installment;
        }
      } else {
        this.paymentSelection[index] = false;
      }
      this.changeAmount();
      this.$forceUpdate();
      // console.log(f,index)
      // if(!this.selectedPayment[type]){
      //   // this.selectedPayment
      //   // this.paymentSelection.splice(type,1);
      // }else{
      // }
    },
    historyList(type) {
      let History = [];
      this.History.cumpulsoryHistory.forEach((el) => {
        if (type == el.status) {
          History.push(el);
        }
      });
      this.History.optionalHistory.forEach((el) => {
        if (type == el.status) {
          History.push(el);
        }
      });
      return History;
    },
    changeAmount() {
      // console.log(e)
      let total = 0;
      this.paymentSelection.forEach((el) => {
        // return el.amount
        if (el) {
          total = total + el.amount;
        }
      });
      this.userTotal = total;
    },
    getCumplusoryFeeTotal() {},
    getOptionalFee() {
      console.log("option");
      // axios.post('getFeeType',{optional:false})
      // .then((response) => {
      //   this.optionalFee = response.data.payment
      // }).catch((err) => {
      //   console.log(err)
      // });
    },
    validateTotal() {
      return new Promise((res, rej) => {
        let total = this.calculateAmountToBePaid();
        if (total > 0) {
          res(true)
        } else {
           Toast.fire({
            icon:'warning',
            title:"The amount must be greater than zero"
          });
          res(false)
        }
      });
    },

    saveStudentRRR(RRR, orderId) {
      return new Promise((res, rej) => {
        axios
          .post("student/saveRRR", { RRR: RRR, orderId: orderId })
          .then((response) => {
            console.log(response);
            res(response.data.value);
          })
          .catch((err) => {});
      });
    },

    async makePayment() {
      this.payBtn = true
      let validator = await this.validateTotal();
      let RRR = null;
      if (validator) {
        console.log("goto remita");
        let initTransaction = await this.initTransaction();
        initTransaction.description = "School Fee";
        //get RRR
        this.$store
          .dispatch("RemitaStore/getRRR", initTransaction)
          .then(async (response) => {
            RRR = response.data.RRR;
            let saveRRR = await this.saveStudentRRR(
              RRR,
              initTransaction.orderId
            );

            if (saveRRR) {
              let payment = { amount: this.calculateAmountToBePaid(), rrr: RRR };
              this.$store
                .dispatch("RemitaStore/makePayment", payment)
                .then((response) => {
                  axios
                    .post("student/studentUpdateTransaction", { rrr: RRR })
                    .then((response) => {
                      Toast.fire({
                        icon:"info",
                        title:"Payment Processed"
                      })
                    })
                    .catch((err) => {
      this.payBtn = false
                    });
                })
                .catch((err) => {
      this.payBtn = false
                });
            }
          })
          .catch((err) => {
      this.payBtn = false
          });

        //  let
        //save RRR
        // goto Remita
      } else {
      this.payBtn = false
        return;
      }
    },
    initTransaction() {
      return new Promise((res, rej) => {
        // var evens = _.remove(this.paymentSelection, function (n) {
        //   return n == null;
        // });

        axios
          .post("student/initTransactions", { 
            optionalPayment: this.paymentSelection, 
            total:this.calculateAmountToBePaid(),
            progType:this.$store.state.student.apply_for })
          .then((response) => {
            console.log(response);
            res(response.data.value);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
  mounted() {
    this.cumplusoryFeeCalculate();
    this.optionalFeeCalculate();
  },
  created() {
    this.cumplusoryPayments = this.cumplusoryFee;
    this.optionalPayments = this.optionalFee;
    axios.get("student/transactions")
    .then((response) => {
      this.studentTranssactions = response.data.value
    }).catch((err) => {
      
    });
    
      
      axios({
        url: "/viewProfileImage",
        method: "POST",
        responseType: "blob",
      })
        .then((response) => {
          var objectURL = URL.createObjectURL(response.data);
          this.previewUrl = objectURL;
            this.$store.dispatch('getProfileImage', this.previewUrl)
          // this.previewUrl = response.data
          // this.busy = false;
        })
        .catch((err) => {
          // Fire.$emit("validateProfileImg")
       
        });
    
    // this.cumplusoryFeeCalculate()
    // this.getCumplusoryFee()
    // this.getOptionalFee();
  },
};
</script>

<style>
.bg-aliceblue {
  background-color: #b5dbfc;
}
.bg-lightcyan {
  background-color: #d9f5f5;
}
.bg-custom-light {
  background-color: rgba(129, 130, 143, 0.281);
}
</style>
