<template>
  <div>
      <b-modal modal-class="modal-fullscreen modal-dialog " id="admissionLetter-modal" hide-footer hide-header v-model="show" >
          <template #default="{ hide }">
        <div>
          <b-icon
            icon="x-circle"
            scale="1"
            variant="danger"
            @click="hide()"
            media="print"
            class="mt-1 mr-2 float-right dontprint"
          ></b-icon>
         
        </div>
        <!-- body -->
        <div class="letter" id="letter" v-html="admissionLetter">
            
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>
export default {
    props:["admissionLetter"],
    data() {
        return {
            show:false,
            loading:false
        }
    },
    methods: {
        getAdmissionLetter(){
            axios.get('getAdmissionLetter')
            .then((response) => {
                this.admissionLetter = response.data
            }).catch((err) => {
                
            });
        }
    },
    created() {
        Fire.$on('SHOW-ADMISSION-LETTER',()=>{
            this.show = true
            setTimeout(() => {
                this.loading = false
                var divContents = document.getElementById("letter").innerHTML;
                var a = window.open('', '', 'height=800, width=800');
                a.document.write(divContents);
                a.document.close();
                a.print();
            }, 1000);
            // if (this.admissionLetter) {
            // }
        }); 
       

        
    },
}
</script>

<style>
.modal-fullscreen .modal-dialog {
  max-width: 100%;
  /* width: 100vw; */
 
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 100vh; */
  display: flex;
  /* position: fixed; */
  /* z-index: 100000; */
}
.receipt-logo {
  height: 5rem;
}
.userImg {
  height: 10rem;
}
.sign{
    height: 10rem;
}
.dontprint{
    display: none;
}

</style>