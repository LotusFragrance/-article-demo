<template>
  <el-dialog :visible="dialogVisible" width="308px" :before-close="handleClose">
    <div class="title" slot="title">
      <i class="el-icon-warning-outline"></i>提示
    </div>
    <span>确定要删除本条信息吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取消</el-button>
      <el-button type="primary" @click="deleteFn">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deleteType, deleteArts } from '@/api/article'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    typeData: {
      type: Object,
      require: true
    },
    judgeing: {
      type: String,
      require: true
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭?').then(() => {
        this.$emit('update:dialogVisible', false)
      })
    },
    // 删除类别
    async deleteFn () {
      try {
        if (this.judgeing === 'type') {
          await deleteType({
            id: this.typeData.id
          })
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$emit('update:dialogVisible', false)
          this.$emit('initType')
        } else if (this.judgeing === 'art') {
          await deleteArts({
            id: this.typeData.id
          })
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$emit('update:dialogVisible', false)
          this.$emit('initArt')
        }
      } catch (error) {
        console.log(error)
      }
    }
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
