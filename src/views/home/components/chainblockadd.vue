<template>
  <div class="chainblockadd">
    <div style="padding:10px 10px 0 10px">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item>
          <img src="../../../assets/images/qklsc.png" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/jypt.png" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/qklyx.png" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <Tabs />
    <div class="accessscheme">
      <p class="accessscheme-title">投资方式&价格方案</p>
      <div class="accessscheme-main">
        <div class="accessscheme-top">
          <div>
            <P class="ac-top__title">多种产品形式，灵活适用各类业务场景</P>
            <img
              class="accessscheme-img"
              src="../../../assets/images/qka-1.png"
              alt
            />
            <p class="accessscheme-name">Web API</p>
            <P class="accessscheme-desc">根据您的业务需求在线灵活调用 Web API，轻松拥有区块链+最新的所有技术</P>
          </div>
        </div>
        <div class="accessscheme-center">
           <div>
            <img
              class="accessscheme-img"
              src="../../../assets/images/qka-2.png"
              alt
            />
            <p class="accessscheme-name">Mobile SDK</p>
            <P class="accessscheme-desc">集成 Mobile SDK 到您的应用中，在移动设备上离线调用区块链+能力，轻松处理高清视频流</P>
          </div>
        </div>
        <div class="accessscheme-bottom">
           <div>
            <img
              class="accessscheme-img"
              src="../../../assets/images/qka-3.png"
              alt
            />
            <p class="accessscheme-name">其他形式</p>
            <P class="accessscheme-desc">区块链+还提供服务器端SDK、整体解决方案等其他形式的产品服务，满足您各类业务场景需求</P>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from "../../../components/tab";
export default {
  name: "chainblockadd",
  components: {
    Tabs
  }
};
</script>
<style lang="scss" scoped>
.swipe-img {
  width: 100%;
  // height: 400px;
}
.accessscheme {
  height: auto;
  width: 100%;
  // margin-top: 30px;
  .accessscheme-title {
    color: #000;
    font-size:18px;
    font-weight: 900;
    height:60px;
    line-height:60px;
    text-align: center;
  }
  .accessscheme-main {
    height: inherit;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(3,300px);
  }
  .accessscheme-top {
    align-items: center;
    justify-content: center;
    display: flex;
    div {
      width: 70%;
      height: 80px;
      height: inherit;
      text-align: center;
      .ac-top__title {
        color: #5d5d5d;
        height:50px;
        line-height:50px;
        text-align: center;
      }
      .accessscheme-img {
        width:250px;
        height:150px;
        margin-left:25px;
        display: inline-block;
      }
      .accessscheme-name {
        font-size:16px;
        color: #333333;
        height:50px;
        line-height:50px;
        text-align: center;
      }
      .accessscheme-desc {
         color: #5d5d5d;
         height:50px;
        text-align: center;
      }
    }
  }
  .accessscheme-center {
    @extend .accessscheme-top;
  }
  .accessscheme-bottom {
    @extend .accessscheme-top;
  }
}
</style>