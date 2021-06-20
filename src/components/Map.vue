<template>
  <div class="common-container">
    <div class="common-chart" ref="mapRef"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Map",
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
    async initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.mapRef)
      const chinaJson = await axios.get('http://localhost:8999/static/map/china.json')
      //注册地图
      this.$echarts.registerMap('china', chinaJson)
      const initOption = {
        geo: {
          type: 'map',
          map: 'china'
        }
      }
      this.echartsInstant.setOption(initOption)
    },
    async getData() {
      this.updateChart()
    },
    updateChart() {
      const dataOption = {}
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
