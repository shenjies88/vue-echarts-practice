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
      echartsInstant: null,
      startValue: 0,
      endValue: 9,
      updateZooInterval: null
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
    clearInterval(this.updateZooInterval)
  },
  methods: {
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.rankRef, 'chalk')
      const initOption = {
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
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
      this.echartsInstant.on("mouseover", () => {
        clearInterval(this.updateZooInterval)
      });
      this.echartsInstant.on("mouseout", () => {
        this.startInterval();
      })
    },
    async getData() {
      this.allData = await api.rank()
      this.allData.sort((a, b) => {
        return b.value - a.value
      })
      this.updateChart()
      this.startInterval()
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
        dataZoom: {
          startValue: this.startValue,
          endValue: this.endValue,
        },
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
      const titleFontSize = this.$refs.rankRef.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        barWidth: titleFontSize,
        itemStyle: {
          borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
        }
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    startInterval() {
      if (this.updateZooInterval) {
        clearInterval(this.updateZooInterval)
      }
      this.updateZooInterval = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
