<template>
  <div class="d-inline">
    <button v-if="btn" v-b-modal.admissionValidatormodal class="btn btn-warning ml-1" id="validatorBtn">
      <b-icon icon="exclamation-triangle"></b-icon>
    </button>
    <b-tooltip :show="tooltip" target="validatorBtn" placement="right">
      <strong> Click here to view the incomplete part(s) of the form </strong>
    </b-tooltip>

    <b-modal v-model="modalShow" id="admissionValidatormodal"  centered hide-footer hide-header>
        <template #default="{hide}">
             <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">List of incomplete fields</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="p-1">
                <div v-for="(validator , index) in validator" :key="index" class="small-font" >
                <div class="p-1 border-bottom border-3 border-dark">
                    <h6 class="text-center">{{index}}</h6>
                    <div class="border border-2 border-danger p-2">
                        <div v-for="field in validator " class="d-bloack" :key="field">{{field}}</div>
                    </div>
                </div>
            </div>
            </div>
            <!-- <p>{{validator}}</p> -->
          </div>
        </div>
        </template>

  </b-modal>
  </div>
</template>

<script>
export default {
    data() {
        return {
            modalShow:false,
            btn:false,
            tooltip:false,
        }
    },
    methods: {
        showValidator(){

        }
    },
    computed: {
        validator(){
            return this.$store.state.ApplicationForm.validator;
        }
    },
    created() {
        Fire.$on('admissionValidator',()=>{
            this.modalShow =true;
            this.btn= true
            this.tooltip = true
        });
    },
};
</script>

<style></style>
