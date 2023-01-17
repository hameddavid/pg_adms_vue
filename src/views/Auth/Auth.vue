<template>
  <div>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn:false,
            loading:'',
        }
    },
  //load selekton
  // check auth status
  // student
  created() {
      this.$store.dispatch('checkAuth').then((result) => {
          if(result){
              this.isLoggedIn = result;
              this.$router.replace({name:'studentlayout'})
          }
      }).catch((err) => {
          this.loading = 'stop'
          this.$router.replace({name:'login'})
      });
  },
};
</script>

<style></style>
