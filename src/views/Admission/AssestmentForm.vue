<template>
  <div>
    <b-badge class="isCompleted" v-if="form.is_form_completed"  variant="success">This form is completed</b-badge>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <label> Completed NYSC </label>
        <b-form-radio-group
          @change="saveForm"
          v-model="form.nysc_completed"
          :options="options"
          class=""
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-radio-group>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Applying For</label>
          <select
            class="form-control form-control-sm"
            v-model="form.apply_for"
            @change="saveForm"
          >
            <option value="PGD">PGD</option>
            <option value="MA">MA</option>
            <option value="MSc">MSc</option>
            <option value="MPhil">MPhil</option>
            <option value="PhD">PhD</option>
            <option value="MPhil-PhD">MPhil-PhD</option>
            <option value="MBA">MBA</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Choose Programme</label>
          <select
            class="form-control form-contro-sm"
            v-model="form.programme_id"
            @change="saveForm"
          >
            <option v-for="(programme , index) in programmes" :key="index" :value="programme.id">{{programme.programme}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label>Choose Campus</label>
          <select
            class="form-control form-control-sm"
            v-model="form.choose_campus"
            @change="saveForm"
          >
            <option value="EDE CAMPUS">EDE CAMPUS</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label> One page about the research you wish to carry out </label>
          <div class="row no-gutters">
            <div class="col">
             
                <b-form-file
                id="essayFile"
                ref="essayFile"
                @change="validateEssay"
                v-model="formFiles.essay"
                size="sm"
                accept=".doc, .docx, .text, .txt , .pdf"
                :placeholder="
                  form.essay == null ? 'No file Choosen' : form.essay.name
                "
              ></b-form-file>
            </div>
            <div class="col-3">
              <button class="btn btn-sm btn-danger" @click="uploadEssay">
                Upload
              </button>
            </div>
          </div>
          <div>
            <b>{{
              form.essay == null
                ? " No file uploaded yet "
                : form.essay.name + " -- " + "Uploaded"
            }}</b>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label
            >Are You Attending Any College or University or Taking Any Course At
            Present</label
          >
          <b-form-radio-group
            @input="saveForm"
            v-model="form.college_attending_currently"
            :options="options"
            class=""
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-radio-group>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="form-group">
          <label
            >Publications & Title of Projects/Dissertation Submitted For Any
            Degree</label
          >
          <!-- <textarea class="form-control form-control-sm" v-model="form.publications" @change="saveForm" ></textarea> -->
          <b-form-tags v-model="form.publications" no-outer-focus class="mb-2">
            <template
              v-slot="{
                tags,
                inputAttrs,
                inputHandlers,
                tagVariant,
                addTag,
                removeTag,
              }"
            >
              <b-input-group class="mb-2">
                <b-form-input
                  v-bind="inputAttrs"
                  v-on="inputHandlers"
                  placeholder="Enter Publications - Press enter to add"
                  class="form-control"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="addTag()" variant="primary">Add</b-button>
                </b-input-group-append>
              </b-input-group>
              <div class="d-inline-block" style="font-size: 1.5rem">
                <b-form-tag
                  v-for="tag in tags"
                  @remove="removeTag(tag)"
                  :key="tag"
                  :title="tag"
                  :variant="tagVariant"
                  class="mr-1"
                  >{{ tag }}</b-form-tag
                >
              </div>
            </template>
          </b-form-tags>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="form-group">
          <label> Academic Distinctions/Prizes Received </label>
          <!-- <textarea class="form-control form-control-sm" v-model="form.academic_distinction_prize" @change="saveForm" ></textarea> -->
          <b-form-tags
            v-model="form.academic_distinction_prize"
            no-outer-focus
            class="mb-2"
          >
            <template
              v-slot="{
                tags,
                inputAttrs,
                inputHandlers,
                tagVariant,
                addTag,
                removeTag,
              }"
            >
              <b-input-group class="mb-2">
                <b-form-input
                  v-bind="inputAttrs"
                  v-on="inputHandlers"
                  placeholder="Enter Academic Distinctions - Press enter to add"
                  class="form-control"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="addTag()" variant="primary">Add</b-button>
                </b-input-group-append>
              </b-input-group>
              <div class="d-inline-block" style="font-size: 1.5rem">
                <b-form-tag
                  v-for="tag in tags"
                  @remove="removeTag(tag)"
                  :key="tag"
                  :title="tag"
                  :variant="tagVariant"
                  class="mr-1"
                  >{{ tag }}</b-form-tag
                >
              </div>
            </template>
          </b-form-tags>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label
            >Give Any Other Information Which You Consider Relevant To The
            Application</label
          >
          <textarea
            class="form-control form-control-sm mt-2"
            placeholder="Other information"
            @change="saveForm"
            v-model="form.relevant_info"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Upload Other Relevant Documents</label>
          <div class="row no-gutters">
            <div class="col">
              <b-form-file
                id="relevantFile"
                size="sm"
                v-model="formFiles.relevant_file"
                multiple
              >
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge
                    variant="dark"
                    class="ml-1"
                    v-for="(n, i) in names"
                    :key="i"
                    >{{ n }}</b-badge
                  >
                </template>
              </b-form-file>
            </div>
            <div class="col-3">
              <button
                class="btn btn-danger btn-sm"
                @click="uploadRelevantFiles"
              >
                upload
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="btn btn-info pl-0 pr-0 pb-0 pt-0 m-1" v-for="(relevantFile , index) in form.relevant_file" :key="index" >
                 {{relevantFile.name}} 
                <button class="btn btn-danger rounded float-md-right btn-sm small-font pt-0 m-1" v-b-tooltip.hover title="delete file" @click="deleteFile(relevantFile.path, index)" > X </button> 
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <validation-popover
      :bgColor="popOverData.bgColor"
      :target="popOverData.target"
      :title="popOverData.title"
      :message="popOverData.message"
      :show="popOverData.show"
      :action="popOverData.action"
    />

    <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
      <template #overlay>
        <div class="text-center p-4 bg-primary text-light rounded">
          <b-icon icon="cloud-upload" font-scale="4"></b-icon>
          <div class="mb-1">Upload</div>
          <b class="small-font mb-2">Please wait</b>
          <b-progress
            min="1"
            max="100"
            :value="uploadPercentage"
            variant="success"
            height="3px"
            class="mx-n4 rounded-0"
          ></b-progress>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "assestmentform",
  data() {
    return {
      form: {
        academic_distinction_prize: null,
        application_id: "",
        choose_campus: null,
        college_attending_currently: null,
        created_at: "",
        essay: null,
        id: "",
        is_form_completed: "",
        nysc_completed: "",
        programme_id: null,
        publications: null,
        relevant_info: null,
        relevant_file: null,
        apply_for: null,
        updated_at: "",
      },
      formFiles: {
        essay: null,
        relevant_file: null,
      },

      options: [
        { item: 1, name: "Yes" },
        { item: 0, name: "No" },
      ],
      popOverData: {
        bgColor: "",
        title: " ",
        message: "",
        target: "",
        show: false,
        action: true,
      },
      nysc: "",
      previouscollege: "",
      uploadPercentage: "",
      busy: false,
      // programmes:[],
    };
  },
  methods: {
    onShown() {},
    onHidden() {},
    fillForm() {
      try {
        this.form = this.$store.state.ApplicationForm.applicationForm.assestmentForm;
      } catch (error) {
        console.log(error);
      }
    },
    saveForm() {
      this.$store.dispatch("ApplicationForm/saveAssestmentForm", this.form);
    },
    async validateEssay(e) {
      // console.log(e);
      return new Promise((res, rej) => {
        let filePath = this.$refs.essayFile.$refs.input.value;
        console.log(this.$refs.essayFile.$refs.input.value);
        var allowedExtensions = /(\.doc|\.docx|\.pdf|\.text|\.txt)$/i;
        try {
          if (!allowedExtensions.exec(filePath)) {
            // console.log("Invalid file type");
            if (this.formFiles.essay ) {
              Fire.$emit("validationPopOver", {
                bgColor: "danger",
                title: "Invalid File",
                message: "Files allowed are .doc, .docx, .pdf and .txt",
                target: "essayFile",
                show: true,
                action: "onOpen",
              });
              // this.$root.$emit('bv::show::popover', 'popOver')
            } else {
              Fire.$emit("validationPopOver", {
                bgColor: "info",
                title: "Select a File",
                message: "Browse for a file or Drag and drop a file here",
                target: "essayFile",
                show: true,
                action: "onOpen",
              });
              // this.$root.$emit('bv::show::popover', 'popOver')
            }
            this.formFiles.essay = null;
          } else {
            console.log("correct");
            Fire.$emit("validationPopOver", {
              action: "onClose",
            });
            res(true);
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    async uploadEssay() {
      await this.validateEssay();
      this.busy = true;
      let formData = new FormData();
      formData.append("essay", this.formFiles.essay);
      formData.append("id", this.form.id);
      axios
        .post("uploadEssay", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((response) => {
          if (response.data.msg == "success") {
            this.form = response.data.assessment;
          }
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    async uploadRelevantFiles() {
      if (this.formFiles.relevant_file) {
        this.busy = true;
        let formData = new FormData();
      formData.append('relevantFile1', this.formFiles.relevant_file[0]);
      formData.append('relevantFile2',this.formFiles.relevant_file[1]);
      formData.append("id", this.form.id);
        axios.post("uploadRelevantFile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
          .then((response) => {
            console.log(response.data);
            this.form = response.data.assessment
            this.busy = false;
            this.formFiles.relevant_file=null
          })
          .catch((err) => {
            this.busy = false
          });
      } else {
        Fire.$emit("validationPopOver", {
          bgColor: "info",
          title: "Select a file",
          message: "Browse for a file or Drag n Drop one here",
          action: "onOpen",
          target: "relevantFile",
        });
      }
    },

    deleteFile(filePath, index){
      axios.delete('applicantDeleteRelevantFile', {
        params:{
          index:index , path:filePath, assessmentFormID:this.form.id
        }
      })
      .then((response) => {
        // console.log(response)
         if (response.data.msg == "success") {
            this.form = response.data.assessment;
          }
      }).catch((err) => {
        
      });
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
  mounted() {
    this.fillForm();
    this.getProgrammes();
  },
  computed: {
    programmes(){
      return this.$store.state.programmes;
    }
  },
};
</script>

<style>
.isCompleted{
    position: absolute; 
    overflow: hidden; 
    /* left:40rem; */
     top:4rem;
     border-radius: 25px; 
     z-index:100
  }
</style>
