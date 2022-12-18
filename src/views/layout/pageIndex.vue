<template>
  <div class="page-container">
    <!-- 头部 -->
    <cmpHeader />
    <!-- 头部 -->

    <!-- 内容区域 -->
    <div class="content">
      <!-- 侧边导航栏 -->
      <div class="sideNavBar">
        <sideBar />
      </div>
      <!-- 侧边导航栏 -->

      <!-- 右边内容区域 -->
      <div class="rightContent">
        <router-view />
      </div>
      <!-- 右边内容区域 -->
    </div>
  </div>
</template>

<script>
import cmpHeader from './cmp/cmpHeader.vue'
import sideBar from './cmp/sideBar.vue'
export default {
  components: {
    cmpHeader,
    sideBar
  }
}
</script>
<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content {
    flex: 1;
    display: flex;
    .sideNavBar {
      flex: 2;
      background-color: #24262e;
    }
    .rightContent {
      flex: 12;
      height: 92vh;
      padding: 23px 23px 0;
      background-color: #f5f6fa;
      overflow: auto !important;
    }
  }
}
</style>
