<template>
  <el-dialog :visible="dialogVisible" width="308px" :before-close="handleClose">
    <div class="title" slot="title">
      <i class="el-icon-warning-outline"></i>提示
    </div>
    <span>确定要退出登录吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取消</el-button>
      <el-button type="primary" @click="outFn">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭?').then(() => {
        this.$emit('update:dialogVisible', false)
      })
    },
    // 退出登录
    outFn () {
      this.removeToken()
      this.removeUserInfo()
      this.$router.push('/login')
    },
    ...mapMutations(['removeToken']),
    ...mapMutations(['removeUserInfo'])
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  .el-dialog__header {
    padding: 21px 18px 0 24px;
    .title {
      font-size: 14px;
      i {
        margin-right: 6px;
        color: #4f81ff;
      }
    }
  }
  .el-dialog__body {
    padding: 12px 0 18px 48px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 17px;
  }
  .el-dialog__footer {
    padding: 0 24px 24px 0;
    button {
      padding: 5px 10px;
    }
  }
}
</style>
