<template>
  <div class="chainworld">
    <div class="navBg"></div>
    <van-tabs v-model="world_active" class="reset" :style="{top:parseInt($store.state.appTop)+'px'}" sticky color="#2364bc">
      <van-tab title="行情">
        <!-- <van-tabs v-model="quotation_active" @click="quotationActive()"  color="#2364bc"> -->
          <!-- <van-tab title="关注">
            <p class="follow">暂未关注</p>

          </van-tab> -->
          <!-- <van-tab :title="title" v-for="title in platform" :key="title"> -->

          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false "
            @load="quotationList(quotation_data.length)"
          >  
            <div class="quotation">
              <div class="q-box"></div>
              <div class="q-title" :style="{ top:parseInt($store.state.appTop)+44 +'px' }">
                <span>币种</span>
                <span>最新价</span>
                <span>24H涨幅</span>
              </div>
            
              <div class="list-box">
                <van-pull-refresh v-model="isLoading" @refresh="quotationRefresh">  
                <!-- <div class="q-module" @click="$router.push({name:'quotation'})" v-for="(item,index) in quotation_data" :key="index"> -->
                <div class="q-module" v-for="(item,index) in quotation_data" :key="index">
                    <span>
                      <div class="ranking" :style="{'background':item.rank<4?'#2364bc':'d6d6d6'}"> {{item.rank}} </div>
                      <div class="token-logo">
                        <img :src="item.logoUrl">&nbsp;
                      </div>
                      <div class="token-title">
                        <p>{{item.symbol}}</p>
                        <p>{{availableCny(item.availableCny)}}</p>
                      </div>
                    </span>
                    <span>
                      ￥{{item.priceCny}}<br/>               
                      ${{item.priceUsd}}
                    </span>
                    <span>
                      <div class="gain" :style="{'background':item.range24H>0?'#07c160':item.range24H<0?'red':'#c8c9cc'}">{{item.range24H}}%</div> 
                    </span>
                </div>
                </van-pull-refresh>
              </div>
            </div>
          </van-list>
          <!-- </van-tab> -->
        <!-- </van-tabs> -->





      </van-tab>
      <van-tab title="闪讯">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh('Refresh')">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="fastNewsList(fastNews_data.length==0?'Refresh':'After')"
    
          >
          <div class="news-box">
              <div class="fast_news" v-for="(item,index) in fastNews_data" :key="index">
                <p class="f-time">{{ item.publishTime }} {{ item.mediaName }}</p>
                <p class="f-title">{{ item.title }}</p>
                <p class="f-content">{{ item.content }}</p>
                <p class="f-comment">              
                    <van-icon :name="item.likeState=='1'?'good-job':'good-job-o'" class="like" @click="stick(item,1)" />&nbsp;<font>{{ item.likeCount }}</font>
                    &emsp;
                  <span class="Proportion">
                    <span class="Proportion-value" :style="{'width':proportion(item)}"></span>
                  </span>
                    &emsp;
                    <font>{{ item.unLikeCount }}</font>&nbsp;<van-icon :name="item.likeState=='2'?'good-job':'good-job-o'" class="dislike"  @click="stick(item,2)" />        
                </p>


                <p class="f-important">
                  <van-rate v-model="item.starLevel" readonly size="16px" gutter="2px" />
                </p>
              </div>
          </div>
          </van-list>

        </van-pull-refresh>
  
      </van-tab>
      <!-- <van-tab title="资讯">
        <div style="height:10px"></div>
          <div class="information" v-for="(item,index) in informationList" :key="index" @click="$router.push({name:'outer_chain',query:{url:item.url}})" :href="item.url" >
            <div class="info-title">
              <span>{{item.title}}</span>
              <p>{{item.PublisherName}}&emsp; {{item.PublisherTime}}</p>
            </div>
            <div class="info-img">
              <img :src="item.img">
            </div>
          </div>

      </van-tab> -->
    </van-tabs>
  </div>
