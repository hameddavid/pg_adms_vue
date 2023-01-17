<template>
  <div>
    <form>
      <button type="button" @click="makePayment()">Pay</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customerId:'',
      firstName:"",
      lastName:"",
      email:"",
      narration:"",
      amount:"",
    }
  },
  methods: {
    makePayment() {
      var paymentEngine = RmPaymentEngine.init({
        key:
          "YWJheW9taXBhdWxoZW5yeWhpbGxAZ21haWwuY29tfDQ0NjB8ZDU2MjJiYmY1OWJhMmE4MjYxMDEzNWQ5MzE4Mzc4MmE0MTY3MjI1Y2I1OWFiMjczYjc1NDBjNzMxMDhlMDJlMjczNTczM2M4OTQzZGVkNzJjMDhmZGQxYWU5MGM3MDQ4YWEwOWY0ZTRjZjYxOTZlYjFkYzY4ZmIxN2QwYTdjZDk=",
        customerId: "140700251",
        firstName: "Lisa",
        lastName: "Spark",
        email: "demo@remita.net",
        narration: "Payment Description",
        amount: 5000,
        onSuccess: function (response) {
          console.log("callback Successful Response", response);
        },
        onError: function (response) {
          console.log("callback Error Response", response);
        },
        onClose: function () {
          console.log("closed");
        },
      });
      paymentEngine.showPaymentWidget();
    },
  },
  mounted() {
    // let externalScript = document.createElement("script");
    // externalScript.setAttribute(
    //   "src",
    //   "http://www.remitademo.net/payment/v1/remita-pay-inline.bundle.js"
    // );
    // document.head.appendChild(externalScript);
  },
  created() {
    Fire.$on('remitaPayment', (data)=>{

    })
  },
};
</script>

<style></style>
