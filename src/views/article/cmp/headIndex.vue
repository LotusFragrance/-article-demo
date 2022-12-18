<template>
  <div class="header-container">
    <!-- 左边文字插槽 -->
    <slot>
      <h3>文章分类</h3>
    </slot>
    <!-- 右边按钮插槽 -->
    <slot name="button">
      <el-button type="primary" size="mini">添加分类</el-button>
    </slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 23px;
  border-bottom: 1px solid #e7e7e7;
  h3 {
    font-weight: 600;
    color: #131523;
    line-height: 17px;
    font-size: 12px;
  }
}
</style>
