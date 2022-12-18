<template>
  <el-dialog :visible="dialogVisible" width="400px" :before-close="handleClose">
    <div class="title" slot="title">
      <i class="el-icon-warning-outline"></i
      >{{ judge === "add" ? "添加分类" : "修改文章分类" }}
    </div>
    <el-form ref="form" :model="form" label-width="72px">
      <el-form-item label="分类名称">
        <el-input v-model="form.cate_name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名">
        <el-input v-model="form.cate_alias" placeholder="请输入别名"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取消</el-button>
      <el-button type="primary" @click="confirmFn">
        {{ judge === "add" ? "添加" : "确认修改" }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addType, updateType } from '@/api/article'
export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    judge: {
      type: String,
      require: true
    },
    typeData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      form: {
        cate_name: '',
        cate_alias: ''
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭?').then(() => {
        this.$emit('update:dialogVisible', false)
      })
    },
    async confirmFn () {
      // 判断是添加分类还是修改分类
      try {
        if (this.judge === 'add') {
          await addType(this.form)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else if (this.judge === 'modify') {
          await updateType({
            id: this.typeData.id,
            cate_name: this.form.cate_name,
            cate_alias: this.form.cate_alias
          })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.$emit('update:dialogVisible', false)
        this.$emit('initType')
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    // 监听数据的变化
    typeData (newVal, oldVal) {
      this.form.cate_name = newVal.cate_name
      this.form.cate_alias = newVal.cate_alias
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
    .el-input {
      width: 280px;
    }
  }
  .el-dialog__footer {
    padding: 0 24px 24px 0;
    button {
      padding: 5px 10px;
    }
  }
}
</style>
