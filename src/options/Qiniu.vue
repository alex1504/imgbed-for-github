<template>
  <div class="container">
    <div class="form-item">
      <h2 class="form-item__title">AK</h2>
      <el-input v-model="qiniuForm.ak" placeholder="AK">
        <template> AK </template>
      </el-input>
      <p class="form-item__tip">
        访问
        <a target="blank" href="https://portal.qiniu.com/user/key"
          >密钥管理获取</a
        >
        AK 和 SK
      </p>
    </div>
    <div class="form-item">
      <h2 class="form-item__title">SK</h2>
      <el-input v-model="qiniuForm.sk" placeholder="SK">
        <template> SK </template>
      </el-input>
      <p class="form-item__tip">
        访问
        <a target="blank" href="https://portal.qiniu.com/user/key"
          >密钥管理获取</a
        >
        AK 和 SK
      </p>
    </div>
    <div class="form-item">
      <h2 class="form-item__title">BUCKET</h2>
      <el-input v-model="qiniuForm.bucket" placeholder="BUCKET">
        <template> BUCKET </template>
      </el-input>
      <p class="form-item__tip">设置上传的BUCKET</p>
    </div>
    <div class="form-item">
      <h2 class="form-item__title">域名</h2>
      <el-input v-model="qiniuForm.domain" placeholder="域名">
        <template> 域名 </template>
      </el-input>
      <p class="form-item__tip">
        在
        <a target="blank" href="https://portal.qiniu.com/home">控制台</a>
        的对象存储中可以看到域名
      </p>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">存储区域</h2>
      <el-radio-group v-model="qiniuForm.region">
        <el-radio label="-z0">华东</el-radio>
        <el-radio label="-z1">华北</el-radio>
        <el-radio label="-z2">华南</el-radio>
        <el-radio label="-na0">北美</el-radio>
        <el-radio label="-as0">东南亚</el-radio>
      </el-radio-group>
      <p class="form-item__tip">
        存储区域和上传域名的对应关系参考
        <a href="https://portal.qiniu.com/home">开发者文档</a>
      </p>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">文件名处理</h2>
      <el-radio-group v-model="qiniuForm.filenameHandler">
        <el-radio label="origin">原始 </el-radio>

        <el-radio label="hash">哈希值</el-radio>
        <el-tooltip
          class="item"
          content="在文件名前拼接随机数的MD5值"
          placement="top"
        >
          <i class="el-icon el-icon-question"></i>
        </el-tooltip>

        <el-radio label="datePrefix">日期前缀</el-radio>
        <el-tooltip
          class="item"
          content="[YYYYMMDD]_[filename]"
          placement="top"
        >
          <i class="el-icon el-icon-question"></i>
        </el-tooltip>

        <el-radio label="timePrefix">时间前缀</el-radio>
        <el-tooltip
          class="item"
          content="[YYYYMMDD]_[HHmmss]_[filename]"
          placement="top"
        >
          <i class="el-icon el-icon-question"></i>
        </el-tooltip>
      </el-radio-group>
    </div>

    <div class="submit-panel">
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import store from 'storejs'
import deepmerge from 'deepmerge'

export default {
  data() {
    return {
      qiniuForm: {
        ak: '',
        sk: '',
        bucket: '',
        domain: '',
        region: '-z0',
        filenameHandler: 'origin',
      },
    }
  },
  methods: {
    onSave() {
      const isFormValid = Object.keys(this.qiniuForm).every(
        (key) => !!this.qiniuForm[key].trim()
      )

      if (!isFormValid) {
        return this.$message.error('请填写完整配置信息')
      }

      store.set('qiniuSettings', this.qiniuForm)
      this.$message.success('保存成功')

      setTimeout(() => {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            chrome.tabs.remove(tabs[0].id)
          }
        )
      }, 500)
    },
  },
  mounted() {
    const qiniuSettings = store.get('qiniuSettings')

    if (qiniuSettings) {
      this.qiniuForm = deepmerge(this.qiniuForm, qiniuSettings)
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
  min-width: 600px;
  padding: 20px;
}

.form-item {
  margin-top: 20px;
  &__tip {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
  &__title {
    margin-bottom: 10px;
  }
  .el-icon {
    margin-left: -26px;
    margin-right: 20px;
  }
}
.submit-panel {
  margin-top: 30px;
  text-align: center;
}
</style>
