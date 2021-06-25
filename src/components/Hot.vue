<template>
  <div class="common-container">
    <div class="common-chart" ref="hotRef"></div>
    <span class="iconfont left-arrow" :style="arrowStyle" @click="toLeft">&#xe6eb</span>
    <span class="iconfont right-arrow" :style="arrowStyle" @click="toRight">&#xe6ee</span>
    <span class="title" :style="titleStyle">{{ titleName }}</span>
  </div>
</template>

<script>

export default {
  name: "Hot",
  data() {
    return {
      allData: null,
      echartsInstant: null,
      currentIndex: 0,
      arrowStyle: {
        fontSize: '20px'
      },
      titleStyle: {
        fontSize: '10px'
      }
    }
  },
  created() {
    this.$socket.registerCallBack("hotData", this.getData)
  },
  computed: {
    titleName() {
      if (!this.allData) {
        return ''
      }
      return this.allData[this.currentIndex].name
    }
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: "getData",
      socketType: "hotData",
      chartName: "hot",
      value: "",
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    this.$socket.unregisterCallBack("hotData")
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.hotRef, 'chalk')
      const initOption = {
        title: {
          text: '| 热销商品销售金额占比统计',
          top: 20,
          left: 20
        },
        legend: {
          top: '15%',
          icon: 'circle'
        },
        tooltip: {
          show: true,
          formatter: ({data}) => {
            let resStr = "";
            const allValue = data.children.reduce((preV, curItem) => {
              return preV + curItem.value;
            }, 0);
            data.children.forEach((item) => {
              let percent = (item.value / allValue) * 100;
              resStr += `${item.name}&nbsp;&nbsp;${percent.toFixed(0)}% <br/>`;
            });
            return resStr;
          }
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '60%']
          }
        ]
      }
      this.echartsInstant.setOption(initOption)
    },
    getData(data) {
      this.allData = data
      this.updateChart()
    },
    updateChart() {
      const legendData = this.allData[this.currentIndex].children.map(item => item.name)
      const seriesArr = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
        }
      })
      const dataOption = {
        legend: {
          data: legendData
        },
        series: [
          {
            data: seriesArr,
            label: {
              show: false,
              color: arg => {
              }
            },
            emphasis: {
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.echartsInstant.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize = this.$refs.hotRef.offsetWidth / 100 * 3.6
      this.arrowStyle.fontSize = titleFontSize + 'px'
      this.titleStyle.fontSize = titleFontSize + 'px'
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize,
          itemHeight: titleFontSize,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize - 10,
          },
        },
        series: [{
          radius: titleFontSize * 4.5,
        }]
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    toLeft() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateChart()
    },
    toRight() {
      this.currentIndex = ++this.currentIndex % this.allData.length
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>
.left-arrow {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50);
  color: white;
  cursor: pointer;
}

.right-arrow {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50);
  color: white;
  cursor: pointer;
}

.title {
  position: absolute;
  right: 20%;
  bottom: 5%;
  color: white;
}
</style>
