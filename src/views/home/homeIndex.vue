<template>
  <div class="home-container">
    <!-- 头部 -->
    <homeHeader />
    <!-- 中间部分 -->
    <el-row :gutter="20" style="margin-bottom: 23px">
      <el-col :span="18">
        <!-- 折线图 -->
        <lineChart />
      </el-col>
      <el-col :span="6">
        <!-- 饼图 -->
        <pieChart />
      </el-col>
    </el-row>
    <!-- 底部 -->
    <barChart />
  </div>
</template>

<script>
import homeHeader from './cmp/homeHeader.vue'
import lineChart from './cmp/lineChart.vue'
import pieChart from './cmp/pieChart.vue'
import barChart from './cmp/barChart.vue'
export default {
  components: {
    homeHeader,
    lineChart,
    pieChart,
    barChart
  }
}
</script>

<style>

</style>
