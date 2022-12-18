<template>
  <div class="nav-container">
    <div class="head">
      <el-avatar :src="$store.getters.img" :size="30" @error="errorHandler">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      <div class="name">
        欢迎<span>{{ $store.getters.userName }}</span>
      </div>
    </div>
    <!-- 导航区域 -->
    <div class="nav">
      <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        background-color="#24262E"
        text-color="#fff"
        unique-opened
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/article">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/article/type"
              ><i class="el-icon-s-operation"></i>文章分类</el-menu-item
            >
            <el-menu-item index="/article/list"
              ><i class="el-icon-notebook-2"></i>文章列表</el-menu-item
            >
            <el-menu-item index="/article/publish"
              ><i class="el-icon-reading"></i>发表文章</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1"
              ><i class="el-icon-document"></i>基本资料</el-menu-item
            >
            <el-menu-item index="3-2"
              ><i class="el-icon-camera"></i>更换图像</el-menu-item
            >
            <el-menu-item index="3-3"
              ><i class="el-icon-unlock"></i>重置密码</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    errorHandler () {
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.nav-container {
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 23px 0;
    background-color: #101219;
    .el-avatar {
      margin-right: 9px;
    }
    .name {
      font-size: 12px;
      color: #fff;
      span {
        margin-left: 3px;
      }
    }
  }
  .nav {
    .el-menu {
      border-right: 0;
    }
  }
}
</style>
