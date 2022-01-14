<template>
  <div>
    <el-upload
      class="upload-area"
      drag
      action="#"
      :auto-upload="false"
      :on-change="onFileChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传到Github</em>
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

import { GhImgUploader } from 'github-image-uploader'

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
    onFileChange(file) {
      const { token, owner, repos, dir, branch } = store.get('githubSettings')
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        const base64 = e.target.result
        const uploader = new GhImgUploader({
          token,
          owner,
          repos,
          dir,
          branch,
        })

        uploader
          .upload({
            base64Img: base64.replace(/data.+?;base64,/, ''),
            filename: file.name,
            filenameHandler: this.getFilenameHandler(),
          })
          .then((res) => {
            const {
              githubHtml,
              githubMarkdown,
              githubRaw,
              jsdelivrHtml,
              jsdelivrMarkdown,
              jsdelivrRaw,
            } = res

            this.handleResult({
              raw: {
                htmlLink: githubHtml,
                markdownLink: githubMarkdown,
                imgLink: githubRaw,
              },
              cdn: {
                htmlLink: jsdelivrHtml,
                markdownLink: jsdelivrMarkdown,
                imgLink: jsdelivrRaw,
              },
            })
          })
      }

      fileReader.readAsDataURL(file.raw)
    },

    handleResult(res) {
      const { linkType } = store.get('githubSettings')
      const result = res[linkType]

      this.qiniuResult = result
      this.$bus.$emit('onUploadSuccess', result)
    },

    getFilenameHandler() {
      const settings = store.get('githubSettings')
      const { filenameHandler: handlerKey } = settings

      const handlerMap = {
        origin: (filename) => filename,
        timePrefix: timePrefixHandler,
        datePrefix: datePrefixHandler,
        hash: hashHandler,
      }

      return handlerMap[handlerKey] || handlerMap['origin']
    },
  },
  mounted() {},
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
