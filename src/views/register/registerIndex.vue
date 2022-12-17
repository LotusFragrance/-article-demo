<template>
  <div class="register-container">
    <div class="register">
      <h3>后台管理系统</h3>
      <div class="login">
        <a href="javascript:;" @click="loginFn">去登录</a>
      </div>
      <el-form ref="form" :model="form" class="form" :rules="rules">
        <el-form-item label="用户名" required prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="repassword">
          <el-input
            v-model="form.repassword"
            placeholder="请再次输入密码"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="logo">
      <h1><img src="@/assets/images/logo.png" alt="" /></h1>
    </div>
  </div>
</template>

<script>
import { inRegister } from '@/api/register'
export default {
  data () {
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: checkPass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (isOk) => {
        // 校验成功
        if (isOk) {
          try {
            const data = await inRegister(this.form)
            this.$message({
              message: data.message,
              type: 'success'
            })
            this.$router.push('/login')
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    loginFn () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(@/assets/images/login_bg1.png) no-repeat center / 100% 100%;
  background-attachment: fixed;
  .register {
    padding: 36px 45px;
    width: 405px;
    box-shadow: 0px 0px 28px 0px rgba(21, 43, 99, 0.08);
    border-radius: 6px;
    h3 {
      font-size: 24px;
      color: #131523;
      line-height: 33px;
      text-align: center;
    }
    .login {
      text-align: center;
      a {
        font-size: 12px;
        color: #1e5eff;
        line-height: 18px;
        &:hover {
          color: #4f81ff;
        }
      }
    }
    /deep/ .form {
      margin-top: 30px;
      .el-form-item {
        margin-bottom: 18px;
        &:nth-child(4) {
          margin-bottom: 0;
        }
        .el-form-item__label {
          font-size: 11px;
          line-height: 15px;
        }
        .el-form-item__content {
          .el-input__inner {
            height: 36px;
            &::placeholder {
              font-size: 12px;
            }
          }
          .el-button {
            padding: 0;
            height: 36px;
            width: 100%;
            color: #fff;
            background-color: #4f81ff;
            :hover {
              background-color: #608dff;
            }
          }
        }
      }
    }
  }
  .logo {
    position: absolute;
    top: 17px;
    left: 28px;
  }
}
</style>
