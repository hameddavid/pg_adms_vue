<template>
<div class="container">
    <div class="row con">
        <div class="col-sm-12 my-auto">
            <div class="text-center w-100 mx-auto">
                <div class="text-danger" >
                    <h1 class="display-1">4 0 4</h1>
                    <h1>Not Found</h1>
                </div>
                <button class="btn btn-outline-danger" @click="homeRoute">Go Home</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
      homeRoute() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.con{
    height: 100vh;
}

</style>
