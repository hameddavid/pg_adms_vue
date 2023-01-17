<template>
  <div></div>
</template>

<script>
import sha512 from "crypto-js/sha512";
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import ax from "axios";
export default {
  data() {
    return {
      paymentData: {
        payerName: "",
        customerId: "",
        payerEmail: "",
        payerPhone: "",
        description: "",
        details:'',
        amount: "",
        serviceTypeId: "",
        paymentId: "",
        orderId: "",
        rrr: "",
      },
      checkRRRStatus: "",
      responseCheckRRR: "",
      url:
        "https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit",
      paymentObj: {
        serviceTypeId: "4430731",
        amount: "5000",
        orderId: `123454`,
        payerName: "here",
        payerEmail: "alozie@systemspecs.com.ng",
        payerPhone: "09062067384",
        description: "Payment for Donation 3",
        customField: [
          {
            name: "Matric Number",
            value: "1509329285795",
            type: "ALL",
          },
          {
            name: "Invoice Number",
            value: "1234",
            type: "ALL",
          },
        ],
      },
      merchantId: "4161150426",
      apiKey: "258341",
    };
  },
  methods: {
    async initTransaction() {
      return new Promise((res, rej) => {
        this.$store
          .dispatch("initTransaction", this.paymentData.paymentId)
          .then((response) => {
            // value = response;
            this.paymentData.orderId = response.data.value.orderId;
            this.paymentData.rrr = response.data.value.rrr;
            res(response);
            // return value
          })
          .catch((err) => {
            console.log("initransaction test comp");
          });
      });
    },

    async getRRR() {
      return new Promise((res, rej) => {
        let RRRdata = "";
        let apiHash = sha512(
          this.merchantId +
            this.paymentData.serviceTypeId +
            this.paymentData.orderId +
            this.paymentData.amount +
            this.apiKey
        );
        var ins = axios.create({
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `remitaConsumerKey=${this.merchantId},remitaConsumerToken=${apiHash}`,
          },
        });
        ins
          .post(
            "https://login.remita.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit",
            {
              serviceTypeId: this.paymentData.serviceTypeId,
              amount: this.paymentData.amount,
              orderId: this.paymentData.orderId,
              payerName: this.paymentData.payerName,
              payerEmail: this.paymentData.payerEmail,
              payerPhone: this.paymentData.payerPhone,
              description: this.paymentData.description,
              details: this.paymentData.details,
              customField: [
                {
                  name: "Matric Number",
                  value: "1509329285795",
                  type: "ALL",
                },
                {
                  name: "Invoice Number",
                  value: "1234",
                  type: "ALL",
                },
              ],
            }
          )
          .then((response) => {
            if (response.data.statuscode == "025") {
              console.log("gettrerrer");
              this.paymentData.rrr = response.data.RRR;
              res(response);
            }
          })
          .catch((err) => {
            Toast.fire({
              icon:'error',
              title:'unable to get remita retrieval reference'
            })
            console.log(err + "error getRRR ");
          });
      });
    },

    async saveRRR() {
      return new Promise((res, rej) => {
        axios
          .post("/addRemitaRRR", this.paymentData)
          .then((response) => {
            if (response.data.msg == "success") {
              console.log("got RRRR");
              res(response);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    async makePayment() {
      const initTransaction = await this.initTransaction();
      let RRRdata = "";
      if (initTransaction.data.type == "checkRRR") {
      } else {
        RRRdata = await this.getRRR();
      }
      await this.saveRRR();
      // return true;
      try {
        let amount = this.paymentData.amount;
      var paymentEngine = RmPaymentEngine.init({
        key:
          "QzAwMDAxNTY4NzN8OTU3M3w1OWUwZmVmMmUxYWYwZTlhMjk3MTU5MzIwNzcxNjc1NWYwYmI5ZWNkZWYyYzcwYWZiZGIwOGZkYmViYzhiYjI3MTkyYzA3MGRhOWZkZDgxNDhlMjdjNmVkMGI0ZjgwYjQ4ZDM1OTkwMzhmNzU4OTJmN2NjMTUxMTljZDY1NjA1NQ==",
        customerId: this.paymentData.customerId,
        firstName: this.paymentData.firstName,
        lastName: this.paymentData.lastName,
        email: this.paymentData.email,
        narration: this.paymentData.narration,
        amount: this.paymentData.amount,
        processRrr: true,
        extendedData: {
          customFields: [
            {
              name: "rrr",
              value: this.paymentData.rrr,
            },
          ],
        },
        onSuccess: (response) => {
          console.log(response)
          response = { ...this.paymentData, ...response };
          Fire.$emit("remitaSuccess", response);
        },
        onError: (response) => {
          console.log(response)
          response = { ...response, ...this.paymentData };
          // response['amount'] = this.paymentData.amount
          Fire.$emit("remitaFail", response);
          console.log("Remita Payment error", response);
        },
        onClose: function () {
          console.log("closed");
        },
      });
      paymentEngine.showPaymentWidget();
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon:'error',
          title:"Connection to remita failed"
        })
      }
    },
    async checkRRR(details, index) {
      return new Promise(async (res, rej) => {
        axios
          .post("checkRRRStatus", { rrr: details.rrr })
          .then(async (response) => {
            //working here 1
            await this.checkAndUpdatePayment(response.data, details);
            Fire.$emit(
              "remitaCheckRRRStatusResponse",
              response.data,
              index,
              details
            );
            console.log("after the fire the event");
            res(true);
          })
          .catch((err) => {
            Fire.$emit(
              "remitaCheckRRRStatusResponse",)
            rej(false);
          });
      });
    },
    async checkOrder(orderId) {
      return new Promise((res, rej) => {
        let apiHash = sha512(orderId + this.apiKey + this.merchantId);
        var ins = axios.create({
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `remitaConsumerKey=${this.merchantId},remitaConsumerToken=${apiHash}`,
          },
        });
        ins
          .get(
            `http://remitademo.net/remita/ecomm/${this.merchantId}/${orderId}/${apiHash}/orderstatus.reg`
          )
          .then((response) => {
            console.log("res", response);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    //working here2
    async checkAndUpdatePayment(response, details) {
      return new Promise(async (res, rej) => {
       try {
          if (response.status == "02") {
          await this.updatePaymentStatus(details, "FAILED", response);
        } else if (response.status == "00" || response.status == "01") {
          console.log("success")
          await this.updatePaymentStatus(details, "SUCCESS", response);
        } else if (response.status == "021") {
          //transcation pending
          if (details.status == "pending") {
          } else {
            await this.updatePaymentStatus(details, "PENDING", response);
          }
        } else {
          // notify admiin
          console.log(response);
          console.log("notify admin");
        }   
          res(true)

       } catch (error) {
         rej(false)
       }
        
      });
    },
    updatePaymentStatus(payment, status, remitaResponse) {
      return new Promise((res, rej) => {
        axios
          .post("updatePaymentStatus", { payment: payment, status: status, remitaResponse:remitaResponse })
          .then((response) => {
            res(true);
          })
          .catch((err) => {
            rej(false);
          });
      });
    },
  },
  mounted() {
    // let externalScript = document.createElement("script");
    // externalScript.setAttribute(
    //   "src",
    //   "http://www.login.remita.net/payment/v1/remita-pay-inline.bundle.js"
    // );
    // document.head.appendChild(externalScript);
  },
  created() {
    Fire.$on("remitaCheckOrder", (orderId) => {
      this.checkOrder(orderId);
    });
    Fire.$on("remitaCheckRRRStatus", (data, index) => {
      this.checkRRR(data, index);
    });
    Fire.$on("remitaPayment", (data) => {
      this.paymentData = data;
      this.makePayment();
    });
  },
};
</script>

<style></style>
