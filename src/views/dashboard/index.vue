<template>
  <div class="home">
    <!-- 首页上部 -->
    <el-row class="row-top">
      <!-- 首页上部左侧 -->
      <el-col :span="18">1</el-col>
      <!-- 首页上部右侧 -->
      <el-col :span="6">2</el-col>
    </el-row>
    <!-- 首页下部 -->
    <el-row class="row-bottom">
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss">
.home>.el-row {
  margin-left: -10px;
  margin-right: -10px;
}
</style>
<style lang="scss" scoped>
.row-top {
  height: 538px;
}

.row-bottom {
  margin-top: 20px;
  height: 353px;
}
</style>
