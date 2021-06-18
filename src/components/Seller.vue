<template>
  <div class="common-container">
    <div class="common-chart" ref="sellerRef"></div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "Seller",
  data: function () {
    return {
      echartsInstant: null,
      allData: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.sellerRef)
    },
    async getData() {
      const res = await api.seller()
      this.allData = res
      this.updateChart()
    },
    updateChart() {
      const sellerName = this.allData.map(item => {
        return item.name
      })
      const sellerValue = this.allData.map(item => {
        return item.value
      })
      const option = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: sellerName
        },
        series: [{
          type: 'bar',
          data: sellerValue
        }]
      }
      this.echartsInstant.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
