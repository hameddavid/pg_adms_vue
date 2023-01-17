<template>
  <div class="bg-light rounded shadow">
    <div class="card bg-transparent border-0 pt-0 pb-0">
      <div class="card-body pt-2 pb-2">
        <b class="p-0">Payments</b>
        <b-icon
          icon="question-circle-fill"
          variant="primary"
          class="rounded float-right mt-1"
          scale="1.5"
        ></b-icon>
      </div>
    </div>
    <hr class="w-100 m-0 border-2 border-success" />
    <div class="p-2">
      <!-- <div>
        <input class="form-control form-control-sm my-1" placeholder="Type here to search" />
      </div> -->
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <b-skeleton animation="throb" width="85%" height="30%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton animation="throb" width="70%" height="20%"></b-skeleton>
            <b-skeleton width="10%" height="40%"></b-skeleton>
            <b-skeleton animation="throb" width="50%" height="60%"></b-skeleton>
            <b-skeleton width="80%" height="10%"></b-skeleton>
            <b-skeleton animation="throb" width="50%" height="80%"></b-skeleton>
          </b-card>
        </template>
  <payment-container
     :cumplusoryFee="cumplusoryFee"
          :optionalFee="optionalFee"
          :percentage="percentage"
          :History="paymentHistory"
  >

  </payment-container>
        <!-- <payment-list
          :cumplusoryFee="cumplusoryFee"
          :optionalFee="optionalFee"
          :percentage="percentage"
          :History="paymentHistory"
        /> -->
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
// import paymentList from "./payment.list.vue";
import paymentContainer from "./paymentComponents/paymentContainer.vue"
export default {
  components: { paymentContainer },
  data() {
    return {
      loading: true,
      cumplusoryFee: [],
      optionalFee: [],
      percentage: "",
      paymentHistory: "",
    };
  },
  methods: {
    getPayment() {
     return new Promise((res, rej)=>{
        axios
        .get("/billing/per/prog", {
          params: {
            progId: this.$store.state.student.approved_programme_id,
            progType: this.$store.state.student.apply_for,
          },
        })
        .then((response) => {
          // console.log(response.data.compulsary);
          this.cumplusoryFee = response.data.compulsary;
          this.optionalFee = response.data.optional;
          this.percentage = response.data.percentage;
          this.$store.dispatch("studentBillPerProg", {
            "cumplusoryFee":response.data.compulsary,
            "optionalFee":response.data.optional,
          });
          res()
        })
        .catch((err) => {
          console.log(err)
          rej()
          // this.loading = false;
        });
     })
    },
    getHistory() {
      return new Promise((res, rej)=>{
        axios
        .get("/student/billing/history", {
          params: {
            progId: this.$store.state.student.approved_programme_id,
            progType: this.$store.state.student.apply_for,
          },
        })
        .then((response) => {
          this.paymentHistory = response.data;
          res()
          console.log(response.data);
        })
        .catch((err) => {
          rej()
        });
      })
    },
    async loadPaymentInfo() {
      this.loading = true;
      await this.getPayment();
      await this.getHistory();
      this.loading = false;
    },
  },
  created() {
    this.loadPaymentInfo();
  },
};
</script>

<style></style>
