<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <!-- <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle> -->
      <b-navbar-brand>
         <button class="btn btn-light" @click="toggleSideBar">
              <font-awesome-icon :icon="['fa','bars']" />
         </button>
      </b-navbar-brand>

      <!-- <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>Navbar text</b-nav-text>
        </b-navbar-nav>
      </b-collapse> -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSidebar: true,
    };
  },
  methods: {
    toggleSideBar() {
      Fire.$emit("sidebar");
    },
  },
};
</script>

<style></style>
