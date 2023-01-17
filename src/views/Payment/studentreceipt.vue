<template>
  <div>
    <b-modal
      modal-class="modal-fullscreen"
      id="receipt-modal"
      ref="receipt-modal"
      scrollable
      hide-footer
      hide-header
      v-model="showModal"
      
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
        <div class="border p-4">
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
                <label class="d-block font-weight-bold">Student Name: {{ $store.state.User.fullname }} </label>
                <label class="d-block font-weight-bold">
                  Deposit Amount: ₦{{transaction.amount}}</label
                >
                <label class="d-block font-weight-bold">Receipt No: {{transaction.rrr}} </label>
                <label class="d-block font-weight-bold">
                  Date of Deposit: {{transaction.updated_at}}
                </label>
                <label class="d-block font-weight-bold">
                  Payment Mode: Remita</label
                >
              </div>
              <div class="col pr-4">
                <img :src="previewUrlStore" class="userImg float-right" />
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
                  <tr v-for="(payment, index) in transaction.payment_payload" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{payment.type}}</td>
                    <td>{{payment.amount}}</td>
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
// props: [ "previewUrl"];
//  the student image can be gotten from either previewUrl or previewUrlStore
export default {
  data() {
    return {
      showModal: false,
      previewUrlStore:null,
      transaction:null,
      previewUrl:null
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    getProfileImage() {
      this.previewUrlStore = this.$store.state.profileImage;
      // Fire.$emit('getProfileImage');
    },
  },
  created(){
      Fire.$on("loadstudentreceipt",(data)=>{
          this.openModal();
          this.transaction = data;
          this.getProfileImage()
          
      })
  }
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
  height: 100%;
  /* display: flex; */
  /* position: fixed; */
  z-index: 100000;
}
.receipt-logo {
  height: 5rem;
}
.userImg {
  height: 10rem;
}
.sign {
  height: 10rem;
}
@media print {
  .dontprintbtn{
      display: none;
  }
    }
</style>
