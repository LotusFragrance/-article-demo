<template>
  <div class="reset-password-container">
    <!-- 头部 -->
    <headerIndex>
      <h3>基本资料</h3>
      <template #button>
        <div style="height: 28px"></div>
      </template>
    </headerIndex>
    <!-- 内容区域 -->
    <div class="content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="width: 40%"
      >
        <el-form-item label="原密码" required prop="old_pwd">
          <el-input v-model="form.old_pwd" placeholder="请输入原密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" required prop="new_pwd">
          <el-input v-model="form.new_pwd" placeholder="请输入新密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" required prop="re_pwd">
          <el-input v-model="form.re_pwd" placeholder="请确认新密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">修改密码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headerIndex from '../article/cmp/headIndex.vue'
import { updataUserPsd } from '@/api/user'
export default {
  components: {
    headerIndex
  },
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.form.new_pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          try {
            await updataUserPsd({
              old_pwd: this.form.old_pwd,
              new_pwd: this.form.new_pwd,
              re_pwd: this.form.re_pwd
            })
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.resetForm()
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.reset-password-container {
  background-color: #fff;
  .content {
    padding: 23px;
  }
}
</style>
