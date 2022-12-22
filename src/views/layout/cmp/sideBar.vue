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
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#24262E"
        text-color="#fff"
        unique-opened
        router
      >
        <el-menu-item index="/home">
          <i :class="[menus.home.icon]"></i>
          <span slot="title">{{  menus.home.title }}</span>
        </el-menu-item>
        <el-submenu index="/art">
          <template slot="title">
            <i :class="[menus.arts.icon]"></i>
            <span>{{  menus.arts.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="obj.indexPath" v-for="(obj, index) in menus.arts.children" :key="index"><i :class="[obj.icon]"></i>{{  obj.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/user">
          <template slot="title">
            <i :class="[menus.user.icon]"></i>
            <span>{{ menus.user.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="obj.indexPath" v-for="(obj, index) in menus.user.children" :key="index"><i :class="[obj.icon]"></i>{{ obj.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getMenusData } from '@/api/menus'
export default {
  created () {
    this.getMenusData()
  },
  data () {
    return {
      menus: {
        home: {},
        arts: {},
        user: {}
      },
      myPath: '/home'
    }
  },
  methods: {
    errorHandler () {
      return true
    },
    // 获取菜单栏数据
    async getMenusData () {
      try {
        const { data } = await getMenusData()
        this.menus.home = data[0]
        this.menus.arts = data[1]
        this.menus.user = data[2]
      } catch (error) {
        console.log(error)
      }
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
