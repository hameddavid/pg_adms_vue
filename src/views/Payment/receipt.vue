<template>
  <div>
    <b-modal
      modal-class="modal-fullscreen"
      id="receipt-modal"
      ref="receipt-modal"
      hide-footer
      hide-header
      v-model="showModal"
      scrollable
    >
      <template #default="{ hide }">
        <div>
          <b-icon
            icon="x-circle"
            scale="1"
            variant="danger"
            @click="hide()"
            media="print"
            class="mt-1 mr-2 float-right dontprint"
          ></b-icon>
        </div>
        <!-- body -->
        <div class="border  p-4">
          <!-- header -->
          <div class="d-block">
            <picture>
              <img srcset="@/assets/runlogo.png" class="receipt-logo" />
            </picture>
          </div>
          <div
            class="border border-dark mt-2 border-3 text-center text-monospace p-1"
          >
            <b>PAYMENT RECEIPT</b>
          </div>
          <!-- student data and payment summary -->
          <div>
            <div class="row mt-3">
              <div class="col-9 text-monospace pl-4">
                <label class="d-block font-weight-bold"
                  >Student Name {{ $store.state.User.fullname }}</label
                >
                <label class="d-block font-weight-bold">
                  Deposit Amount ₦{{ paymentDetails.amount }}</label
                >
                <label class="d-block font-weight-bold"
                  >Receipt No {{ paymentDetails.rrr }}</label
                >
                <label class="d-block font-weight-bold">
                  Date of Deposit
                  {{
                    paymentDetails.created_at == null
                      ? getDate(paymentDetails.updated_at)
                      : getDate(paymentDetails.created_at)
                  }}
                </label>
                <label class="d-block font-weight-bold">
                  Payment Mode Remita</label
                >
              </div>
              <div class="col pr-4">
                <img :src="previewUrl" class="userImg float-right" />
              </div>
            </div>

            <!-- payment details table -->

            <div class="table-responsive mt-2">
              <table class="table table-bordered border-2 border border-dark">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Payment Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{{ paymentDetails.details }}</td>
                    <td>{{ paymentDetails.amount }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="col text-center">
                  <picture>
                    <img srcset="@/assets/receipt.png" class="sign" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "receipt",
  data() {
    return {
      studentData: "",
      paymentInfo: "",
      paymentBreakDown: "",
      showModal: false,
      previewUrl: "",
      paymentDetails: "",
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    getProfileImage() {
      this.previewUrl = this.$store.state.profileImage;
      // Fire.$emit('getProfileImage');
    },
    getDate(date) {
      let depositDate = new Date(date);
      let da = depositDate.toLocaleDateString();
      return da;
    },
  },
  created() {
    Fire.$on("loadreceipt", (data) => {
      console.log(data);
      this.paymentDetails = data;
      this.openModal();
      this.getProfileImage();
    });

    //     amount: "5000"
    // created_at: (...)
    // details: (...)
    // id: (...)
    // orderId: (...)
    // payment_id: (...)
    // pivot: (...)
    // reference: (...)
    // rrr: (...)
    // status: (...)
    // transactionId: (...)
    // transaction_id: (...)
    // transaction_type: (...)
    // updated_at: (...)
    // Fire.$on('sendProfileImage')
  },
};
</script>

<style>
.modal-fullscreen .modal-dialog {
  max-width: 100%;
  /* width: 100vw; */
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 100000;
}
.receipt-logo {
  height: 5rem;
}
.userImg {
  height: 10rem;
}
.sign{
    height: 10rem;
}
.dontprint{
    display: none;
}
</style>
