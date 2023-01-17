// import axios from "axios";
import sha512 from "crypto-js/sha512";
// import { axios } from "vue/types/umd";

export const RemitaStore = {
  namespaced: true,
  state: {
    //demo
    // merchantId: "2547916",
    // apiKey: "1946",
    merchantId: "4161150426",
    apiKey: "258341",
  },
  actions: {
    saveRRR(context, paymentData) {
      return new Promise((res, rej) => {
        //params paymentId and rrr
        axios
          .post("/addRemitaRRR", paymentData)
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
    getRRR(context, paymentDetails) {
      console.log(paymentDetails)
      return new Promise((res, rej) => {
        let apiHash = sha512(
          context.state.merchantId +
            paymentDetails.serviceType_id +
            paymentDetails.orderId +
            paymentDetails.amount +
            context.state.apiKey
        );
        console.log(apiHash);
        var ins = axios.create({
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `remitaConsumerKey=${context.state.merchantId},remitaConsumerToken=${apiHash}`,
          },
        });
        ins
          .post(
            // "https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit",
            "https://login.remita.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit",
            {
              serviceTypeId: paymentDetails.serviceType_id,
              amount: paymentDetails.amount,
              orderId: paymentDetails.orderId,
              payerName: context.rootState.User.fullname,
              payerEmail: context.rootState.User.email,
              payerPhone: context.rootState.User.mobile,
              description: paymentDetails.description,
              details: paymentDetails.details,
            }
          )
          .then((response) => {
            if (response.data.statuscode == "025") {
              console.log("get rrr store");
              console.log(response);
              // this.paymentData.rrr = response.data.RRR;
              res(response);
            }
            // res(response)
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "unable to get remita retrieval reference",
            });
            console.log(err + "error getRRR ");
          });
        // console.log("get here");

        // console.log(apiHash);
      });
    },

    makePayment(context, paymentDetails) {
      return new Promise((res, rej) => {
        try {
          console.log(paymentDetails)
          var paymentEngine = RmPaymentEngine.init({
            key:
              // "QzAwMDAxNjMwNzl8NDA4NDEyMjQ0MHw0ODZkYTZkOTE4NTVhNzMzZmIzZTM5MTU2ZDBjZDYxY2Y4MzY4ODQ1NzRkYzIyOTI2OWQzMTU1M2NlNzdkNGZkZGIyNjI1MzA1ZjZkNzkzYzM2NTE4NzUxNTI0OWVjYjAxODUyNGZmYTM3NjY3M2IwZWNjYTU3OWEwYjE5NGMyNQ==",
              "QzAwMDAxNTY4NzN8OTU3M3w1OWUwZmVmMmUxYWYwZTlhMjk3MTU5MzIwNzcxNjc1NWYwYmI5ZWNkZWYyYzcwYWZiZGIwOGZkYmViYzhiYjI3MTkyYzA3MGRhOWZkZDgxNDhlMjdjNmVkMGI0ZjgwYjQ4ZDM1OTkwMzhmNzU4OTJmN2NjMTUxMTljZDY1NjA1NQ==",
            customerId: context.rootState.User.id,
            fullname: context.rootState.User.fullname,
            // firstName: this.paymentData.firstName,
            // lastName: this.paymentData.lastName,
            email: context.rootState.User.email,
            // narration: this.paymentData.narration,
            amount: paymentDetails.amount,
            rrr:paymentDetails.rrr,
            processRrr: true,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: paymentDetails.rrr,
                },
              ],
            },
            onSuccess: (response) => {
              console.log(response);
              //   response = { ...response, ...this.paymentData };
              res(response);
              //   Fire.$emit("remitaSuccess", response);
            },
            onError: (response) => {
              console.log(response);
              //   response = { ...response, ...this.paymentData };
              rej(response);
              // response['amount'] = this.paymentData.amount
              //   Fire.$emit("remitaFail", response);
              //   console.log("Remita Payment error", response);
            },
            onClose: function () {
              console.log("closed");
            },
          });
          paymentEngine.showPaymentWidget();
        } catch (error) {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Connection to remita failed",
          });
        }
      });
    },

    UpdateTransaction(context, paymentDetails) {
      // $request->paymentDetails['rrr']
      return new Promise((res, rej) => {
        axios
          .post("/updateTransaction", paymentDetails)
          .then((response) => {
            res(response);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    checkPaymentStatus(context, paymentDetails) {
      return new Promise((res, rej) => {
        axios
          .post("checkRRRStatus", { rrr: paymentDetails })
          .then((response) => {
            res(response);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    async checkAndUpdatePayment(response, details) {
      return new Promise(async (res, rej) => {
        try {
          if (response.status == "02") {
            await this.updatePaymentStatus(details, "FAILED", response);
          } else if (response.status == "00" || response.status == "01") {
            console.log("success");
            await this.updatePaymentStatus(details, "SUCCESS", response);
          } else if (response.status == "021") {
            //transcation pending
            if (details.status == "pending") {
            } else {
              await this.updatePayment(details, "PENDING", response);
            }
          } else {
            // notify admiin
            console.log(response);
            console.log("notify admin");
          }
          res(true);
        } catch (error) {
          rej(false);
        }
      });
    },
    checkRRRStatus(context, rrr) {
      return new Promise((res, rej) => {
        axios
          .post("checkRRRStatus", { rrr: rrr })
          .then(async (response) => {
            Toast.fire({
              icon: "info",
              title: response.data.message,
            });
            if (response.data.status == "00" || response.data.status == "01") {
              console.log(response.data.status);
              // this.UpdateTransaction(_, {paymentReference: rrr})
              await context.dispatch("UpdateTransaction", {
                paymentReference: rrr,
                amount:response.data.amount
              });
            }
            res(response);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    updatePaymentStatus(payment, status, remitaResponse) {
      return new Promise((res, rej) => {
        axios.post("updatePaymentStatus");
      });
    },
  },
};
