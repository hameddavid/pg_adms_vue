import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import axios from "axios";
// import VueAxios from 'vue-axios'
import { Form } from "vform";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { ApplicationForm } from "./ApplicationForm";
import {RemitaStore} from "./remitaStore";

// Vue.use(VueAxios, axios)

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    User: {
      id: "",
      type: "",
      token: "",
      fullname: "",
      email: "",
      isVerified: false,
    },
    student:{},
    programmes: "",
    applicationPayment: "",
    applicationLists: "",
    profileImage:null,
    studentBillPerProg:{
      cumplusoryFee:[],
      optionalFee:[]
    },
    
  },
  mutations: {
    setStudentBillPerProg(state, billPerProg){
      state.studentBillPerProg.cumplusoryFee = billPerProg.cumplusoryFee;
      state.studentBillPerProg.optionalFee = billPerProg.optionalFee;
    },
    setUser(state, paylaod) {
      if (paylaod == "signout") {
        state.User.id = "";
        state.User.fullname = "";
        state.User.type = "";
        state.User.email = "";
        state.User.isVerified = false;
      } else {
        state.User.id = paylaod.id;
        state.User.fullname =
          paylaod.surname + " " + paylaod.firstname + " " + paylaod.lastname;
        state.User.type = paylaod.type;
        state.User.email = paylaod.email;
        state.User.mobile = paylaod.mobile;
        state.User.isVerified = paylaod.email_verified_at ? true : false;
        
      }
    },
    setToken(state, token) {
      if (token == "sigout") {
        state.User.token = "";
      } else {
        state.User.token = token;
      }
    },
    setIsVerified(state, isVerified) {
      state.User.isVerified = isVerified;
    },
    setApplicationPayment(state, payment) {
      state.applicationPayment = payment;
    },
    setApplicationLists(state, applicationLists) {
      state.applicationLists = applicationLists;
    },
    setApplicationForm(state, formData) {
      state.applicationForm.personalDetails = formData.personaldetails;
      state.applicationForm.assestmentForm = formData.assessment;
      state.applicationForm.reference = formData.refree;
      state.applicationForm.employmentHistory = formData.employmenthistory;
      state.applicationForm.credentials = formData.credentials;
      state.applicationForm.institutionDetails = formData.institution;
    },
    setUpdateSingleApplication(state, application) {
      // console.log("commit here");
      // console.log(application);
      const index = application.index;
      delete application.index;
      state.applicationLists[index] = application;
    },
    setProgrammes(state, programmes){
      state.programmes = programmes;
    },
    setProfileImage(state , profileImage){
      state.profileImage = profileImage
    },
    setStudent(state , payload){
      state.student = payload
    }
  },
  actions: {
    getUser(context, User){
      console.log(User)
      context.commit('setUser', User);
    },
    getProfileImage(context, profileImage){
      context.commit('setProfileImage', profileImage);
    },
    checkAuth(context) {
      console.log("checkAuth");
      return new Promise((res, rej) => {
        if (context.state.User.token == "hello") {
          res(true);
        } else {
          rej(false);
        }
      });
    },
    Login(context, cred) {
      // let form = new Form({credentials});
      return new Promise((res, rej) => {
        axios
          .post("/pgLogin", cred)
          .then((response) => {
            if (response.data.msg == "success") {
              context.commit("setUser", response.data.user);
              context.commit("setToken", response.data.token);
              res(response.data.user);
            }
          })
          .catch((err) => {
            console.log(err.response.data);
            rej(err);
          });
      });
    },
    studentLogin(context , cred){
      return new Promise((res,rej)=>{
        axios.post("/pgStudentLogin", cred)
        .then((response) => {
          if(response.data.msg == "success"){
            context.commit('setUser', response.data.user);
            context.commit("setToken", response.data.token);
            context.commit("setStudent", response.data.student)
            res(response.data.user);
          }
        }).catch((err) => {
          console.log(err.response.data)
          rej(err);
        });
      })
    },
    signOut(context) {
      return new Promise((res, rej) => {
        axios
          .post("pgSignOut")
          .then((response) => {
            if (response.data.msg == "success") {
              let payload = "signout";
              context.commit("setUser", payload);
              context.commit("setToken", payload);
              // window.location.reload()
              res();
            }
          })
          .catch((err) => {
            console.log("signOut error" + err);
          });
      });
    },
    manualSignOut(context){
      return new Promise((res,rej ) =>{
        try {
          let payload = 'signout'
          context.commit("setUser", payload);
      context.commit("setToken", payload);
      res()
        } catch (error) {
          rej()
        }
      })
    },
    verifyMail(context, data) {
      return new Promise((res, reg) => {
        axios
          .post("pgVerifyEmail", { id: data.user.id, token: data.otp })
          .then((response) => {
            if (response.data.msg == "success") {
              context.commit("setIsVerified", true);
              res(response.data.value);
            }
          })
          .catch((err) => {
            console.log(err + "error VerifyMail");
          });
      });
    },
    resendVerifyMail(context, user) {
      return new Promise((res, rej) => {
        axios
          .post("pgResendVerificationMail", user)
          .then((response) => {
            if (response.data.msg == "success") {
              res(response.data.value);
            }
          })
          .catch((err) => {
            console.log(err + "error resending mail");
          });
      });
    },
    getApplicationPayment(context , programme_type) {
      // console.log(programme_type);
      return new Promise((res, rej) => {
        axios
          .get("applicationFee", {
            params:{programme_type:programme_type}
          })
          .then((response) => {
            if (response.data.msg == "success") {
              context.commit("setApplicationPayment", response.data.payment);
              res(response.data.payment);
            }
          })
          .catch((err) => {
            console.log("error application payment" + err);
          });
      });
    },
    paymentApplicationSuccess(context, data) {
      return new Promise((res, rej) => {
        axios
          .post("paymentApplicationSuccess", data)
          .then((response) => {
            if (response.data.msg == "success") {
              res(true);
            }
          })
          .catch((err) => {
            console.log(err + " paymentApplicationSuccess");
            rej();
          });
      });
    },
    applicationLists(context) {
      return new Promise((res, rej) => {
        axios
          .post("pgApplicationLists")
          .then((response) => {
            if (response.data.msg == "success") {
              context.commit("setApplicationLists", response.data.value);
              res(response.data.value);
            }
          })
          .catch((err) => {
            console.log(err + "error fetching application Lists");
            rej(err);
          });
      });
    },
    updateSingleApplication(context, application) {
      console.log("update single application form");
      context.commit("setUpdateSingleApplication", application);
    },
    applicationForm(context, application) {
      return new Promise((res, rej) => {
        try {
          // context.commit('setApplicationForm', application)
          context.commit("ApplicationForm/setApplicationForm", application);
          res(true);
        } catch (err) {
          console.log(err + "applicationForm error");
          rej(false);
        }
      });
    },
    getProgrammes(context){
      return new Promise((res, rej)=>{
        axios.post('getProgrammes')
      .then((response) => {
        console.log(response.data.programmes)
        context.commit("setProgrammes", response.data.programmes);
        // this.programmes = response.data.programmes
        res(response.data.programmes)
      }).catch((err) => {
        console.log('unable to get programmes');
        rej(err)
      });
      })
    },
    //remita or payment functions 
    initTransaction(context, payment) {
      return new Promise((res, rej) => {
        axios
          .post("initTransaction", { payment: payment })
          .then((response) => {
            if (response.data.msg == "success") {
              res(response);
            }
          })
          .catch((err) => {
            console.log(err + "Unable to initate the transaction");
          });
      });
    },
    studentBillPerProg(context, billingPerProg){
      console.log("context")
      console.log(billingPerProg)
      context.commit("setStudentBillPerProg", billingPerProg)
    }

  },
  modules: {
    ApplicationForm,
    RemitaStore
  },
  getters: {
    isAuthenticatedApplicant: (state) => {
      if (
        state.User.type == "applicant" &&
        state.User.token != "signout" &&
        state.User.token
      ) {
        return true;
      } else {
        return false;
      }
    },
    isAuthenticatedStudent: (state) => {
      if (
        state.User.type == "student" &&
        state.User.token &&
        state.User.token != "signout"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isAuthenticated: (state) => {
      if (state.User.token && state.User.token != "signout") {
        return {type:state.User.type, state:true};
      } else {
        return {state:false};
      }
    },
  },
  // student update
  plugins: [vuexLocalStorage.plugin],
});
