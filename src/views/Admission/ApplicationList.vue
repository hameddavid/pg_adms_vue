<template>
  <div class="card border-top border-bottom-0 border-left-0 border-right-0 border-primary shadow-sm">
      <div class="card-body">
        <div class="text-center p-2">
          <h6 class="text-monospace">Application Lists</h6>
        </div>
        <template v-if="applicationList.length == 0">
          <div class="text-danger">You have no application(s) yet</div>
        </template>
        <!-- <p>{{applicationList}}</p> -->
        <template v-else>
          <ul class="list-group">
            <li
              class="list-group-item pl-2 pt-1 pb-1 mb-2"
              v-for="(list, index) in applicationList"
              :key="list.id"
            >
              <div class="d-inline mt-5">
                <span>{{ programmeName(list.assessment.programme_id, index) }}</span>
                <!-- <template v-if="programmeName(list.assessment.programme_id)">
                </template>
                <template v-else>
                  <b-spinner type="grow" variant="danger"></b-spinner>
                  editForm(list, index)
                </template> -->
                <span class="p-3" :class="statusStyle(list.status)">{{
                  list.status
                }}</span>
              </div>
              <button class="btn btn-link btn-sm float-right" v-for="(btnDetails , index) in applicationBtn(list.status)" :key="index"  @click="btnDetails.action(list, index)">
                <b-tooltip target="link-button" title="Tooltip title" triggers="focus">
                  Tooltip title
              </b-tooltip>
                {{btnDetails.text}}
              </button>
            </li>
          </ul>
        </template>
      </div>
      <accept-admission></accept-admission>
      <admission-letter :admissionLetter="admissionLetter" :show="showAdmissionLetter"></admission-letter>
  </div>
</template>

<script>
import AcceptAdmission from './AcceptAdmission.vue';
import AdmissionLetter from './admissionLetter.vue';
export default {
  components: { AcceptAdmission, AdmissionLetter },
    data() {
        return {
            lists:[],
            admissionLetter:null,
            showAdmissionLetter:false
        }
    },
  computed: {
    applicationList() {
      return this.$store.state.applicationLists;
    },
  },
  methods: {
    checkRequirements(item){
      this.$bvModal.msgBoxOk(item.deny_reason, {
          title: 'Requirements',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          bodyClass:'p-5 ml-2 mr-2 mt-2 mb-2'
        })
          .then(value => {
            console.log( value)
          })
          .catch(err => {
            // An error occurred
          })
    },
     programmeName(id , index){
       let programmes = this.$store.state.programmes
       let programme = programmes.find(e => e.id == id)
       if(programme){
         return programme.programme
       }else{
         return `Application ${index + 1}`;
       }
      },
      editForm(list, index){
        list.index = index;
        // console.log(list)
          Fire.$emit('editForm',list)
      },
      applicationBtn(status){
         if (status == "awaiting submission") {
        return [{text:'Fill Form', action:this.editForm , value:true}
          // {text:"Programme Requirements", action:this.programmeRequirement , value:true }
        ];
      } else if(status == "pending"){
        return [
          {value:true, text:"Check Requirement", action:this.checkRequirements},
          {value:true, text:"Fill Form", action:this.editForm }
        ]
      } else if (status == "submitted under processing") {
        return {value:false};
      } else if (status == "approved") {
        return [ {text:'Accept Admission', action:this.acceptAdmission, value:true},
          {text:'Print Admission Letter', action:this.admissionletter, value:true}
          ];
      } else if(status == "student"){
        return [{text:'Print Admission Letter', action:this.admissionletter, value:true}];
        }else {
        return {value:false};
      }
      },
      admissionletter(list){
        // console.log("here")
        this.admissionLetter =list.admissionLetter
        Fire.$emit("SHOW-ADMISSION-LETTER")
        // this.showAdmissionLetter = true
        // console.log()
      },
      acceptAdmission(list, index){
        // console.log(applicationId)
        Fire.$emit('acceptAdmission', list.id);
      },
       statusStyle(status) {
      if (status == "awaiting submission") {
        return "text-danger";
      } else if(status == "pending"){
        return "text-danger";
      } else if (status == "submitted under processing") {
        return "text-warning";
      } else if (status == "approved") {
        return "text-success";
      } else if(status == "student"){
        return "text-success"
        }else {
        return "text-danger";
      }
      // denied
    },
    getProgrammes(){
      if (this.$store.state.programmes) {
        return true
      }else{
        this.$store.dispatch('getProgrammes');
        return true
      }
    }
  },
  created() {
    this.getProgrammes();
    this.$store
      .dispatch("applicationLists")
      .then((result) => {
          // console.log(result)
      })
      .catch((err) => {});
  },
};
</script>

<style></style>
