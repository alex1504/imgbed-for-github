<template>
  <div>
    <el-upload
      class="upload-area"
      drag
      :action="uploadUrl"
      :data="uploadData"
      :before-upload="onBeforeUpload"
      :on-success="onUploadSccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传到七牛</em>
      </div>
      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件</div> -->
    </el-upload>
    <el-input class="item" :value="qiniuResult.imgLink">
      <template slot="prepend">图片链接</template>
    </el-input>
    <el-input class="item" :value="qiniuResult.markdownLink">
      <template slot="prepend">Markdown</template>
    </el-input>
    <el-input class="item" :value="qiniuResult.htmlLink">
      <template slot="prepend">HTML</template>
    </el-input>
  </div>
</template>

<script>
import { datePrefixHandler, hashHandler, timePrefixHandler } from '../util'
import store from 'storejs'
import {
  genQiniuUploadToken,
  genImageLink,
  genMarkdownLink,
  genHtmlLink,
} from '../util'

export default {
  data() {
    return {
      uploadData: {},
      qiniuResult: {
        imgLink: '',
        markdownLink: '',
        htmlLink: '',
      },
    }
  },
  computed: {
    uploadUrl() {
      const settings = store.get('qiniuSettings')
      const { region } = settings

      return `https://up${region === '-z0' ? '' : region}.qiniup.com`
    },
  },
  methods: {
    handleFilename(filename) {
      const settings = store.get('qiniuSettings')
      const { filenameHandler: handlerKey } = settings

      const handlerMap = {
        origin: (filename) => filename,
        timePrefix: timePrefixHandler,
        datePrefix: datePrefixHandler,
        hash: hashHandler,
      }

      return handlerMap[handlerKey]
        ? handlerMap[handlerKey](filename)
        : filename
    },
    onBeforeUpload(file) {
      this.uploadData.name = file.name
      this.uploadData.type = file.type
      this.uploadData.lastModifiedDate = file.lastModifiedDate
      this.uploadData.size = file.size
      this.uploadData.key = this.handleFilename(file.name)
    },
    onUploadSccess(res, file) {
      const imgLink = genImageLink(res.key)
      const markdownLink = genMarkdownLink(res.key, file.name)
      const htmlLink = genHtmlLink(res.key, file.name)
      const result = {
        imgLink,
        markdownLink,
        htmlLink,
      }

      this.qiniuResult = result
      this.$bus.$emit('onUploadSuccess', result)
    },
  },
  mounted() {
    const settings = store.get('qiniuSettings')
    const { ak, sk, bucket } = settings
    const token = genQiniuUploadToken(ak, sk, bucket)
    this.uploadData.token = token
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
