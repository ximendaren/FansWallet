<template>
  <div class="internetadd">
    <div style="padding:10px 10px 0 10px">
      <van-swipe :autoplay="2000" indicator-color="#60d1f9">
        <van-swipe-item>
          <img src="../../../assets/images/l-1.jpg" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/l-4.jpg" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/l-3.jpg" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="cloudproduct">
      <p class="cloudproduct--title">我们的服务</p>
      <van-collapse v-model="activeNames" :border="true">
        <van-collapse-item title="电子商务解决方案" icon="shop-o" name="1">
          <div class="electronic">
            <div>
              <p class="electronic--title">
                电子商城
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">基于电子产品类的商城</p>
            </div>
            <div>
              <p class="electronic--title">分销商城</p>
              <p class="electronic--content">各种分销模式任你选择</p>
            </div>
            <div>
              <p class="electronic--title">B2B2C电商</p>
              <p class="electronic--content">综合性的生活服务O2O电商</p>
            </div>
            <div>
              <p class="electronic--title">
                移动电商
                <span class="NEW">NEW</span>
              </p>
              <p class="electronic--content">各种场景，多种选择</p>
            </div>
            <div>
              <p class="electronic--title">
                小程序
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">打造简单高效的小程序</p>
            </div>
            <div>
              <p class="electronic--title">O2O系统</p>
              <p class="electronic--content">综合性的生活服务O2O系统</p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="收银系统" name="2" icon="gold-coin-o">
          <div class="electronic-one">
            <div>
              <p class="electronic--title">零售收银</p>
              <p class="electronic--content">部署智慧零售收银系统</p>
            </div>
            <div>
              <p class="electronic--title">餐饮收银</p>
              <p class="electronic--content">部署智慧餐饮收银系统</p>
            </div>
            <div>
              <p class="electronic--title">
                O2O产品
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">综合性的O2O产品</p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="移动应用" name="3" icon="phone-o">
          <div class="electronic-two">
            <div>
              <p class="electronic--title">APP开发</p>
              <p class="electronic--content">打造简单高效的app应用</p>
            </div>
            <div>
              <p class="electronic--title">
                微信小程序
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">打造简单高效的微信小程序</p>
            </div>
            <div>
              <p class="electronic--title">
                公众号
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">打造简单高效的公众号</p>
            </div>
            <div>
              <p class="electronic--title">
                AI人工智能
                <span class="NEW">NEW</span>
              </p>
              <p class="electronic--content">各种场景，多种选择</p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="社交直播" name="4" icon="friends-o">
          <div class="electronic-three">
            <div>
              <p class="electronic--title">IM即时通讯</p>
              <p class="electronic--content">自建IM社交平台及生态</p>
            </div>
            <div>
              <p class="electronic--title">社区交友</p>
              <p class="electronic--content">社区交友新玩法</p>
            </div>
            <div>
              <p class="electronic--title">
                短视频
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">最热的短视频+解决方案</p>
            </div>
            <div>
              <p class="electronic--title">
                知识付费
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">搭建你自己的知识付费平台</p>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="网站建设" name="5" icon="cashier-o">
          <div class="electronic-four">
            <div>
              <p class="electronic--title">新闻资讯</p>
              <p class="electronic--content">各类新闻，尽情观看</p>
            </div>
            <div>
              <p class="electronic--title">公司官网</p>
              <p class="electronic--content">搭建属于自己的官网</p>
            </div>
            <div>
              <p class="electronic--title">管理软件</p>
              <p class="electronic--content">定制各类管理软件</p>
            </div>
            <div>
              <p class="electronic--title">
                定制开发
                <span class="HOT">HOT</span>
              </p>
              <p class="electronic--content">定制开发，满你所需</p>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="choicecase">
      <p class="choicecase-title">精选客户案例</p>
      <div class="choicecase-img">
        <div>
          <img src="../../../assets/images/jxkh-1.png" alt />
          <img src="../../../assets/images/jxkh-2.png" alt />
          <img src="../../../assets/images/jxkh-3.png" alt />
        </div>
        <div>
          <img src="../../../assets/images/jxkh-4.png" alt />
          <img src="../../../assets/images/jxkh-5.png" alt />
          <img src="../../../assets/images/jxkh-6.png" alt />
        </div>
      </div>
    </div>
    <div class="internetadd-bottom">
      <p class="ib-title">方案与架构咨询</p>
      <p class="ib-desc">关于使用场景和技术架构的更多咨询， 请联系我们的销售和技术支持团队。</p>
      <router-link tag="a" to class="aboutus-btn">联系我们</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "internetadd",
  data() {
    return {
      activeNames: ["1"]
    };
  }
};
</script> 
<style lang="scss" scoped>
.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.swipe-img {
  width: 100%;
  height:180px;
  // height: 400px;
}
.internetadd {
  .cloudproduct {
    margin-top: 10px;
    background: #fff;
    .cloudproduct--title {
      height: 50px;
      font-size:18px;
      font-weight: 900;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #f7efef;
    }
    .electronic {
      display: grid;
      width: inherit;
      text-align: left;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(3, 80px);
      div {
        font-size: 12px;
        background: #f7f7f7;
        margin:5px;
        border-radius: 10px;
        .electronic--title {
          font-size:15px;
          color: #434343;
          margin-top:10px;
          margin-left: 10px;
        }
        .electronic--content {
          // font-size: 25px;
          margin-top:10px;
          margin-left: 10px;
          color: #5d5d5d;
        }
      }
    }
    .electronic-one {
      @extend .electronic;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(2, 80px);
    }
    .electronic-two {
      @extend .electronic-one;
    }
    .electronic-three {
      @extend .electronic-one;
    }
    .electronic-four {
      @extend .electronic-one;
    }
    .HOT {
      padding: 0 8px;
      background: #f55c06;
      color: #fdded4;
      margin-left: 10px;
      font-size: 12px !important;
      border-radius:3px;
    }
    .NEW {
      @extend .HOT;
      background: #15bbf6;
      color: #ebf9fe;
    }
  }
}
.choicecase {
  // height: 450px;
  margin-top:30px;
  .choicecase-title {
    font-size:18px;
    font-weight: 900;
    color: #170000;
    text-align: center;
    margin-bottom: 20px;
  }
  .choicecase-img {
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(2, 80px);
    div {
      display: grid;
      grid-template-columns: repeat(3, 33%);
      grid-template-rows: repeat(1, 80px);
      img {
        display: inline-block;
        text-align: center;
        margin: auto;
        width:120px;
        height: 40px;
      }
    }
  }
}
.internetadd-bottom {
  // background: #f4f6f8;
  border-top: 1px solid #eee;
  // height: 500px;
  .ib-title {
    height:50px;
    font-weight: 900;
    line-height: 50px;
    font-size:18px;
    color: #000000;
    text-align: center;
  }
  .ib-desc {
    margin: auto;
    color: #666666;
    font-size:16px;
    width: 80%;
    height: 60px;
    text-align: center;
  }
  .aboutus-btn {
    @extend .ib-desc;
    margin-top: 20px;
    margin-bottom: 20px;
    display: block;
    color: #fff;
    height: 40px;
    border-radius: 6px;
    line-height: 40px;
    // background: #00a4ff;
    background: #15bbf6
  }
}
</style>