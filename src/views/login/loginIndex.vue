<template>
  <div class="login-container">
    <div class="login">
      <h3>后台管理系统</h3>
      <div class="register">
        <a href="javascript:;" @click="registerFn">去注册</a>
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
        <el-form-item>
          <el-button @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="logo">
      <h1><img src="@/assets/images/logo.png" alt="logo" /></h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: 'hexiang',
        password: '666666'
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
        ]
      }
    }
  },
  methods: {
    ...mapActions(['inLogin']),
    onSubmit () {
      this.$refs.form.validate(async (isOk) => {
        // 校验成功
        if (isOk) {
          try {
            await this.inLogin(this.form)
            this.$message({
              message: '登录成功!',
              type: 'success'
            })
            this.$router.push('/')
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    registerFn () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(@/assets/images/login_bg1.png) no-repeat center / 100% 100%;
  background-attachment: fixed;
  .login {
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
    .register {
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
        &:nth-child(3) {
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
