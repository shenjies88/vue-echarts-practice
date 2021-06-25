<template>
  <div class="common-container" @dblclick="returnChina">
    <div class="common-chart" ref="mapRef"></div>
  </div>
</template>

<script>
import axios from "axios";
import {getProvinceMapInfo} from '@/utils/mapUtil'
import api from "@/api/api";

export default {
  name: "Map",
  data() {
    return {
      chartInstant: null,
      allData: null,
      mapData: {}
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
    returnChina() {
      const returnOption = {
        geo: {
          map: 'china'
        }
      }
      this.echartsInstant.setOption(returnOption)
    },
    async initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.mapRef, 'chalk')
      const chinaJson = await axios.get('http://localhost:8999/static/map/china.json')
      //注册地图
      this.$echarts.registerMap('china', chinaJson)
      const initOption = {
        title: {
          text: '| 商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.echartsInstant.setOption(initOption)
      this.echartsInstant.on('click', async arg => {
        const provinceInfo = getProvinceMapInfo(arg.name)
        if (!this.mapData[provinceInfo.key]) {
          const provinceData = await axios.get(`http://localhost:8999${provinceInfo.path}`)
          this.mapData[provinceInfo.key] = provinceData
          this.$echarts.registerMap(provinceInfo.key, provinceData)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.echartsInstant.setOption(changeOption)
      })
    },
    async getData() {
      this.allData = await api.map()
      this.updateChart()
    },
    updateChart() {
      const legendArr = this.allData.map(item => item.name)
      const series = this.allData.map(item => {
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series
      }
      this.echartsInstant.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize = this.$refs.mapRef.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
