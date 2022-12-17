<template>
  <div class="noFound-container">
    <div class="nofound">
      <p>404</p>
      <div class="back" @click="backFn">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backFn () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.noFound-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .nofound {
    p {
      font-size: 200px;
    }
    .back {
      margin: 0 auto;
      width: 100px;
      height: 50px;
      border-radius: 25px;
      border: 1px solid #000;
      text-align: center;
      line-height: 50px;
      background-color: #333;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