</template>
<script>
import {get_fastNewsList, isNewslike} from '@/api/chainworld/fastNews'
import {get_quotationList} from '@/api/chainworld/quotation'
export default {
  name:'chainworld',
  data() {
    return {
      world_active: 0,
      quotation_active:1,
      isLoading: false,
      loading: false,
      finished: false,
      //行情
      platform:['火币','币安','BitMEX','OKEX','ZB网'],
      quotation_data:[],

      //闪讯
      fastNews_data:[],
      //资讯
      informationList:[
        {title:'Bakkt开局表现慢热，为什么加密行业内部人士依然看好它?',img:require('@/assets/images/information_img/09d8e1d30459984e98db397a4d217387.png'),PublisherName:'LongHash',PublisherTime:'22小时前',url:'https://m.feixiaohao.com/news/4922871.html'},
        {title:'当我们在纠结选EOS还是ETH时，国家级公链来了',img:require('@/assets/images/information_img/6a3e45c56fa0475a89eef4a5f5fc9cc7.jpg'),PublisherName:'大宇',PublisherTime:'2019-10-19',url:'https://m.feixiaohao.com/news/4919660.html'},
        {title:'30个落地案例告诉你，区块链到底怎么用！',img:require('@/assets/images/information_img/e38ac3197c8fe851ce6c8a23c75f3362.png'),PublisherName:'小葱APP',PublisherTime:'2019-10-18',url:'https://www.feixiaohao.com/news/4913756.html'},
        {title:'鼓捣币：我国数字货币推向热潮 海南又站了出来',img:require('@/assets/images/information_img/140fd13cde2c4020ad49e42e1bce74f3.jpg'),PublisherName:'鼓捣币',PublisherTime:'2019-10-16',url:'https://m.feixiaohao.com/news/4923094.html'},
        {title:'似乎每一次比特币大涨大跌的背后，都有一只“巨鲸”在出没',img:require('@/assets/images/information_img/2483098_small.jpg'),PublisherName:'链内参',PublisherTime:'2019-10-15',url:'https://m.jinse.com/blockchain/495104.html'},
        {title:'Telegram推迟TON启动 投资者可以收回“约77%”资金',img:require('@/assets/images/information_img/2482812_small.jpg'),PublisherName:'区块链新金融',PublisherTime:'2019-10-14',url:'https://m.jinse.com/blockchain/495022.html'},
        {title:'全面理性分析，Hetbi助您树立正确投资策略',img:require('@/assets/images/information_img/cbebeb5553ba4e7ea9a039c75c0ca2eb.jpg'),PublisherName:'海特币',PublisherTime:'2019-10-14',url:'https://m.feixiaohao.com/news/4922348.html'},
      ]
    };
  },
  created(){
    // if(this.quotation_data.length == 0){
    //   this.quotationRefresh()
    // }
  },

  methods:{
    //  行情
    quotationRefresh() {
        this.isLoading = false;
        // this.quotation_data = []
        this.quotationList(0)
    },
    availableCny(item){
      if(item.toString().length >8){
        return (item/100000000).toFixed(2)+'亿'
      }else if(item.toString().length >4){
        return (item/10000).toFixed(2)+'万'
      }else{
        return item
      }
    },
    quotationList(start){  
      let params = {
        Start:start,
        Limit:20
      }
      if(start==0){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
      }
      get_quotationList(params).then(res => {
        this.$toast.clear();
        if(res.code === 0){
          if(start==0){
            this.quotation_data =res.data
          }else{
            this.quotation_data = this.quotation_data.concat( res.data)
          }
          this.loading = false;
          if(res.data.length<20){
            this.finished = true;
          }
        }else{
          this.$toast(res.messages);
        }
      }).catch(err => {
        this.$toast('网络异常');
      })
    },
    // quotationActive(){
    //   // if(this.quotation_active != 0){
    //     this.quotationList(this.quotation_data.length)
    //   // }
    // },

    //  闪讯
    onRefresh() {
      this.fastNewsList('Refresh');
      this.$toast('刷新成功');
      this.isLoading = false;
    },
    fastNewsList(GetType){
      let params = {
        PageCount:10,
        GetType:GetType,
        PagingParams:this.fastNews_data.length?this.fastNews_data[this.fastNews_data.length-1].publishTime:''
      }
      get_fastNewsList(params).then(res => {
        this.loading = false;
        if(res.code === 0){
          this.fastNews_data = this.fastNews_data.concat(res.data);
          if (this.fastNews_data.length >= res.dataPagingResult.totalCount) {
            this.finished = true;
          }

        }else{
          this.$toast(res.messages);
        }
      }).catch(err => {
        this.$toast('网络异常');
      })
    },
    stick(item,likeState){  //赞
      if(item.likeState != 0){
        this.$toast('已点评过');
        return
      }
      let params = {
        RecordId:item.id,
        LikeState:likeState
      }
      isNewslike(params).then(res => {
        if(res.code === 0){
           item.likeState=likeState;
           if(likeState==1){
             item.likeCount=item.likeCount+1
           }else{
             item.unLikeCount=item.unLikeCount+1
           }
           
          return item
        }else{
          this.$toast(res.messages);
        }
      }).catch(err => {
        this.$toast('网络异常');
      })
      
    },
    proportion(item){    // 利好比例
      if(item.likeCount==0&&item.unLikeCount==0) return '50%'
      return  item.likeCount / (item.likeCount + item.unLikeCount) * 100 + '%' 
    },

    //资讯

  }
};
</script>
<style lang="scss" scoped>
/deep/.van-tabs__line {
  z-index: 0;
}
/deep/.van-sticky--fixed{
  // top: 10px !important;
}
// .clearfix::after {
//   content: ".";
//   display: block;
//   height: 0;
//   clear: both;
//   visibility: hidden;
// }
.chainworld {
  background: #fff;
  font-size: 14px;
  .follow{
    text-align: center;
    color: #c9c9c9;
    margin: 20px 0;
  }
  // .navBg{
  //   position: fixed;
  //   top: 0px;
  //   width: 100%;
  //   height: 70px;
  //   background: #fff;
  //   z-index: 2;
  // }
  .reset{
    width: 100%;
    position: absolute;
   
  }

  .quotation{
    // margin-top: 15px;
    .q-box{
      height: 16px;
      background: #fff;
    }
    .q-title{
      position: fixed;
      // top:40px;
      left: 0;
      right: 0;
      line-height: 30px;
      background: #eee;
      padding: 0 20px;
      z-index: 999;

      span{
        display: inline-block; 
        font-size: 14px;       
        line-height: 30px;
        color: rgb(138, 136, 136);
      }
      span:nth-child(1){
        width: 50%;
        padding-left: 24px;
        box-sizing: border-box;
      }
      span:nth-child(2){
        width: 25%;
        text-align: right;
      }
      span:nth-child(3){
        width: 25%;
        text-align: right;
      }
    }
    .list-box{
      // overflow-y: scroll;
      // height: calc(100vh -135px);
    }
    .q-module{
      height: 50px;
      border-bottom: 1px #eee solid;
      padding: 0 15px;
      display: flex;
      span{
        display: block;
        .ranking{
          background: rgb(214, 214, 214);
          color: #fff;
          min-width: 18px;
          line-height: 16px;
          border-radius: 5px;
          text-align: center;
          margin-right: 10px;
          font-size: 12px;
        }  
        .token-logo{
          margin-right: 10px;
          width: 28px;
          height: 28px;
          img{
            width: 100%;
            height: 100%;
          }
        } 
        .token-title{
          p:nth-child(2){
            font-size: 12px;
            color: #999;
          }
        }  
      }
      span:nth-child(1){
        width: 50%;
        display: flex;
        align-items: center;
      }
      span:nth-child(2){
        width: 25%;
        font-size: 13px;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      span:nth-child(3){
        width: 25%;
        position: relative;
        .gain{
          width: 60px;
          height: 26px;
          border-radius: 3px;
          color:#fff;
          font-size: 12px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          text-align: center;
          line-height: 26px;
        }
      }
    }
  }
  .news-box{
    // overflow: scroll;
    // height: calc(100vh -150px);

  }
  .fast_news{
    padding: 0 20px;
    margin-top: 15px;
    border-bottom: 1px solid #eee;
    p{
      margin: 8px 0;
    }
    .f-time{
      color: #949494;
      font-size: 12px;
    }
    .f-title{
      font-size: 16px;
      color: #587ae8;
      line-height: 18px;
    }
    .f-content{
      font-size: 14px;
      color: #595959;
      text-indent:2em;
    }
    .f-comment{
      font-size: 14px;
      height: 30px;
      display: flex;
      align-items: center;
      .Proportion{
        width: 70%;
        height: 8px;
        background: rgb(180, 177, 177);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        .Proportion-value{
          position: absolute;
          
          height: 8px;
          background: rgb(250, 83, 83);
        }
      }
      .like{
        font-size: 22px;
        color: red;
      }
      .dislike{
        transform: rotate(180deg);
        font-size: 22px;
        color: #666;
      }

    }
    .f-important{

    }
  }
  //资讯
  .information{
    height: 90px;
    padding: 10px;
    box-sizing:border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .info-title{
      width: 256px;
      span{
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
        color: #333;
      }
      p{
        color: #c9c9c9;
        font-size: 12px;
        margin-top: 3px;
      }
    }
      .info-img{
        width: 90px;
        height: 60px;
        img{
          width: 100%;
          height: 100%;
        }
      }

  }


}


</style>