<template>
  <div>
    <div>
      <div class="picture-container" buzztech-data="profileImage">
        <!-- <b-avatar :src="previewUrl" size="4rem"></b-avatar> -->
        <div class="picture">
          <img
            :src="previewUrl"
            id="wizardPicturePreview"
            title=""
            alt="profile image"
            style="height: 100%; width: 100%"
            @error="check"
          />
          <!-- <b-avatar :src="previewUrl" size="4rem"></b-avatar> -->
          <!-- <input type="file" id="wizard-picture" class="" /> -->
          <b-form-file
            accept=".png, .jpeg, .jpg"
            v-model="profileImage"
            @change="preview"
            
            class=""
            plain
            style="float: left; height: 100%; width: 100%"
          ></b-form-file>
        </div>
        <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
          <template #overlay>
            <div class="text-center rounded">
              <b-icon
                icon="text-paragraph"
                animation="fade"
                font-scale="4"
              ></b-icon>
            </div>
          </template>
        </b-overlay>
      </div>
    </div>
    <div class="upload" buzztech-data="profileImageUploadBtn">
        <template v-if="profileImage">
           <b-button-group >
      <button  v-b-tooltip.hover title="Upload" class="btn btn-outline-info btn-sm rou" @click="uploadImage" >
          <b-icon icon="cloud-upload-fill" font-scale="1"></b-icon>
      </button>
      <button  v-b-tooltip.hover title="Cancel" class="btn btn-outline-danger btn-sm rou" @click="cancelUpload">
          <b-icon icon="x-square" font-scale="1"></b-icon>
      </button>
    </b-button-group>
        </template>
     
    </div>
  </div>
</template>

<script>
import { isNull } from 'lodash';
import Ax from 'axios';
export default {
  name: "ProfileImage",
  data() {
    return {
      profileImage: null,
      previewUrl: "",
      oldPreviewUrl: "",
      busy: false,
    };
  },
  methods: {
    onShown() {},
    onHidden() {},
    loadImage() {
      this.busy = true;
      axios({
        url: "/viewProfileImage",
        method: "POST",
        responseType: "blob",
      })
        .then((response) => {
          var objectURL = URL.createObjectURL(response.data);
          this.previewUrl = objectURL;
            this.$store.dispatch('getProfileImage', this.previewUrl)
          // this.previewUrl = response.data
          this.busy = false;
        })
        .catch((err) => {
          Fire.$emit("validateProfileImg")
          this.busy = false;
        });
    },
    preview(e) {
        this.oldPreviewUrl = this.previewUrl
      if (e) {
        const image = e.target.files[0];
        let url = URL.createObjectURL(image);
        this.previewUrl = url;
      }
    },
    uploadImage() {
      this.busy = true;
      let formData = new FormData();
      formData.append("profileImage", this.profileImage);
      axios
        .post("uploadProfileImage", formData)
        .then((response) => {
          this.busy = false;
          this.profileImage = null
            this.$store.dispatch('getProfileImage', this.previewUrl)
            this.loadImage();
          Fire.$emit("closeValidateProfileImgModal")
        })
        .catch((err) => {
          Toast.fire({
            icon:"error",
            title:"Image upload failed"
          })
          this.busy = false;
        });
    },
    cancelUpload(){
        this.previewUrl = this.oldPreviewUrl
        this.profileImage =null;
        
    },
    getImageFromStore(){
        this.previewUrl = this.$store.state.profileImage
        if(this.previewUrl == null){
          this.loadImage()
        }
    },
    check(){
        console.log('error');
        
        this.loadImage();
    }
  },
  async mounted() {
      this.getImageFromStore();
    //   if(_.isNull(this.previewUrl)){
    //       this.loadImage();
    //   }
    //   console.log(this.previewUrl)
    //  let response = await fetch(this.previewUrl);
    //  let commit = await response.blob();
    // console.log(commit)



  },
  created() {
      // Fire.$on('getProfileImage', ()=>{
      //   Fire.$emit('sendProfileImage', this.previewUrl)
      // })
  },
};
</script>

<style scoped>
.rou {
  border-radius: 4rem;
}
.upload {
  position: absolute;
  left: 6.5rem;
  top: 1.9999rem;
  z-index: 100;
}
/*Profile Pic Start*/
.picture-container {
  position: relative;
  cursor: pointer;
  /* text-align: center; */
}
.picture {
  width: 96px;
  height: 96px;
  background-color: #999999;
  border: 4px solid #cccccc;
  color: #ffffff;
  border-radius: 50%;
  /* margin: 0px auto; */
  /* margin-bottom: 30px; */
  overflow: hidden;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}
.picture:hover {
  border-color: #2ca8ff;
}
.content.ct-wizard-green .picture:hover {
  border-color: #05ae0e;
}
.content.ct-wizard-blue .picture:hover {
  border-color: #3472f7;
}
.content.ct-wizard-orange .picture:hover {
  border-color: #ff9500;
}
.content.ct-wizard-red .picture:hover {
  border-color: #ff3b30;
}
.picture input[type="file"] {
  cursor: pointer;
  display: block;
  /* height: 100%; */
  left: 0;
  opacity: 0 !important;
  position: absolute;
  top: 0;
  width: 45%;
}

.picture-src {
  width: 100%;
}
</style>
