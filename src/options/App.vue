<template>
  <div class="container">
    <h1>图床配置</h1>

    <el-tabs v-model="activeOrigin">
      <el-tab-pane label="七牛云图床" name="qiniu">
        <QiniuOptions></QiniuOptions>
      </el-tab-pane>
      <el-tab-pane label="Github图床" name="github">
        <GithubOptions></GithubOptions
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from 'storejs'
import QiniuOptions from './Qiniu.vue'
import GithubOptions from './Github.vue'

export default {
  watch: {
    activeOrigin(newVal) {
      store.set('activeOrigin', newVal)
    },
  },
  components: {
    QiniuOptions,
    GithubOptions,
  },
  data() {
    return {
      activeOrigin: store.get('activeOrigin') || 'qiniu',
    }
  },
  methods: {},
  mounted() {
    store.set('activeOrigin', this.activeOrigin)
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
