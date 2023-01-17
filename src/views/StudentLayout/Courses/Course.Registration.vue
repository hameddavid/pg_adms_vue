<template>
  <div>
    <div class="d-block">
      <p class="text-center m-0 p-0">
        <button
          class="btn text-center btn-outline-info rounded-pill"
          v-b-modal.courseRegistrationModal
        >
          Start Course Registration
        </button>
      </p>
    </div>

    <b-modal id="courseRegistrationModal" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
