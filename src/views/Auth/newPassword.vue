<template>
    <div class="card border-0 shadow-sm mx-auto">
        <h4 class="text-center"> Change Password</h4>
        <div class="text-center">{{email}} <button class="btn btn-link" @click="changeEmail">change</button></div>
        <div class="card-body"> 
            <ValidationObserver v-slot="{ invalid }">
                <ValidationProvider
                  rules="required"
                  name="token"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <label class="float-left ml-3"> Reset token </label>
                    <input
                      v-model="token"
                      class="form-control form-control-md rou"
                      :class="errors[0] ? 'is-invalid' : ''"
                      placeholder="Enter reset token"
                    />
                  </div>
                  <span class="text-danger float-right">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="required" name="password" v-slot="{ errors }">
                    <div class="form-group">
                        <label class="float-left ml-3">New Password</label>
                        <input v-model="password" class="form-control form-control-md rou" 
                        :class="errors[0]? 'is-invalid':''" type="password" placeholder="Set a new password" />
                    </div>
                  <span class="text-danger float-right">{{ errors[0] }}</span>
                </ValidationProvider>
                <button
                  class="btn btn-outline-danger mt-3 mb-3 btn-block rou"
                  :disabled="invalid"
                  @click="changePassword"
                >
                <span
                      v-if="btn"
                      class="spinner-grow spinner-grow-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  Change Password
                </button>
               
              </ValidationObserver>
        </div>
    </div>
</template>
<script>
export default {
    props:['email'],
    data() {
        return {
            token:"",
            password:"",
            btnState:false,
        }
    },
    methods: {
        changePassword(){
            this.btnState = true
            axios.post('/resetPassword', {
                password:this.password,
                token:this.token,
                email:this.email
            })
            .then((response) => {
            this.btnState = false
                if(response.data.value){
                    //move to login
                    this.$router.push({ name: "login" });
                }
            }).catch((err) => {
            this.btnState = false
            });
        },
         changeEmail(){
        Fire.$emit("GOTORESET");
    }
    },
}
</script>
<style lang="">
    
</style>