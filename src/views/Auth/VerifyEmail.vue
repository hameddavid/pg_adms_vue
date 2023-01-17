<template>
  <div>
    <b-modal id="verifymodal" title="Verify Email" hide-footer @shown="focusInput">
      <b-overlay :show="show" rounded="sm">
      <div class="alert alert-success"> We just sent you an email. 
        <b class="small-font"> check your spam if not in your inbox </b>
      </div>
      <div class="pl-4 pr-4 pb-3">
      <h5>Enter OTP to verify your account</h5>
        <div class="row">
        <div class="col">
          <input v-model="otp" class="form-control form-control-sm" type="number" maxlength="6" ref="otp" />
        </div>
        
      </div>
        <div class="mt-3">
      <button class=" btn-run btn-run-outline-primary btn-sm  " @click="verifyMail">Verify</button>
          <button class="btn btn-danger btn-sm float-right"  @click="resendVerifyMail">Resend OTP</button>
        </div>
      </div>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp:'',
      show:false
      // p1: "",
      // p2: "",
      // p3: "",
      // p4: "",
      // p5: "",
      // p6: "",
    };
  },
  methods: {
    verifyMail(){
      this.$store.dispatch('verifyMail', {user:this.$store.state.User, otp:this.otp}).then((response) => {
      
        this.$router.replace({name:'login'});
        this.$bvModal.hide('verifymodal')
      }).catch((err) => {
        
      });
    },
    resendVerifyMail(){
      this.$store.dispatch('resendVerifyMail', this.$store.state.User)
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        
      });
    },
    test(){
      console.log('here');
      this.show = true
      this.$axios.post('/test')
      .then((r) => {
        this.$bvModal.hide('verifymodal')
      }).catch((err) => {
        
      });
    },
    focusInput(){
      this.$refs.otp.focus();
    },
    closeModal(){
      // this.$bvModal.hide('verifymodal')
      console.log('resnd otp');
    },
    // fillandchangefocus(e,p1) {
    //     console.log(e,p1)
    //     if(isNaN(p1) || p1 ==''){
            
    //     }else{
    //         this.$refs[e].focus();
    //     }
    //     // console.log(this.$refs[e]);
        
    // },
  },
  created() {
    
   
  },
};
</script>

<style>
    .otp{
        letter-spacing: 16px;

    }
</style>
