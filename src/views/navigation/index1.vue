<template>
    <div class="container-nav">
        <div class="recommend">
            <p><b>推荐</b></p>
            <div style="margin-top:10px">
                <van-grid square :border="false" :clickable="true" gutter="5" :column-num="5">
                <van-grid-item
                    v-for="(item,index) in navData[0].media"
                    :key="index"
                    :icon="item.logo"
                    :text="item.title"
                    @click="$router.push({name:'outer_chain',query:{url:item.link}})"
                />
                </van-grid>     
            </div>
            <div class="media" v-for="(block,i) in navData" :key="i">
                <p><b>{{block.blockName}} </b> <span @click="togglebox(i)">{{block.isOpen?'收起':'展开'}}<van-icon name="arrow-down" class="no-rotate" :class="{'rotate':block.isOpen}" /></span></p>
                                    
                <div class="animate" :class="{'open':block.isOpen}">  
                    <div class="module" v-for="(item,index) in block.media" :key="index" @click="$router.push({name:'outer_chain',query:{url:item.link}})">
                        <div class="img-box">
                            <img :src="item.logo">
                        </div>                                    
                        <div class="title">
                            <p> {{item.title}} </p>
                            <p>{{item.introduce}}</p>
                        </div>
                    </div>
                </div> 

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'navigation',
    data() {
        return {
            navData:[
                {
                blockName:'媒体',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/huoxincaijin.png'),title:'火星财经',link:'http://m.huoxing24.com',introduce:'火星财经-区块链先锋门户。',show:true},
                    {logo:require('@/assets/images/nav_logo/jinse_com.png'),title:'金色财经',link:'https://www.jinse.com',introduce:'金色财经是集行业新闻、资讯、行情、数据等一站式区块链产业服务平台。',show:true},
                    {logo:require('@/assets/images/nav_logo/lianmishu.png'),title:'链秘书',link:'http://lianmishu.com',introduce:'链秘书是一个专业区块链资讯平台。',show:true},
                    {logo:require('@/assets/images/nav_logo/bitett_com.png'),title:'比特头条',link:'http://www.bitett.com/portal.php',introduce:'比特币标志着区块链时代的到来。',show:false},
                    {logo:require('@/assets/images/nav_logo/bishijie_com.png'),title:'币世界',link:'http://www.bishijie.com/kuaixun',introduce:'币世界是专业的行业动态快讯，快人一步，尽览币圈事。',show:false},
                    {logo:require('@/assets/images/nav_logo/8btc_com.png'),title:'巴比特',link:'https://m.8btc.com',introduce:'巴比特始建于2011年，是国内最早的区块链资讯社区门户。',show:false},
                    {logo:require('@/assets/images/nav_logo/coindesk_com.png'),title:'Coindesk',link:'https://www.coindesk.com',introduce:'比特币新闻领导者',show:false},
                    {logo:require('@/assets/images/nav_logo/OKAirdrop.png'),title:'OK空投网',link:'http://www.bishijie.com/kuaixun',introduce:'OKAirdrop是一个专业的区块链糖果网站平台，整合最新的区块链空投糖果资讯。',show:false},
                    {logo:require('@/assets/images/nav_logo/coincenter_org.png'),title:'CoinCenter',link:'http://www.bishijie.com/kuaixun',introduce:'让区块链像比特币一样自由开放。',show:false},
                    ]
                },
                {
                blockName:'钱包',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/bitcoin_org.png'),title:'比特币官方钱包',link:'https://bitcoin.org/en/',introduce:'比特币是一个创新的支付网络，也是一种新型货币。',show:true},
                    {logo:require('@/assets/images/nav_logo/ethereum_org.png'),title:'以太坊官方钱包',link:'https://www.ethereum.org',introduce:'官方的以太坊钱包，安全可靠。以太坊钱包是在以太坊区块链上分散应用的门户。',show:true},
                    {logo:require('@/assets/images/nav_logo/jaxx_io.png'),title:'JAXX',link:'https://jaxx.io',introduce:'支持30余种资产的优秀钱包',show:true},
                    {logo:require('@/assets/images/nav_logo/ripplefox_com.png'),title:'瑞波币官网钱包',link:'http://download.ripplefox.com',introduce:'瑞狐网关是一个基于Ripple的网关、做市商，提供人民币CNY的充值和提现的入口。',show:false},
                    {logo:require('@/assets/images/nav_logo/litecoin_org.png'),title:'莱特币官网钱包',link:'https://litecoin.org/cn',introduce:'莱特币官方钱包',show:false},
                    {logo:require('@/assets/images/nav_logo/atoken.png'),title:'AToken 钱包',link:'https://www.atoken.com',introduce:'AToken移动端数字货币钱包轻便安全，支持19个币种&跨链互换。',show:false},
                    ]
                },
                {
                blockName:'游戏',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/baidu_com.jpg'),title:'百度莱茨狗',link:'https://pet-chain.baidu.com/',introduce:'养成',show:true},
                    {logo:require('@/assets/images/nav_logo/cryptofighters_io.jpg'),title:'加密斗士',link:'https://cryptofighters.io/',introduce:'养成',show:true},
                    {logo:require('@/assets/images/nav_logo/myhero9_com.jpg'),title:'我的英雄',link:'http://www.myhero9.com/',introduce:'TCG',show:true},
                    {logo:require('@/assets/images/nav_logo/aethia_co.jpg'),title:'以太蛋',link:'https://aethia.co/',introduce:'养成',show:false},
                    ]
                },
                {
                blockName:'交易',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/localbitcoins_com.png'),title:'LocalBitcoins',link:'https://localbitcoins.com/',introduce:'世界最大的比特币场外交易平台',show:true},
                    {logo:require('@/assets/images/nav_logo/huobi_pro.png'),title:'火币 C2C',link:'https://otc.huobi.co/zh-cn/trade/buy-btc/',introduce:'多币种场外交易 – 火币专业交易站',show:true},
                    {logo:require('@/assets/images/nav_logo/okex_com.png'),title:'Okex C2C',link:'https://www.okex.com/c2c/trade/trade.do',introduce:'OK公司提供的BTC及BTH场外交易',show:true},
                    {logo:require('@/assets/images/nav_logo/coincola_com.png'),title:'可盈可乐',link:'https://www.coincola.app/',introduce:'安全可信赖的香港场外交易平台',show:false},
                    ]
                },
            ],
            
        }
    },
    methods:{
        togglebox(i){
            this.navData[i].isOpen = !this.navData[i].isOpen

        }
    },

}
</script>
<style scoped lang="scss">
/deep/.van-image__img{
    border-radius: 50%;
}
/deep/.van-grid-item__icon{
    font-size: 35px;
}
/deep/.van-grid-item__text {
    color: #000;
}   
/deep/.van-grid-item__content{
    padding: 0;
} 
.container-nav{
    font-size: 14px;
    
    .recommend{
        p{
            line-height: 30px;
            padding: 0 15px;
        }
    }
    .media{ 
        margin-bottom: 10px;
        .no-rotate{
            transition: 0.6s all;
        }
        .rotate{
            transform: rotate(180deg);
            transition: 0.6s all;            
        }   
        >p{
            display: flex;
            justify-content: space-between;
            align-items: center;
            b{
                font-size: 15px;
            }
            span{
                color: #666;
                display: flex;
                align-items: center;
            }
        } 
        .animate{
            max-height: 213px;
            overflow: hidden;
            transition: max-height 0.8s;
        }
        .open{
           max-height: 840px !important;
           transition: max-height 1s;
        }
        .module{
            padding: 0 20px;
            height: 70px;
            display: flex;
            // align-items: center;
            border-bottom: 1px solid #eee;
            .img-box{
                width: 40px;
                height:40px;
                margin-top: 10px;
                img{
                    // width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    
                }
            } 
            .title{
                margin-top: 5px;
                p:nth-child(1){
                    font-size: 16px;
                    line-height: 24px;
                    color: #000;
                }
                p:nth-child(2){
                    font-size: 14px;
                    color: #969799;
                    line-height: 16px;
                }
                
            }
        }
    }
}
</style>