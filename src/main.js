import Vue from "vue";
import App from "./App.vue";
import _ from 'lodash'
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/style.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faBars,
  faBorderAll,
  faWallet,
  faBook,
  faPlus,
  faArrowLeft,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueProgressBar from "vue-progressbar";

import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)


// Vue.use(VueProgressBar, {
//   color: "rgb(38, 138, 2)",
//   failedColor: "red",
//   height: "5px"
// });
Vue.use(VueProgressBar, {
  color: "darkBlue",
  failedColor: "red",
  height: "5px",
});
import axios from "axios";
// import VueSweetalert2 from 'vue-sweetalert2';
import Swal from "sweetalert2";

// import * as Sentry from "@sentry/browser";
// import { Integrations } from "@sentry/tracing";

// Sentry.init({
//   Vue,
//   dsn:
//     "https://63b13924f783405ba5bfdf727584a226@o506707.ingest.sentry.io/5596736",
//   autoSessionTracking: true,
//   logErrors: true,
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });

// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
window.axios = axios;
// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.baseURL = 'http://10.1.34.211:8000/api'
axios.defaults.baseURL = 'https://pgr.run.edu.ng/api'

// Vue.prototype.$axios = axios
// import Vuesax from 'vuesax'
// import 'vuesax/dist/vuesax.css'
import { ValidationObserver, ValidationProvider } from "vee-validate";
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

library.add(
  faUserSecret,
  faBars,
  faBorderAll,
  faWallet,
  faBook,
  faPlus,
  faArrowLeft,
  faWindowClose
);
Vue.component('profileimage', require('./components/profileImage.vue').default);
Vue.component('fabButton', require('./components/fabButton.vue').default);
Vue.component('notification', require('./components/notifications/notification.vue').default);
Vue.component('RButton', require('./views/helper/RButton.vue').default);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("verifyemail", require("./views/Auth/VerifyEmail.vue").default);
Vue.component("remitapayment", require("./test.vue").default);
Vue.component(
  "validation-popover",
  require("./views/validation/popOver.vue").default
);
window.Fire = new Vue();
import "./validator";
// Vue.use(Vuesax, {
//   // options here
// })

// Install BootstrapVue
Vue.use(BootstrapVue);

window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  // showCancelButton:true,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
window.Toast = Toast;

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),

  created() {
    // console.log(store.state.User.token);
    axios.interceptors.request.use(
      async (config) => {
        if(config.method == 'delete'){
          await Swal.fire({
            title: "Are you sure?",
            text:
              "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "YES",
            cancelButtonText:"NO"
          }).then(result => {
            // console.log(result)
            if (result.isConfirmed) {
            } else {
              // Swal.fire('Changes are not saved', '', 'info')
              Toast.fire({
                icon:'info',
                title:"Operation Cancelled"
              })
              throw new axios.Cancel('Operation canceled by the user.');
            }
          });
        }
        // console.log(config)

        this.$Progress.start();
        // const value = await redisClient.get(rediskey)
        // const keys = JSON.parse(value)
        config.headers = {
          Authorization: `Bearer ${store.state.User.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        return config;
      },
      (err) => {
        this.$Progress.fail();
        console.log('request err')
        console.log(err.message)
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.$Progress.finish();
        if(response.data.info){
          Toast.fire({
            icon:'success',
            title:response.data.info,
            iconColor:'darkBlue',
            
          })
        }else{

        }
        
        return response;
      },
      (error) => {
        if (error.response.data.error) {
          Toast.fire({
            icon:'error',
            cancelButtonText:'close',
            title:error.response.data.error
        }) 
        }
        console.log(error.response.data.message)
        if(error.response.data.message){
          if (error.response.data.message == "Unauthenticated.") {
            Toast.fire({
              icon:'info',
              title: 'Session expired',
            });
            this.$store
        .dispatch("manualSignOut")
        .then(() => {
          this.$router.replace({ name: "login" });
        })
        .catch((err) => {});
          }
        }
        this.$Progress.fail();
        return Promise.reject(error);
      }
    );
  },
}).$mount("#app");
