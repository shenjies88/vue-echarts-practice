<template>
  <div class="common-container">
    <div class="title" :style="comStyle">
      <span>{{ '| ' + showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showChoice = !showChoice">&#xe6eb;</span>
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="handSelect(item.key)">
          {{ item.text }}
        </div>
      </div>
    </div>
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
      allData: null,
      showChoice: false,
      choiceType: 'map',
      titleFontSize: 0
    }
  },
  computed: {
    selectTypes() {
      if (!this.allData) {
        return []
      }
      return this.allData.type.filter(item => {
        return item.key !== this.choiceType
      })
    },
    showTitle() {
      if (!this.allData) {
        return ''
      }
      return this.allData[this.choiceType].title
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    },
    marginStyle() {
      return {
        marginLeft: this.titleFontSize / 2 + 'px'
      }
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
    handSelect(key) {
      this.choiceType = key
      this.updateChart()
      this.showChoice = false
    },
    initChart() {
      this.echartsInstant = this.$echarts.init(this.$refs.trendRef, 'chalk')
      const initOption = {
        grid: {
          top: '35%',
          left: '4%',
          right: '3%',
          bottom: '1%',
          containLabel: true
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
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
      this.titleFontSize = this.$refs.trendRef.offsetWidth / 100 * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.echartsInstant.setOption(adapterOption)
      this.echartsInstant.resize()
    },
    updateChart() {
      const colorArr1 = [
        "rgba(11,168,44,.5)",
        "rgba(44,110,255,.5)",
        "rgba(22,242,217,.5)",
        "rgba(254,33,30,.5)",
        "rgba(250,105,0,.5)",
      ]; // 半透明颜色数组
      const colorArr2 = [
        "rgba(11,168,44,0)",
        "rgba(44,110,255,0)",
        "rgba(22,242,217,0)",
        "rgba(254,33,30,0)",
        "rgba(250,105,0,0)",
      ]; // 透明颜色数组
      //类目轴数据
      const timeArr = this.allData.common.month
      //y轴数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              },
              {
                offset: 1,
                color: colorArr2[index],
              },
            ])
          }
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
.title {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  color: white;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .select-con {
    background-color: #222733;
  }
}
</style>
