<template>
  <div class="aboutus-box">
    <div class="aboutus">
      <div class="aboutus-banner">
        <div class="aboutus-banner__brief">
          <p class="aboutus-banner__title">
            <span>迷链</span>
            <span class="brief">简介</span>
          </p>
          <p class="marking">技术驱动商业创新 创新成就品牌未来</p>
        </div>
        <div style="padding-top:10px">
          <img src="../../../assets/images/as-head.jpg" alt="" class="swipe-img">
        </div>
        <div class="aboutus-desc">
          <p class="aboutus-desc-content">
            <span class="aboutus-banner--name">武汉迷链科技有限公司</span>(
            <a class="aboutus-banner--name" href="www.chainfans.io">www.chainfans.io</a>简称迷链)，创立于2019年3月，是一家以互联网创新模式软件产品及解决方案为核心，标准化管理、快速发展的高新技术企业。拥有员工几十人，拥有一批互联网领域10余年从业经验的专业团队。
          </p>
          <p
            class="aboutus-desc-content"
          >在“互联网+”战略成为企业经济增长新引擎的形式下，迷链洞察创业者与企业在“互联网+”进程中的不同需求（互联网化商业模式创新、传统企业转型策略、企业营销互联网化与信息化指导等），依托10余年的互联网核心技术沉淀，为创业者与企业提供符合企业“互联网+”战略的软件产品设计、开发以及提供互动营销云服务，以技术创新驱动企业“互联网+”战略的落地。</p>
          <p
            class="aboutus-desc-content"
          >目前，迷链科技完成了兴业资本、国有资本地方产业基金两轮战略融资。未来，迷链将继续围绕以互联网为核心的战略目标，在互联网创新模式产品、互动营销云平台、大数据等业务领域做全方位快速的布局。</p>
        </div>
        <section class="as-advantage">
          <div class="as-advantage__title">
            <span>迷链</span>
            <span class="goodness">优势</span>
          </div>
          <div class="as-advantage__warp">
            <div class="as-advantage__foresight">
              <img src="../../../assets/images/as-m.png" class="as-advantage__img" alt />
              <div class="as-advantage__desc">
                <p class="as-desc__title">行业前瞻性</p>
                <p class="as-desc__content">
                  设立战略研究室，形成 <strong>迷链</strong> 独特的
                  <strong>市场敏锐前瞻性</strong>。捕捉热点，领先推出众多创新产品，销量傲人。
                </p>
              </div>
            </div>
            <div class="as-advantage__natural">
              <div class="as-advantage__desc">
                <p class="as-desc__title natural">公司资质</p>
                <p class="as-desc__content natural">
                  获高新技术企业、科技型企业认证；
                  <strong>20</strong>余项软件发明专利；
                  <strong>30</strong> 余项软件著作权登记证书。
                </p>
              </div>
              <img src="../../../assets/images/as-x.png" class="as-advantage__img img" alt />
            </div>
            <div class="as-advantage__foresight">
              <img src="../../../assets/images/as-q.png" class="as-advantage__img" alt />
              <div class="as-advantage__desc">
                <p class="as-desc__title">研发实力</p>
                <p class="as-desc__content">
                  有一支从业软件开发
                  <strong>10余年、</strong>反应迅速、高效协作的技术团队，奠定开发实力高起点
                </p>
              </div>
            </div>
            <div class="as-advantage__natural">
              <div class="as-advantage__desc">
                <p class="as-desc__title natural">服务体系</p>
                <p class="as-desc__content natural">平台搭建部署协助到位，强大售后团队确保系统运行在线咨询、工单全方位解答客户各种技术难题</p>
              </div>
              <img src="../../../assets/images/as-2q.png" class="as-advantage__img img" alt />
            </div>
          </div>
        </section>
        <section class="culture">
          <p class="as-advantage__title">
            <span>企业</span>
            <span class="goodness">理念&文化</span>
          </p>
          <div class="culture-warp">
            <div>
              <img src="../../../assets/images/as-k.jpg" alt class="cultrue-img"/>
              <p>快速稳定</p>
            </div>
            <div>
              <img src="../../../assets/images/as-j.jpg" alt class="cultrue-img"/>
              <p>极致响应</p>
            </div>
            <div>
              <img src="../../../assets/images/as-b.jpg" alt class="cultrue-img"/>
              <p>谦卑为怀</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Fouseus />
  </div>
</template>
<script>
import Fouseus from "../../../components/fouseus";
export default {
  components: {
    Fouseus
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
  // height: 400px;
}
.aboutus-box {
  .as-advantage__img {
    width:80px;
    height: 70px;
    // margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .as-advantage__desc {
    .as-desc__title {
      color: #3461c3;
      font-size:18px;
      text-align: left;
    }
    .as-desc__contnent {
      text-align: left;
    }
  }
  .as-advantage__title {
    text-align: center;
    line-height:60px;
    font-size:18px;
    .goodness{
      color: #3d8ddd;
    }
  }
  // 迷链简介
  .aboutus {
    border-top: 1px solid #eee;
    background: #fff;
    .aboutus-desc {
      border-bottom: 1px solid #eee;
    }
    .aboutus-banner {
      padding: 15px;
      .aboutus-banner__brief {
        box-sizing: border-box;
        position: relative;
        text-align: center;
        .aboutus-banner__title {
          font-size:18px;
          height:40px;
          line-height:40px;
        }
        .brief {
          color: #3d78d1;
        }
        .marking {
          font-weight: 500;
          font-size:16px;
          color: #444;
        }
      }
      .aboutus-banner--name {
        color: #3d78d1;
      }
      .aboutus-desc-content {
        text-indent: 35px;
        margin-top: 10px;
        margin-bottom: 20px;
        line-height:25px;
      }
    }
  }
  // 迷链优势
  .as-advantage {
    .as-advantage__warp {
      display: grid;
      grid-template-columns: repeat(1, 100%);
      grid-template-rows: repeat(4,130px);
      .as-advantage__foresight {
        display: grid;
        grid-template-columns: 1fr 3fr;
      }
    }
    .as-advantage__natural {
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
    .natural {
      text-align: right;
    }
    .img {
      margin-left:15px;
    }
  }
  // 企业理念文化
  .culture {
    width: 95%;
    margin: auto;
    font-size: 14px;
    border-top: 1px solid #eee;
    .culture-warp{
      display: flex;
      div{
        flex:1;
        text-align: center;
        margin: 25px 0;
        .cultrue-img{
          width:60px;
          height:60px;
        }
      }
    }
  }
}
</style>