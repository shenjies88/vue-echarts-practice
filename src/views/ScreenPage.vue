<template>
  <div class="container">
    <!--头部区域-->
    <div class="head">
      <!--      左图标-->
      <div class="head-left">
        <img src="../../public/static/img/logo_dark.png" alt="">
      </div>
      <!--      中图标-->
      <div class="head-mid">
        <span>电商平台实时监控系统</span>
      </div>
      <!--      右图标-->
      <div class="head-right">
        <img src="../../public/static/img/qiehuan_dark.png" alt="">
        <span>{{ dateTime | timestampToTime }}</span>
      </div>
    </div>
    <!--图标区域-->
    <div class="body">
      <!--左侧-->
      <div class="body-left">
        <div :class="['char-con', 'body-left-top', this.fullScreenStatus.trend ? 'fullscreen' : '']">
          <Trend ref="trend"></Trend>
          <span @click="changeSize('trend')"
                :class="['iconfont', this.fullScreenStatus.trend ?  'icon-compress-alt' : 'icon-expand-alt']"></span>
        </div>
        <div class="char-con body-left-bottom">
          <Seller></Seller>
        </div>
      </div>
      <!--中间-->
      <div class="body-mid">
        <div class="char-con body-mid-top">
          <Map></Map>
        </div>
        <div class="char-con body-mid-bottom">
          <Rank></Rank>
        </div>
      </div>
      <!--右边-->
      <div class="body-right">
        <div class="char-con body-right-top">
          <Hot></Hot>
        </div>
        <div class="char-con body-right-bottom">
          <Stock></Stock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trend from "@/components/Trend";
import Seller from "@/components/Seller";
import Map from "@/components/Map";
import Rank from "@/components/Rank";
import Hot from "@/components/Hot";
import Stock from "@/components/Stock";

export default {
  name: "ScreenPage",
  components: {Rank, Map, Seller, Trend, Hot, Stock},
  data() {
    return {
      dateTime: new Date(),
      dateTimeId: null,
      fullScreenStatus: {
        hot: false,
        map: false,
        rank: false,
        seller: false,
        stock: false,
        trend: false
      }
    }
  },
  created() {
    if (this.dateTimeId) {
      clearInterval(this.dateTimeId)
    }
    setInterval(() => {
      this.dateTime = new Date()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.dateTimeId)
  },
  methods: {
    changeSize(name) {
      this.fullScreenStatus[name] = !this.fullScreenStatus[name]
      this.$nextTick(() => {
        this.$refs[name].screenAdapter()
      })
    }
  }

}
</script>

<style lang="less" scoped>
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.container {
  height: 100%;
  background: #161525;
  padding: 0 20px 20px 20px;
  min-width: 1000px;

  .head {
    display: flex;
    justify-content: space-between;
    height: 72px;
    background: url("../../public/static/img/header_border_dark.png") center center;

    .head-mid {
      color: white;
      font-size: 22px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .head-right {
      margin-top: auto;
      margin-bottom: auto;
      width: 190px;

      span {
        color: white;
        font-size: 15px;
      }
    }
  }

  .body {
    height: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .char-con {
      position: relative;

      > span {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        cursor: pointer;
      }
    }

    .body-left {
      width: 29%;
      .body-left-top {
        height: 50%;
      }

      .body-left-bottom {
        margin-top: 20px;
        height: 35%;
      }
    }

    .body-mid {
      width: 40%;

      .body-mid-top {
        height: 55%;
      }

      .body-mid-bottom {
        margin-top: 20px;
        height: 30%;
      }
    }

    .body-right {
      width: 29%;

      .body-right-top {
        height: 50%;
      }

      .body-right-bottom {
        margin-top: 20px;
        height: 35%;
      }
    }
  }
}
</style>
