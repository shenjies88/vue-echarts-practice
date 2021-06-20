<template>
  <div class="common-container">
    <div class="common-chart" ref="trendRef"></div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "Trend",
  data() {
    return {
      chartInstant: null,
      allData: null
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
      this.echartsInstant = this.$echarts.init(this.$refs.trendRef)
      const initOption = {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        }
      }
      this.echartsInstant.setOption(initOption)
    },
    async getData() {
      this.allData = await api.trend()
      this.updateChart()
    },
    screenAdapter() {
      const adapterOption = {}
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    updateChart() {
      //类目轴数据
      const timeArr = this.allData.common.month
      //y轴数据
      const valueArr = this.allData.map.data
      const seriesArr = valueArr.map(item => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: 'map'
        }
      })
      //图例数据
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.echartsInstant.setOption(dataOption)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
