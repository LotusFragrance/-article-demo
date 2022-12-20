<template>
  <div class="list-container">
    <!-- 头部 -->
    <headerIndex>
      <h3>文章列表</h3>
      <template #button>
        <div style="height: 28px"></div>
      </template>
    </headerIndex>
    <!-- 表格区域 -->
    <div class="table">
      <!-- 头部 -->
      <div class="head">
        <el-form :inline="true" :model="form" ref="form">
          <el-form-item label="文章分类">
            <el-select v-model="form.cate_id" placeholder="请选择分类">
              <el-option
                :label="obj.cate_name"
                :value="obj.id"
                v-for="obj in artTypes"
                :key="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select v-model="form.state" placeholder="请选择状态">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="$router.push('/article/publish')"
          >发表文章</el-button
        >
      </div>
      <!-- 表格 -->
      <div class="content" v-loading="loading">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="title" label="文章标题" width="400">
          </el-table-column>
          <el-table-column prop="cate_name" label="分类" width="215">
          </el-table-column>
          <el-table-column
            prop="pub_date"
            label="发表时间"
            width="200"
            :formatter="formatTime"
          >
          </el-table-column>
          <el-table-column prop="state" label="状态" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modifyFn(scope.row)"
                >修改</el-button
              >
              <el-button size="mini" type="danger" @click="deleteArt(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部区域 -->
      <div class="bottom">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page.sync="currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 删除文章弹窗 -->
    <deleteArts
      :dialogVisible.sync="dialogVisible"
      :typeData="artData"
      :judgeing="judgeing"
      @initArt="initArt"
    />
    <!-- 更新文章弹窗 -->
    <el-dialog
      title="修改文章"
      :visible.sync="dialogVisible1"
      width="70%"
    >
    <publishArts :updataArt="updataArt" @initArts="initArts"/>
    </el-dialog>
  </div>
</template>

<script>
import headerIndex from './cmp/headIndex.vue'
import deleteArts from './cmp/deleteType.vue'
import { getArtType, getArtList } from '@/api/article'
import publishArts from './publishArts.vue'
import dayjs from 'dayjs'
export default {
  components: {
    headerIndex,
    deleteArts,
    publishArts
  },
  data () {
    return {
      form: {
        cate_id: '',
        state: ''
      },
      page: 1, // 当前页码数
      pagesize: 2, // 当前页面需要的数据条数
      loading: false,
      artTypes: [], // 文章分类数据
      tableData: [], // 表格数据
      total: 0, // 文章列表总数
      currentPage: 1, // 当前页数
      dialogVisible: false, // 控制删除文章弹窗
      artData: {}, // 文章数据
      judgeing: '', // 判断是删除类名还是文章
      dialogVisible1: false, // 控制修改文章弹窗
      updataArt: ''
    }
  },
  created () {
    this.getArtType()
    this.getArtList(this.page)
  },
  methods: {
    // 筛选文章列表
    async onSubmit () {
      this.page = 1 // 设置获取第一页的数据（后面都是一样的）
      this.getArtList(this.page) // 获取所有文章列表
      this.currentPage = 1 // 当前页为1
    },
    // 重置表单
    resetForm () {
      // 对整个表单进行重置
      this.form = {
        cate_id: '',
        state: ''
      }
      this.page = 1
      this.getArtList(this.page) // 获取所有文章列表
      this.currentPage = 1 // 当前页为1
    },
    // 修改文章
    modifyFn (data) {
      this.dialogVisible1 = true
      this.updataArt = data
    },
    // 删除文章
    deleteArt (data) {
      this.dialogVisible = true
      this.artData = data
      this.judgeing = 'art'
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
    // 获取所有文章列表
    async getArtList (page) {
      try {
        this.loading = true // 开启loading
        const data = await getArtList({
          pagenum: page,
          pagesize: this.pagesize,
          cate_id: this.form.cate_id,
          state: this.form.state
        })
        this.tableData = data.data // 获取数据
        this.total = data.total
        this.loading = false // 关闭loading
      } catch (error) {
        console.log(error)
        this.loading = false // 关闭loading
      }
    },
    // 对时间格式化
    formatTime (row, column) {
      return dayjs(row.pub_date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 页码跳转
    async handleCurrentChange (val) {
      this.getArtList(val)
      this.page = val
    },
    // 选择每页显示多少条
    handleSizeChange (val) {
      this.pagesize = val
      this.page = 1
      this.getArtList(this.page)
      this.currentPage = 1 // 当前页为1
    },
    // 删除后更新文章列表
    initArt () {
      // 解决删除文章列表最后一页数据后出现空白数据的问题
      if (
        // (this.total - 1) % 2 === 0 判断是否是最后一条数据
        // Math.ceil(this.total / this.pagesize) 判断是否是最后一页
        (this.total - 1) % 2 === 0 &&
        Math.ceil(this.total / this.pagesize) === this.page
      ) {
        this.page -= 1 // 让页码减少一
      }
      this.getArtList(this.page) // 更新文章数据
    },
    // 修改文章后更新文章列表
    initArts () {
      this.dialogVisible1 = false // 关闭弹窗
      this.getArtList(this.page) // 更新数据
    }
  }
}
</script>

<style lang="less" scoped>
.list-container {
  background-color: #fff;
  .table {
    padding: 23px;
    .head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .el-form {
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
    .bottom {
      margin-top: 23px;
    }
  }
}
</style>
