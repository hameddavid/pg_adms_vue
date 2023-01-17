<template>
  <div>
      <div class="border-left border-3 ">
        <div class="card small-font border-0 bg-transparent">
          <div class="card-body pl-2 pr-2 pt-1 pb-1 border-bottom">
            <h1 class="small-font text-center m-0">{{notification.data.type}}</h1>
            <!-- <span class="badge bg-success text-white">{{notification.data.deny_reason}}</span> -->
              <div class="callout callout-info pl-2 pt-0 pb-0 pr-0 mt-1 mb-2">
              <b>Reason(s)</b> <br/>
              <hr class="p-0 m-0" />
               <span class="text-monospace">{{notification.data.deny_reason}}</span>
            </div>
            <!-- <button class="btn btn-success btn-sm action-btn pt-0 pb-0 p2-1 pr2 float-right" disabled v-if="notification.activated">Done</button>
            <button v-else
              class="btn btn-info btn-sm action-btn pt-0 pb-0 p2-1 pr2 float-right"  @click="handleActivate"
            >
            <span
                          v-if="busy"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
              activate
            </button> -->
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['notification'],
    data() {
        return {
            busy:false
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>