<template>
  <div class="common-container">
    <div class="common-chart" ref="rankRef"></div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "Rank",
  data() {
    return {
      allData: null,
      echartsInstant: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.rankRef, 'chalk')
      const initOption = {
        title: {
          text: '| 销售排行',
          top: 20,
          left: 20
        },
        grid: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {},
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [{
          type: "bar",
        }]
      }
      this.echartsInstant.setOption(initOption)
    },
    async getData() {
      this.allData = await api.rank()
      this.allData.sort((a, b) => {
        return b.value - a.value
      })
      this.updateChart()
    },
    updateChart() {
      const nameArr = this.allData.map(item => {
        return item.name
      })
      const valueArr = this.allData.map(item => {
        return item.value
      })
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
      ]
      const dataOption = {
        xAxis: {
          data: nameArr
        },
        series: [{
          data: valueArr,
          itemStyle: {
            color: arg => {
              let targetColor
              if (arg.data >= 300) {
                targetColor = colorArr[0]
              } else if (arg.data >= 200) {
                targetColor = colorArr[1]
              } else {
                targetColor = colorArr[2]
              }
              return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: targetColor[0]
                },
                {
                  offset: 1,
                  color: targetColor[1]
                }
              ])
            }
          }
        }]
      }
      this.echartsInstant.setOption(dataOption)
    },
    screenAdapter() {
      const adapterOption = {}
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
