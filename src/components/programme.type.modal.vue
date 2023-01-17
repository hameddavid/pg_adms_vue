<template>
  <div>
    <b-modal
      id="programmetype-modal"
      ref="programmetype-modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Select Programme</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="card-body">
              <select
                class="form-control form-control-sm"
                v-model="programme_type"
                @change="checkApplicationAmount"
              >
                <option v-for="(type , index) in programme_types" :key="index" :value="type.programme_type">{{type.programme_type}}</option> 
              </select>
            </div>
            <div class="card-footer">
              <button
                class="btn btn-success btn-sm"
                :disabled="!amount"
                @click="makePayment"
              >
               <span
                      v-if="loadingState"
                      class="spinner-grow spinner-grow-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                continue
              </button>

              <label class="btn btn-outline-success btn-sm m-0 ml-3 " v-if="amount" >Application FEE is ₦{{amount}}</label>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      programme_type: "",
      programme_types: "",
      amount:'',
      loadingState:false
    };
  },
  methods: {
    checkApplicationAmount(){
      this.amount = ""
      this.loadingState = true
      this.$store
        .dispatch("getApplicationPayment", this.programme_type)
        .then((response) => {
      this.loadingState = false
      this.amount = response.amount
        }).catch((err) => {
      this.loadingState = false
        });

    },
    makePayment() {
      this.$store
        .dispatch("getApplicationPayment", this.programme_type)

        .then((response) => {
          // this.amount = response.amount
          let paymentData = {
            payerName: this.$store.state.User.fullname,
            customerId: this.$store.state.User.id,
            payerEmail: this.$store.state.User.email,
            payerPhone: this.$store.state.User.mobile,
            details: response.details,
            amount: response.amount,
            serviceTypeId: response.serviceType_id,
            paymentId: response.id,
          };
          // this.loadingState = false

          Fire.$emit("remitaPayment", paymentData);
          this.$refs["programmetype-modal"].hide();
        })
        .catch((err) => {
          console.log(err);
          // this.loadingState = false
        });
    },
    getProgrammeTypesForApplication(){
      axios.post('getProgrammeTypesForApplication')
      .then((response) => {
        this.programme_types = response.data.types;
      }).catch((err) => {
        Toast.fire({
          icon:'error',
          title:'Network Error'
        })
      });
    },
  },
  created() {
    Fire.$on("programmetype-modal", () => {
      this.$refs["programmetype-modal"].show();
    });
    this.getProgrammeTypesForApplication();
  },
};
</script>

<style></style>
