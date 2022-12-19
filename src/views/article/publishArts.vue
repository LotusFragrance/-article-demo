<template>
  <div class="publish-container">
    <!-- 头部 -->
    <headerIndex v-if="!updataArt">
      <h3>发表文章</h3>
      <template #button>
        <div style="height: 28px"></div>
      </template>
    </headerIndex>
    <!-- 文章内容 -->
    <div class="content">
      <!-- 文章标题、类别 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select
            v-model="form.cate_id"
            placeholder="请选择文章分类"
            style="width: 100%"
          >
            <el-option
              :label="obj.cate_name"
              :value="obj.id"
              v-for="obj in artTypes"
              :key="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 文本内容 -->
      <div class="write">
        <div class="label">文章内容</div>
        <div class="quill" style="height: 200px">
          <quill-editor ref="myQuillEditor" v-model="content" />
        </div>
      </div>
      <!-- 选择文章封面 -->
      <div class="change">
        <div class="label">文章封面</div>
        <div class="right">
          <div class="click" @click="selectFile">选择封面</div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref="selectFile"
            @change="checkFile($event)"
          />
          <div class="img">
            <span v-if="!imgUrl">点击上方”选择封面”</span>
            <img :src="imgUrl" alt="" v-if="imgUrl" />
          </div>
          <el-button type="primary" @click="publicFn">{{ updataArt ? '发布修改' : '发布' }}</el-button>
          <el-button type="primary" plain @click="draft">{{ updataArt ? '草稿修改' : '存为草稿' }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import headerIndex from './cmp/headIndex.vue'
import { quillEditor } from 'vue-quill-editor'
import { getArtType, publishArts, getArtData, updataArts } from '@/api/article'
export default {
  props: {
    updataArt: {
      type: Object,
      default () {
        return null
      }
    }
  },
  components: {
    headerIndex,
    quillEditor
  },
  data () {
    return {
      form: {
        title: '', // 标题
        cate_id: '' // 分类id
      },
      content: '', // 文章内容
      imgUrl: '', // 文章封面
      artTypes: [], // 文章分类数据
      file: '' // 图片信息
    }
  },
  created () {
    this.getArtType()
    this.getArtData()
  },
  methods: {
    selectFile () {
      this.$refs.selectFile.click() // 点击添加图片
    },
    checkFile (e) {
      const windowURL = window.URL || window.webkitURL
      const dataURL = windowURL.createObjectURL(e.target.files[0]) // 获取图片地址
      this.imgUrl = dataURL
      this.file = e.target.files[0] // 获取图片信息
    },
    // 获取所有文章类别
    async getArtType () {
      try {
        const data = await getArtType()
        this.artTypes = data.data
      } catch (error) {
        console.log(error)
      }
    },
    common (state) {
      // 提交的请求体，必须是 FormData 格式！
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('cate_id', this.form.cate_id)
      formData.append('content', this.content)
      formData.append('state', state)
      formData.append('cover_img', this.file)
      if (this.updataArt) {
        formData.append('id', this.updataArt.id)
      }
      return formData
    },
    // 发布文章
    async publicFn () {
      try {
        const formData = this.common('已发布')
        // 判断是添加文章还是更新文章（下同）
        if (this.updataArt) {
          await updataArts(formData)
          this.$message({
            message: '修改文章成功',
            type: 'success'
          })
          this.$emit('initArts')
        } else {
          await publishArts(formData)
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/article/list') // 添转到文章列表
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 发布草稿
    async draft () {
      try {
        const formData = this.common('草稿')
        if (this.updataArt) {
          await updataArts(formData)
          this.$message({
            message: '修改文章成功',
            type: 'success'
          })
          this.$emit('initArts')
        } else {
          await publishArts(formData)
          this.$message({
            message: '发布草稿成功',
            type: 'success'
          })
          this.$router.push('/article/list') // 添转到文章列表
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取文章详情
    async getArtData () {
      try {
        if (this.updataArt) {
          const { data } = await getArtData({
            id: this.updataArt.id
          })
          this.form.title = data.title
          this.form.cate_id = data.cate_id
          this.content = data.content
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-container {
  background-color: #fff;
  .content {
    padding: 23px;
    /deep/ .write {
      display: flex;
      height: 400px;
      margin-bottom: 16px;
      .label {
        display: flex;
        justify-content: end;
        width: 80px;
        padding-right: 12px;
        color: #606266;
        font-size: 14px;
      }
      .ql-container {
        height: 334px;
      }
    }
    .change {
      display: flex;
      .label {
        display: flex;
        justify-content: end;
        width: 80px;
        padding-right: 12px;
        color: #606266;
        font-size: 14px;
      }
      .right {
        .click {
          width: 66px;
          height: 24px;
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2px;
          border: 1px solid #dcdcdc;
          text-align: center;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
        }
        .img {
          margin-bottom: 12px;
          width: 372px;
          height: 189px;
          background-color: #f5f6fa;
          border-radius: 0px 0px 2px 2px;
          border: 1px solid #999;
          line-height: 189px;
          text-align: center;
          img {
            height: 189px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
