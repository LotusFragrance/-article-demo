<template>
  <div class="line-chart" ref="line"></div>
</template>

<script>
export default {
  methods: {
    draw () {
      // 获取容器
      const myChart = this.$echarts.init(this.$refs.line)
      // 数据
      const aList_all = [
        { count: 36, date: '2022-04-13' },
        { count: 52, date: '2022-04-14' },
        { count: 78, date: '2022-04-15' },
        { count: 85, date: '2022-04-16' },
        { count: 65, date: '2022-04-17' },
        { count: 72, date: '2022-04-18' },
        { count: 88, date: '2022-04-19' },
        { count: 64, date: '2022-04-20' },
        { count: 72, date: '2022-04-21' },
        { count: 90, date: '2022-04-22' },
        { count: 96, date: '2022-04-23' },
        { count: 100, date: '2022-04-24' },
        { count: 102, date: '2022-04-25' },
        { count: 110, date: '2022-04-26' },
        { count: 123, date: '2022-04-27' },
        { count: 100, date: '2022-04-28' },
        { count: 132, date: '2022-04-29' },
        { count: 146, date: '2022-04-30' },
        { count: 200, date: '2022-05-01' },
        { count: 180, date: '2022-05-02' },
        { count: 163, date: '2022-05-03' },
        { count: 110, date: '2022-05-04' },
        { count: 80, date: '2022-05-05' },
        { count: 82, date: '2022-05-06' },
        { count: 70, date: '2022-05-07' },
        { count: 65, date: '2022-05-08' },
        { count: 54, date: '2022-05-09' },
        { count: 40, date: '2022-05-10' },
        { count: 45, date: '2022-05-11' },
        { count: 38, date: '2022-05-12' }
      ]
      const aCount = []
      const aDate = []
      for (let i = 0; i < aList_all.length; i++) {
        aCount.push(aList_all[i].count)
        aDate.push(aList_all[i].date)
      }

      // 配置项
      const option = {
        title: {
          text: '月新增文章数',
          left: '20',
          top: '0'
        },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['新增文章'],
        //   top: '40'
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          right: '40'
        },
        calculable: true,
        xAxis: [
          {
            // name: '日',
            type: 'category',
            boundaryGap: false,
            data: aDate
          }
        ],
        yAxis: [
          {
            // name: '月新增文章数',
            type: 'value'
          }
        ],
        series: [
          {
            name: '新增文章',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: { areaStyle: { type: '#E1EDF9' }, color: '#7DBFFF' },
              lineStyle: { color: '#86B8E6' }
            },
            data: aCount
          }
        ],
        areaStyle: {
          normal: {
            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255,136,0,0.39)'
              },
              {
                offset: 0.34,
                color: 'rgba(255,180,0,0.25)'
              },
              {
                offset: 1,
                color: 'rgba(255,222,0,0.00)'
              }
            ])
          }
        },
        grid: {
          show: true,
          x: 50,
          x2: 50,
          y: 80,
          height: 220
        }
      }
      // 绘制图标
      myChart.setOption(option)
    }
  },
  mounted () {
    this.draw()
  }
}
</script>

<style lang="less" scoped>
.line-chart {
  padding-top: 20px;
  height: 370px;
  background-color: #fff;
}
</style>
