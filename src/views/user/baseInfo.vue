<template>
  <div class="base-info-container">
    <!-- 头部 -->
    <headerIndex>
      <h3>基本资料</h3>
      <template #button>
        <div style="height: 28px"></div>
      </template>
    </headerIndex>
    <!-- 内容区域 -->
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width: 40%">
        <el-form-item label="登录名称" >
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" required prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" required prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headerIndex from '../article/cmp/headIndex.vue'
import { updataUserinfo } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  components: {
    headerIndex
  },
  data () {
    // 邮箱验证规则
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      form: {
        username: this.$store.getters.username,
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改
    submitForm () {
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          try {
            await updataUserinfo({
              id: this.$store.getters.userId,
              nickname: this.form.nickname,
              email: this.form.email
            })
            await this.getUserinfo()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    // 重置表单
    resetForm () {
      this.$refs.form.resetFields()
    },
    ...mapActions(['getUserinfo'])
  }
}
</script>

<style lang="less" scoped>
.base-info-container {
  background-color: #fff;
  .content {
    padding: 23px;
  }
}
</style>
