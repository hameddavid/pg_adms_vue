<template>
  <div>
    <b-alert :show="helpAlert"  class="bg-dark small-font text-white card-header mb-1">
        <h4 class="alert-heading">Upload steps</h4>
        <p>
          Select the file type you want to upload. "<label class="btn-link" for="filetype">Select a file type to upload</label>"<br/> 
          click on browse, select the file from your device
        </p>
        <p class="mb-1">
          Want to upload a file with a different name? <br/>
          Select other file from "<label class="btn-link" for="filetype">Select a file type to upload</label>"
        </p>
        <hr class="m-0"/>
        <p class="mb-0">
          After selecting and browsing for all the files you need click the save button
        </p>
      </b-alert>
    <div class="card">
     
      <div class="card-body">
        <credential-requirements class="float-right"></credential-requirements>
        <!-- {{forms}} -->
        <label
          class="btn btn-info btn-sm pl-0 pr-0 pb-0 pt-0 m-1"
          v-for="(fileinfo, index) in forms.credentials"
          :key="index"
        >
          {{ fileinfo.name }}
          <button
            class="btn btn-danger rounded float-md-right btn-sm small-font ml-2"
            v-b-tooltip.hover
            title="delete file"
            @click="deleteFile(fileinfo, index)"
          >
            <font-awesome-icon icon="window-close" />
          </button>
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="filetype">Select a file type to upload</label>
          <select id="filetype"
            class="form-control form-control-sm"
            @change="increaseForm"
            v-model="type"
          >
            <optgroup label="Select a file to upload">
              <option value="SSCE">SSCE</option>
              <option value="NYSC">NYSC</option>
              <option value="FIRSTDEGREE">FIRST DEGREE</option>
              <option value="OtherFile">Other File</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="col-12" v-for="(knownFile, index) in knownForm" :key="index">
        <div class="form-group">
          <label>{{ knownFile.name }}</label>
          <div class="row no-gutters">
            <div class="col">
              <b-form-file
                v-model="knownForm[index].file"
                size="sm"
                :placeholder="
                  knownFile.file == null
                    ? `click here to upload ${knownFile.name}`
                    : 'FileName'
                "
              ></b-form-file>
            </div>
            <div class="col-3">
              <!-- <button class="btn btn-info btn-sm" @click="uploadFiles" >upload</button> -->
              <button
                class="btn btn-sm btn-danger"
                v-b-tooltip.hover
                title="Remove File"
                @click="reduceForm(index)"
              >
                <font-awesome-icon icon="window-close" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div v-for="(count, index) in otherForm" :key="index">
          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label>Title of the document</label>
              <input
                class="form-control form-control-sm"
                v-model="otherForm[index].name"
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <label>File </label>
              <b-form-file
                v-model="otherForm[index].file"
                id="file-small"
                size="sm"
              ></b-form-file>
            </div>
          </div>

          <div class="text-center">
            <button
              class="mb-2 text-center btn btn-danger btn-sm pt-0 pb-0"
              @click="removeForm(index)"
            >
              remove
            </button>
          </div>
        </div>

        <div class="form-group text-center">
          <!-- <button
            class="btn-run-outline-primary btn-run text-goldenrod"
            @click="increaseForm"
          >
            Add More
          </button> -->
          <button class="btn btn-info ml-2" @click="uploadFiles">Save</button>
          <!-- <p>{{knownForm}}</p> -->
        </div>
      </div>
    </div>
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
import credentialRequirements from '../helper/credentialRequirements.vue';
export default {
  components: { credentialRequirements },
  name: "admissioncredentials",
  data() {
    return {
      title: [],
      files: [],
      formCount: 1,
      otherForm: [],
      knownForm: [],
      work: "",
      type: "",
      uploadPercentage: "",
      busy: false,
      forms: {},
      helpAlert:false,
    };
  },
  mounted() {
    this.fillForm();
  },
  methods: {
    validattion() {
      return new Promise((res, rej) => {
        let checkKnownForm = false;
        let checkOtherForm = false;
        for (let kn = 0; kn < this.knownForm.length; kn++) {
          const element = this.knownForm[kn];
          if (!_.isEmpty(element.file)) {
            checkKnownForm = true;
            break;
          }
        }
        for (
          let otherForm = 0;
          otherForm < this.otherForm.length;
          otherForm++
        ) {
          const element = this.otherForm[otherForm];
          if (!_.isEmpty(element.file)) {
            checkOtherForm = true;
            break;
          }
        }
        if (!checkKnownForm && !checkOtherForm) {
          res(false);
        } else {
          res(true);
        }
      });
    },
    deleteFile(fileinfo, index) {
      axios
        .delete("deleteCredential", {
          params: { id: this.forms.id, index: index, path: fileinfo.path },
        })
        .then((response) => {
          this.forms = response.data;
          // console.log(response.data)
        })
        .catch((err) => {});
    },
    saveForm() {
      this.$store.dispatch("ApplicationForm/saveCredentails", this.forms);
    },
    fillForm() {
      this.forms = this.$store.state.ApplicationForm.applicationForm.credentials;
    },
    onShown() {},
    onHidden() {},
    increaseForm() {
      this.formCount++;
    },
    saveFile(index) {},
    increaseForm() {
      let knownFileObj = { name: this.type, file: null };
      if (this.type != "OtherFile") {
        let knownFileObj = { name: this.type, file: null };
        let check = this.knownForm.findIndex((e) => e.name == this.type);
        console.log(check);
        if (check > -1) {
          console.log("exits");
          knownFileObj.name = `${this.type}${this.knownForm.length}`;
          this.knownForm.push(knownFileObj);
        } else {
          // console.log('not exist')
          this.knownForm.push(knownFileObj);
        }
        this.type = "";
      } else {
        let other = { name: "", file: null };
        this.otherForm.push(other);
        this.type = "";
      }
    },
    reduceForm(index) {
      this.knownForm.splice(index, 1);
    },
    removeForm(index) {
      this.otherForm.splice(index, 1);
    },
    async uploadFiles() {
      let validation = await this.validattion();
      if (!validation) {
        this.helpAlert = true;
        return false;
      }
      this.busy = true;
      this.knownForm.forEach((element) => {
        let knownForm = new FormData();
        knownForm.append(element.name, element.file);
        axios
          .post(
            `credentialsUpload/${element.name}/${this.forms.id}`,
            knownForm,
            {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: function (progressEvent) {
                this.uploadPercentage = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this),
            }
          )
          .then((response) => {
            this.forms = response.data;
            this.busy = false;
            this.knownForm = [];
          })
          .catch((err) => {
            this.busy = false;
          });
      });
      this.otherForm.forEach((element) => {
        let otherForm = new FormData();
        otherForm.append(element.name, element.file);
        axios
          .post(
            `credentialsUpload/${element.name}/${this.forms.id}`,
            otherForm,
            {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: function (progressEvent) {
                this.uploadPercentage = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this),
            }
          )
          .then((response) => {
            this.forms = response.data;
            this.otherForm = [];
            this.busy = false;
          })
          .catch((err) => {
            this.busy = false;
          });
      });
    },
  },
};
</script>

<style></style>
