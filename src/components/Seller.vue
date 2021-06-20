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
      allData: null,
      currPage: 1,
      totalPage: 0,
      interval: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    clearInterval(this.interval)
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    //屏幕适配
    screenAdapter() {
      const width = this.$refs.sellerRef.offsetWidth
      const titleFontSize = width / 100 * 3.6
      const adapterOption = {
        //标题
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [{
          barWidth: titleFontSize,
          itemStyle: {
            barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
          }
        }]
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.sellerRef, 'chalk')
      //初始化配置
      const initOption = {
        //标题
        title: {
          text: '｜ 商家销售统计',
          left: 20,
          top: 20
        },
        //坐标轴
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443',
              type: 'solid'
            }
          }
        },
        series: [{
          type: 'bar',
          label: {
            //显示文字
            show: true,
            //显示位子
            position: 'right',
            textStyle: {
              color: 'white'
            }
          },
          itemStyle: {
            //颜色渐变
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#5052EE'
              },
              {
                offset: 1,
                color: '#AB6EE5'
              }
            ])
          }
        }]

      }
      this.echartsInstant.setOption(initOption)
      // 监听鼠标移入移出事件
      this.echartsInstant.on("mouseover", () => {
        clearInterval(this.interval);
      });
      this.echartsInstant.on("mouseout", () => {
        this.startTimer();
      });
    },
    async getData() {
      this.allData = await api.seller()
      this.allData.sort((a, b) => {
        return a.value - b.value
      })
      const dataLength = this.allData.length
      this.totalPage = dataLength % 5 === 0 ? dataLength / 5 : dataLength / 5 + 1
      this.updateChart()
      this.startTimer()
    },
    updateChart() {
      const start = (this.currPage - 1) * 5
      const end = this.currPage * 5
      const showData = this.allData.slice(start, end)
      const sellerName = showData.map(item => {
        return item.name
      })
      const sellerValue = showData.map(item => {
        return item.value
      })
      const dataOption = {
        yAxis: {
          data: sellerName
        },
        series: [{
          data: sellerValue
        }]
      }
      this.echartsInstant.setOption(dataOption)
    },
    startTimer() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        this.currPage = (++this.currPage % this.totalPage) + 1
        this.updateChart()
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
