<template>
  <div>
    <b-icon
      icon="question-circle-fill"
      v-b-tooltip.hover
      title="Click here to see list of documents to be uploaded"
      variant="primary"
      scale="1.2"
      v-b-modal.credentialRequirements
      aria-label="Help"
    ></b-icon>

    <b-modal id="credentialRequirements" centered hide-footer hide-header>
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Credential(s) upload list</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="card-body">
              <p>List required credentials</p>
            </div>
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
      credentials: [],
      helpMsg: "",
    };
  },
};
</script>

<style></style>
