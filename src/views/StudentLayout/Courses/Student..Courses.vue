<template>
  <div class="dontprintcom">
    <div class="card bg-white p-0 border-0 rounded-top">
      <div class="card-header pb-2 pt-2 border-info border-2">
        <label class="m-0 font-weight-bold">COURSES </label>
        <b-icon
          icon="question-circle-fill"
          variant="primary"
          class="rounded float-right mt-1"
          scale="1.5"
        ></b-icon>
      </div>
      <div class="card-body bg-transparent px-0 py-1">
        <div>
          <carousel />
        </div>
        <course-registration />
        <registered-courses />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "./carousel.vue";
import CourseRegistration from "./Course.Registration.vue";
import RegisteredCourses from "./Registered.Courses.vue";
export default {
  components: { RegisteredCourses, CourseRegistration, Carousel },
};
</script>

<style>
.bg-custom-green-1 {
  background: rgba(129, 192, 73, 0);
  /* background: linear-gradient(); */
}

@media print {
  .dontprintcom {
    display: none;
  }
}
</style>
