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
        <div class="char-con body-left-top">
          <Trend></Trend>
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
      dateTimeId: null
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
  }

}
</script>

<style lang="less" scoped>
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

      span {
        color: white;
        font-size: 15px;
      }
    }
  }

  .body {
    height: 100%;
    margin-top: 15px;
    overflow: hidden;

    .char-con {
      position: relative;
    }

    .body-left {
      height: 100%;
      width: 30%;
      margin-right: 25px;
      float: left;

      .body-left-top {
        height: 50%;
      }

      .body-left-bottom {
        margin-top: 20px;
        height: 35%;
      }
    }

    .body-mid {
      height: 100%;
      width: 37%;
      float: left;
      margin-right: 20px;

      .body-mid-top {
        height: 55%;
      }

      .body-mid-bottom {
        margin-top: 20px;
        height: 30%;
      }
    }

    .body-right {
      height: 100%;
      width: 30%;
      float: right;

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
