<template>
  <div class="header-container">
    <el-row type="flex" justify="space-between" align="middle" class="header">
      <img src="@/assets/images/logo1.png" alt="" />
      <el-row class="right" type="flex" align="middle">
        <el-avatar
          :src="$store.getters.img"
          fit="cover"
          class="img"
        ></el-avatar>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a"><i class="el-icon-document"></i>基本资料</el-dropdown-item>
            <el-dropdown-item command="b"><i class="el-icon-camera"></i>更换图像</el-dropdown-item>
            <el-dropdown-item command="c"><i class="el-icon-unlock"></i>重置密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div @click="loginOut">
          <span class="iconfont icon-tuichu"></span>
          <span class="loginOut">退出</span>
        </div>
      </el-row>
    </el-row>
    <!-- 放置弹窗 -->
    <loginOut :dialogVisible.sync="dialogVisible" />
  </div>
</template>

<script>
import loginOut from './loginOut.vue'
export default {
  components: {
    loginOut
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    loginOut () {
      this.dialogVisible = true
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$router.push('/user/info')
      } else if (command === 'b') {
        this.$router.push('/user/changeimg')
      } else {
        this.$router.push('/user/resetpassword')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 19px;
  background-color: #24262e;
  .header {
    height: 51px;
    .right {
      .img {
        margin-right: 9px;
        width: 27px;
        height: 27px;
      }
      .iconfont,
      .loginOut {
        color: #fff;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
      }
      .iconfont {
        margin-left: 15px;
        margin-right: 3px;
      }
      .el-dropdown {
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
.el-dropdown-menu {
  background-color: #24262e;
  .el-dropdown-menu__item {
    color: #fff;
    font-size: 12px;
    &:hover {
      background-color: #999;
    }
  }
}
</style>
