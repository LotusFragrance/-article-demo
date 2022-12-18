<template>
  <div class="type-container">
    <!-- 头部 -->
    <cmpHeader>
      <h3>文章分类</h3>
      <template #button>
        <el-button type="primary" size="mini" @click="addArtTypeFn"
          >添加分类</el-button
        >
      </template>
    </cmpHeader>
    <!-- 表格 -->
    <div class="table" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="200" type="index">
        </el-table-column>
        <el-table-column prop="cate_name" label="项目名称" width="415">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名" width="400">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="modifyFn(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteType(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加何修改类别弹窗 -->
    <addType :dialogVisible.sync="dialogVisible" @initType="getArtTypeFn()" :judge="judge" :typeData="typeData" />
    <!-- 删除类别弹窗 -->
    <deleteTypes
      :dialogVisible.sync="dialogVisible1"
      :typeData="typeData"
      :judgeing="judgeing"
      @initType="getArtTypeFn()"
    />
  </div>
</template>

<script>
import { getArtType } from '@/api/article'
import cmpHeader from './cmp/headIndex.vue'
import addType from './cmp/addType.vue'
import deleteTypes from './cmp/deleteType.vue'
export default {
  components: {
    cmpHeader,
    addType,
    deleteTypes
  },
  data () {
    return {
      tableData: [], // 表格数据
      dialogVisible: false, // 控制添加类别弹窗
      dialogVisible1: false, // 控制删除类别弹窗
      typeData: {}, // 类别信息
      judge: '', // 判断是添加类别还是更新类别
      loading: false,
      judgeing: '' // 判断是删除类名还是文章
    }
  },
  created () {
    this.getArtTypeFn() // 获取文章类别
  },
  methods: {
    async getArtTypeFn () {
      try {
        this.loading = true // 开启loading
        const data = await getArtType()
        this.tableData = data.data
        this.loading = false // 关闭loading
      } catch (error) {
        console.log(error)
        this.loading = false // 关闭loading
      }
    },
    // 添加分类
    addArtTypeFn () {
      this.dialogVisible = true
      this.judge = 'add'
      this.typeData = {}
    },
    // 删除文章分类
    async deleteType (data) {
      this.dialogVisible1 = true
      this.typeData = data
      this.judgeing = 'type'
    },
    // 修改文章分类
    modifyFn (data) {
      this.dialogVisible = true
      this.judge = 'modify'
      this.typeData = data
    }
  }
}
</script>

<style lang="less" scoped>
.type-container {
  background-color: #fff;
  .table {
    padding: 23px;
  }
}
</style>
