<template>
  <div>
    <div v-b-modal.notification-modal>
      <b-icon icon="bell-fill" class="text-white rounded p-2"></b-icon>
      <b-badge pill variant="danger">
       <template v-if="busy == true">
         <b-spinner small label="Small Spinner" type="grow"></b-spinner>
       </template>
       <template v-else-if="busy == 'error'">
         <b-icon icon="exclamation-circle-fill" scale="1" variant="danger"></b-icon>
       </template>
       <template v-else>
         {{badge}}
       </template>
      </b-badge>
    </div>

    <b-modal
      id="notification-modal"
      ref="notification-modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Notification</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div
              class="card-body p-0"
              v-for="(notification, index) in notifications"
              :key="index"
            >
            <!-- <admission-notification :notification="notification"/> -->
              <component
                :is="switchComponent(notification.type)"
                :notification="notification"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- <template #modal-footer="{ ok, cancel, hide }">
        <b>Custom Footer</b>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import paymentNotification from "./paymentNotification";
// import admissionNotification from './admissionNotification'
import AdmissionNotification from '../notifications/admissionNotification.vue';
export default {
  components: { paymentNotification, AdmissionNotification },
  data() {
    return {
      notifications: [],
      comp: AdmissionNotification,
      busy:false,
      badge:0,
    };
  },
  methods: {
    getNotifications() {
      this.busy = true
      axios
        .post("/notifications")
        .then((response) => {
          this.notifications = response.data.notifications;
          if (this.notifications.length > 0) {
            this.$refs["notification-modal"].show();
          }
           this.badge = this.notifications.length
          this.busy = false
        })
        .catch((err) => {
          // console.log(err);
          this.busy = 'error'
        });
    },
    switchComponent(type) {
      if (type == "payment") {
        return paymentNotification;
      }else{
        return AdmissionNotification;
      }
      // if (type == "Admission") {
      // }
    },
    countNotification() {
      return new Promise((res, rej) => {
        if (this.notifications.length > 0) {
          res(true);
        } else {
          res(false);
        }
      });
    },
  },
  async mounted() {
    let checkNotification = await this.countNotification();
    // console.log(checkNotification);
    if (checkNotification) {
      this.$refs["notification-modal"].show();
    }
  },
  created() {
    //
    this.getNotifications();
  },
};
</script>

<style>

.modal-body {
  padding: 0px !important;
}
.custom-bg {
  background-color: aliceblue;
}
.action-btn {
  border-radius: 4rem;
}
.border-1 {
  border-width: 1px !important;
}
.border-2 {
  border-width: 2px !important;
}
.border-3 {
  border-width: 3px !important;
}
.border-4 {
  border-width: 4px !important;
}
.border-5 {
  border-width: 5px !important;
}

.card-tools {
  float: right;
  /* margin-right: -0.625rem; */
}
</style>
