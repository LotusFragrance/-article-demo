<template>
  <div class="pie-chart" ref="pie"></div>
</template>

<script>
export default {
  methods: {
    draw () {
      // 获取容器
      const myChart = this.$echarts.init(this.$refs.pie)
      // 配置项
      const option = {
        title: {
          top: 10,
          text: '分类文章数量比',
          x: '20'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#68DEB3', '#5482FA', '#586EE6', '#7DBFFF'],
        legend: {
          x: 'center',
          top: 70,
          data: ['奇趣事', '会生活', '爱旅行', '趣美味']
        },
        toolbox: {
          show: true,
          x: 'center',
          top: 35,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '65%'],
            data: [
              { value: 300, name: '奇趣事' },
              { value: 100, name: '会生活' },
              { value: 260, name: '爱旅行' },
              { value: 180, name: '趣美味' }
            ],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            }
          }
        ]
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
.pie-chart {
    padding-top: 10px;
    height: 370px;
    background-color: #fff;
}
</style>
