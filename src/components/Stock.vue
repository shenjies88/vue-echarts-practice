<template>
  <div class="common-container">
    <div class="common-chart" ref="stockRef"></div>
  </div>
</template>

<script>

export default {
  name: "Stock",
  data() {
    return {
      allData: null,
      echartsInstant: null,
      currentIndex: 0,
      timerId: null
    }
  },
  created() {
    this.$socket.registerCallBack("stockData", this.getData)
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: "getData",
      socketType: "stockData",
      chartName: "stock",
      value: "",
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    this.$socket.unregisterCallBack("stockData")
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timerId)
  },
  methods: {
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.stockRef, 'chalk')
      const initOption = {
        title: {
          text: '｜ 库存和销量分析',
          left: 20,
          top: 20
        }
      }
      this.echartsInstant.setOption(initOption)
      this.echartsInstant.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.echartsInstant.on("mouseout", () => {
        this.startInterval();
      });
    },
    getData(data) {
      this.allData = data
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      const start = this.currentIndex * 5
      const end = (this.currentIndex + 1) * 5
      const showData = this.allData.slice(start, end);
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ]
      const colorArr = [
        ["#4ff778", "#0ba82c"],
        ["#e5dd45", "#e8b11c"],
        ["#e8821c", "#e55445"],
        ["#5052ee", "#ab6ee5"],
        ["#23e5e5", "#2e72bf"],
      ]
      const showDataArr = showData.map((item, index) => {
        return {
          type: 'pie',
          hoverAnimation: false,
          center: centerArr[index],
          labelLine: {
            show: false
          },
          label: {
            position: 'center',
            color: colorArr[index][0]
          },
          data: [
            {
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              }
            },
            {
              name: item.name + '\n' + item.sales,
              value: item.stock,
              itemStyle: {
                color: "#333843",
              }
            }
          ]
        }
      })
      const dataOption = {
        series: showDataArr
      }
      this.echartsInstant.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.stockRef.offsetWidth / 100) * 3.6
      const innerRadius = titleFontSize * 2.7
      const outerRadius = innerRadius * 1.125
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            label: {
              fontSize: (titleFontSize / 6) * 3,
            },
          },
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            label: {
              fontSize: (titleFontSize / 6) * 3,
            },
          },
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            label: {
              fontSize: (titleFontSize / 6) * 3,
            },
          },
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            label: {
              fontSize: (titleFontSize / 6) * 3,
            },
          },
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            label: {
              fontSize: (titleFontSize / 6) * 3,
            },
          },
        ]
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentIndex = ++this.currentIndex % 2
        this.updateChart()
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
