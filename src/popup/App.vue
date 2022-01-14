<template>
  <div class="container">
    <QiniuPopup v-if="activeOrigin === 'qiniu'"></QiniuPopup>
    <GithubPopup v-if="activeOrigin === 'github'"></GithubPopup>
  </div>
</template>

<script>
import QiniuPopup from './Qiniu.vue'
import GithubPopup from './Github.vue'
import store from 'storejs'

export default {
  components: {
    QiniuPopup,
    GithubPopup,
  },
  data() {
    return {
      activeOrigin: store.get('activeOrigin'),
      result: null,
    }
  },
  methods: {},
  mounted() {
    this.$bus.$on('onUploadSuccess', (data) => {
      this.result = data
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (this.result) {
        sendResponse(this.result.markdownLink)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .upload-area {
    margin-top: 20px;
    &::v-deep {
      .el-upload,
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
  .item {
    margin-top: 10px;
  }
}
</style>
