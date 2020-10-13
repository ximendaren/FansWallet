<template>
  <div class="homepage">
    <!--轮播 -->
    <div style="padding:10px 10px 0 10px">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item>
          <img src="../../../assets/images/jypt.png" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/qkl-zx.png" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/qkl-szzc.png" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 热销产品 -->
    <section class="newproduct">
      <div class="main-tit hot split-line">
        <h2>热销产品</h2>
      </div>
      <ul class="hosList clearfix">
        <li class="hosList-list" v-for="(item) in newproduct" :key="item.id">
          <router-link to="/" tag="div" class="hosList-content">
            <div class="hosList-list-img">
              <img :src="item.url" alt />
            </div>
            <div class="hosList-list-text">
              <h2>{{item.title}}</h2>
              <p>{{item.content}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <!-- 活动专题 -->
    <section class="topicActivity">
      <div class="topicActivity-title main-tit flex-box">
        <h1 class="flex-common">活动/专题</h1>
        <router-link to="/" class="topicActivity-more">
          更多>>
        </router-link>
      </div>
      <van-swipe :autoplay="1000" indicator-color="white">
        <van-swipe-item>
          <img src="../../../assets/images/qklsc.png" class="swipe-img" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/jypt.png" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </section>
    <!--成功案例-->
    <section class="successCase">
      <div class="topicActivity-title main-tit flex-box">
        <h1 class="flex-common">成功案例</h1>
        <router-link to="/" class="topicActivity-more">
          更多>>
        </router-link>
      </div>
      <ul class="successCase-business">
        <li class="successCase-img" v-for="(item) in caseList" :key="item.id">
          <img :src="item.url" alt />
        </li>
      </ul>
    </section>
    <!-- 迷链快讯 -->
    <section class="newsflash">
      <div class="topicActivity-title main-tit flex-box">
        <h1 class="flex-common">迷链快讯</h1>
      </div>
      <div class="newsflash-content">
        <ul class="newsflash-news">
          <router-link
            to="/"
            tag="li"
            class="flex-box newsflash-about"
            v-for="item in newsflash"
            :key="item.id"
          >
            <p class="newsflash-time">{{item.time}}</p>
            <p class="news-info el flex-common">{{item.content}}</p>
          </router-link>
        </ul>
      </div>
    </section>
    <!-- 关注我们 -->
    <Fouseus />
  </div>
</template>
<script>
import Fouseus from "../../../components/fouseus";
export default {
  name: "homepage",
  data() {
    return {
      newproduct: [
        {
          id: 0,
          url: require("../../../assets/images/jypt.png"),
          title: "迷链互动直播系统",
          content: "站在风口，全新迷链直播系统带你进入“直播+”的黄金时代"
        },
        {
          id: 1,
          url: require("../../../assets/images/qklsc.png"),
          title: "迷链O2O系统",
          content: "适用多种行业，营销功能强大你能想到的O2O，迷链这里都有"
        },
        {
          id: 2,
          url: require("../../../assets/images/qkl-szzc.png"),
          title: "迷链社交电商系统",
          content: "基于社交的爆炸传播式分销，抢占后电商红利"
        },
        {
          id: 3,
          url: require("../../../assets/images/xftg.png"),
          title: "迷链短视频系统",
          content: "提供丰富的“短视频+”解决方案，开启短视频+新玩法"
        },
        {
          id: 4,
          url: require("../../../assets/images/xftg.png"),
          title: "迷链知识付费系统",
          content: "助力内容运营者，构建完整内容变现平台"
        }
      ],
      caseList: [
        { id: 0, url: require("../../../assets/images/p1.jpg") },
        { id: 1, url: require("../../../assets/images/p2.jpg") },
        { id: 2, url: require("../../../assets/images/p3.jpg") },
        { id: 3, url: require("../../../assets/images/p1.jpg") },
        { id: 4, url: require("../../../assets/images/p2.jpg") },
        { id: 5, url: require("../../../assets/images/p3.jpg") }
      ],
      newsflash: [
        {
          id: 0,
          time: "2019-06-27",
          content:
            "[官方]6.18回顾 | 海峡项目成果交易会圆满落幕,迷链科技亮点不断"
        },
        {
          id: 1,
          time: "2019-06-24",
          content:
            "[官方]迷链科技实力吸“金”，6.18科创企业投融资对接会上成功签约"
        },
        {
          id: 2,
          time: "2019-06-12",
          content:
            "[官方]6.18回顾 | 海峡项目成果交易会圆满落幕,迷链科技亮点不断"
        },
        {
          id: 3,
          time: "2019-06-04",
          content:
            "[官方]迷链科技实力吸“金”，6.18科创企业投融资对接会上成功签约"
        },
        {
          id: 4,
          time: "2019-05-27",
          content:
            "[官方]迷链科技实力吸“金”，6.18科创企业投融资对接会上成功签约"
        }
      ]
    };
  },
  components: {
    Fouseus
  }
};
</script>
<style lang="scss" scoped>
.swipe-img {
  width: 100%;
}
.homepage {
  background: #eee;
  .clearfix::after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .main-tit {
    line-height:40px;
    padding: 0 15px 0 25px;
    color: #444;
    .hot {
      height: 90px;
      background: #f5f5f5;
    }
  }
  .split-line {
    position: relative;
  }
  .flex-box {
    display: flex;
    align-items: center;
  }
  .flex-common {
    flex: 1;
  }
  .topicActivity-more {
    font-size:14px;
    color: #3d78d1;
  }
  .topicActivity-title {
    border-bottom: 1px solid #eee;
    height:45px;
    h1 {
      font-size:16px;
    }
  }
  // 热销产品
  .newproduct {
    h2 {
      font-size:16px;
    }
    .hosList {
      background: #fff;
      li {
        float: left;
        width: 50%;
        box-sizing: border-box;
        &:first-child {
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        &:nth-child(2){
          border-bottom: 1px solid #eee;
        }
        &:nth-child(3){
          border-right:1px solid #eee;
        }
        &:nth-child(4){
          border-bottom: 1px solid #eee;
        }
        &:last-child {
          border-top:1px solid #eee;
          border-right: 1px solid #eee;
        }
      }
      .hosList-list {
        position: relative;
        box-sizing: border-box;
        .hosList-content {
          text-align: center;
          padding: 15px 0 10px;
          box-sizing: border-box;
          .hosList-list-img {
            img {
              width:65px;
              height:65px;
            }
          }
          .hosList-list-text {
            font-size: 14px;
            color: #444;
            padding: 8px 0;
            p {
              font-size:14px;
              padding: 0 6px;
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
              text-align: center;
            }
          }
        }
      }
    }
  }
  // 活动专题
  .topicActivity {
    height: auto;
    margin-top: 15px;
    background: #fff;
    position: relative;
    margin-bottom: 15px;
  }
  // 成功案例
  .successCase {
    height:260px;
    background: #fff;
    box-sizing: border-box;
    .successCase-business {
      padding: 0 15px;
      .successCase-img {
        width: 33.3%;
        float: left;
        padding: 0 15px;
        box-sizing: border-box;
        text-align: center;
        img {
          height:100px;
          width: 100px;
          vertical-align: middle;
        }
      }
    }
  }
  // 新闻快讯
  .newsflash {
    background: #fff;
    margin-top: 15px;
    zoom: 1;
    .newsflash-content {
      padding: 15px 25px;
      .newsflash-about {
        font-size:14px;
        line-height: 35px;
        .newsflash-time {
          color: #666;
          &::after {
            content: "";
            border-right: 1px solid #b6b6b6;
            height: 8px;
            margin: 0 15px;
          }
        }
        .news-info {
          color: #444;
        }
        .el {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>