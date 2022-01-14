<template>
  <div class="container">
    <div class="form-item">
      <h2 class="form-item__title">TOKEN</h2>
      <el-input v-model="githubForm.token" placeholder="TOKEN">
        <template> TOKEN </template>
      </el-input>
    </div>
    <div class="form-item">
      <h2 class="form-item__title">用户名</h2>
      <el-input v-model="githubForm.owner" placeholder="用户名">
        <template> 用户名 </template>
      </el-input>
    </div>
    <div class="form-item">
      <h2 class="form-item__title">仓库名</h2>
      <el-input v-model="githubForm.repos" placeholder="仓库名">
        <template> 仓库名 </template>
      </el-input>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">分支</h2>
      <el-input v-model="githubForm.branch" placeholder="分支">
        <template> 分支 </template>
      </el-input>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">目录方式</h2>
      <el-radio-group v-model="githubForm.dirType">
        <el-radio label="root">根目录</el-radio>
        <el-radio label="new">新建目录</el-radio>
        <el-radio label="auto">自动目录</el-radio>
      </el-radio-group>
      <el-input
        v-show="githubForm.dirType !== 'root'"
        v-model="githubForm.dir"
      ></el-input>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">文件名处理</h2>
      <el-radio-group v-model="githubForm.filenameHandler">
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

    <div class="form-item">
      <h2 class="form-item__title">展示链接</h2>
      <el-radio-group v-model="githubForm.linkType">
        <el-radio label="raw">原始链接</el-radio>
        <el-radio label="cdn">加速链接</el-radio>
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
import { getCurrentDate } from '../util'

export default {
  data() {
    return {
      githubForm: {
        token: '',
        owner: '',
        repos: '',
        dirType: 'root',
        dir: '/',
        branch: 'master',
        filenameHandler: 'origin',
        linkType: 'raw',
      },
    }
  },
  watch: {
    'githubForm.dirType': {
      handler(newVal, oldVal) {
        if (oldVal === newVal) return

        const settings = store.get('githubSettings')
        const resultMap = {
          root: this.$options.data().githubForm.dir,
          new: settings && settings.dir !== '/' ? settings.dir : '',
          auto: getCurrentDate(),
        }

        this.githubForm.dir = resultMap[newVal]
      },
    },
  },
  methods: {
    onSave() {
      const isFormValid = Object.keys(this.githubForm).every((key) => {
        return !!this.githubForm[key].trim()
      })

      if (!isFormValid) {
        return this.$message.error('请填写完整配置信息')
      }

      store.set('githubSettings', this.githubForm)
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
    const githubSettings = store.get('githubSettings')

    if (githubSettings) {
      this.githubForm = deepmerge(this.githubForm, githubSettings)
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
