<template>
  <div class="change-img-container">
    <!-- 头部 -->
    <headerIndex>
      <h3>基本资料</h3>
      <template #button>
        <div style="height: 28px"></div>
      </template>
    </headerIndex>
    <div class="content">
      <div class="img">
        <span v-if="!imgUrl">请选择图像</span>
        <el-avatar shape="square" :size="170" fit="cover" :src="imgUrl" v-if="imgUrl"></el-avatar>
      </div>
      <input type="file" hidden ref="refIpt" @change="checkFile" accept="image/*"/>
      <el-button size="small" @click="selectFile" type="primary"><i class="el-icon-plus"></i>选择图像</el-button>
      <el-button size="small" @click="uploadFile" plain type="primary"><i class="el-icon-upload2"></i>上传图片</el-button>
    </div>
  </div>
</template>

<script>
import headerIndex from '../article/cmp/headIndex.vue'
import { updataUserAvatar } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  components: {
    headerIndex
  },
  data () {
    return {
      imgUrl: '', //
      Avatar: '' // 存储转好的base64进制
    }
  },
  methods: {
    // 点击button触发input点击事件
    selectFile () {
      this.$refs.refIpt.click()
    },
    // input内容改变事件
    // e拿到事件对象
    checkFile (e) {
      // e.target.files是个伪数组/可以通过长度判断用户是否选择了图片
      if (e.target.files.length === 0) {
        // 点击了取消了,就恢复默认图片
        return false
      } else {
        const windowURL = window.URL || window.webkitURL
        const dataURL = windowURL.createObjectURL(e.target.files[0]) // 获取图片地址
        this.imgUrl = dataURL // 给声明变量赋值
        // FileReader 浏览器提供的方法
        const reader = new FileReader()
        // reader里面有个方法readAsDataURL 可以将图片转base64进制
        reader.readAsDataURL(e.target.files[0])
        // onload可以监听转换完成后
        reader.onload = () => {
        // 给声明变量赋值
          this.Avatar = reader.result
        }
      }
    },
    // 上传图像
    async uploadFile () {
      try {
        await updataUserAvatar({ avatar: this.Avatar })
        await this.getUserinfo() // 更新用户信息
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    },
    ...mapActions(['getUserinfo'])
  }
}
</script>

<style lang="less" scoped>
.change-img-container {
  background-color: #fff;
  .content {
    padding: 23px;
    .img {
      margin-bottom: 15px;
      padding: 5px;
      width: 180px;
      height: 180px;
      background: #f5f6fa;
      line-height: 170px;
      text-align: center;
      span {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 17px;
      }
    }
  }
}
</style>
