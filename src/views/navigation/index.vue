<template>
    <div class="container-defi">
        <div class="null" ref="null"></div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <img src="@/assets/images/nav_logo/nav1.png" alt="">
            </van-swipe-item>
            <van-swipe-item><img src="@/assets/images/nav_logo/nav2.png" alt=""></van-swipe-item>
            <van-swipe-item><img src="@/assets/images/nav_logo/nav3.png" alt=""></van-swipe-item>
        </van-swipe>
        <div class="collection">
            <p>
                <span>收藏</span>
                <span>全部 <van-icon name="arrow" /></span>
            </p>
            <div class="no-data" v-if="bookmark.length === 0">
                <img src="@/assets/images/nav_logo/no-data.png" alt=""><br>
                <span>暂无收藏</span>
            </div>
            <van-grid v-else :border="false" style="text-align:center">
                <van-grid-item :icon="item.logo" :text="item.title" v-for="(item,index) in bookmark.slice(0,4)" :key="index" @click="$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(item)} })" />

            </van-grid>

        </div>
        <div class="recommend" v-for="(title,index) in nvaData" :key="index">
            <P class="recommend-title"> {{title.blockName}} </P>
            <van-swipe class="recommend-swipe"  :width="offsetWidth" :loop="false" :show-indicators="false">
                <van-swipe-item v-for="num in Math.ceil(title.media.length/3)" :key="num">
                    <div class="module" v-for="(item,index) in title.media.slice((num-1)*3,3*num)" :key="index" @click="goDapp(item)">
                        <div class="logo-img">
                            <img :src="item.logo" alt="">
                        </div>
                        <div class="content">
                            <p class="title"><van-tag type="primary" v-if="item.label"> {{item.label}} </van-tag> {{item.title}} </p>
                            <p class="describe"> {{item.introduce}} </p>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'navigation',
    data() {
        return {
            nvaData:[
                {
                blockName:'推荐',
                bookmark:[],
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/LON.png'),title:'LON',link:'https://tokenlon.im/lon/dashboard?locale=zh-CN&utm_source=imtoken#/',introduce:'LON 挖矿',show:true},
                    {logo:require('@/assets/images/nav_logo/OTC.png'),title:'OTC交易',link:'https://otc.tokenlon.im/?locale=zh-CN&utm_source=imtoken',introduce:'支持USDT ETH BTC',show:true},
                    ]
                },
                {
                blockName:'DeFi',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/DeFiner.png'),title:'DeFiner',link:'https://h5.definer.cn/?locale=zh-CN&utm_source=imtoken',introduce:'安全好用的DeFi借贷协议',show:true},
                    {logo:require('@/assets/images/nav_logo/FouTube.png'),title:'FouTube',link:'https://for.tube/bank/home?locale=zh-CN&utm_source=imtoken',introduce:'全球领先的DeFi借贷平台',show:true},
                    {logo:require('@/assets/images/nav_logo/DeBank.png'),title:'DeBank',link:'https://debank.com/portfolio/debanker.eth',introduce:'一站式DeFi信息聚合平台',show:true},
                    ]
                },
                // {
                // blockName:'流动性挖矿',
                // isOpen:false,
                // media:[
                //     {logo:require('@/assets/images/nav_logo/localbitcoins_com.png'),title:'LocalBitcoins',link:'https://localbitcoins.com/',introduce:'世界最大的比特币场外交易平台',show:true},
                //     {logo:require('@/assets/images/nav_logo/huobi_pro.png'),title:'火币 C2C',link:'https://otc.huobi.co/zh-cn/trade/buy-btc/',introduce:'多币种场外交易 – 火币专业交易站',show:true},
                //     {logo:require('@/assets/images/nav_logo/okex_com.png'),title:'Okex C2C',link:'https://www.okex.com/c2c/trade/trade.do',introduce:'OK公司提供的BTC及BTH场外交易',show:true},
                //     {logo:require('@/assets/images/nav_logo/coincola_com.png'),title:'可盈可乐',link:'https://www.coincola.app/',introduce:'安全可信赖的香港场外交易平台',show:false},
                //     ]
                // },
                {
                blockName:'交易所',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/Uniswap.png'),title:'Uniswap',link:'https://bafybeihcghnavsw7wkxknbhhy63rqz5szcxffcqkqjoprvxduszqin4umi.ipfs.dweb.link/#/swap',introduce:'Uniswap',label:'ETH',show:true},
                    {logo:require('@/assets/images/nav_logo/TronTrade.png'),title:'TronTrade',link:'https://trontrade.io/',introduce:'轻松买卖各种TRC10和TRC20加密货币',label:'TRX',show:true},
                    {logo:require('@/assets/images/nav_logo/SushiSwap.png'),title:'SushiSwap',link:'https://exchange.sushiswapclassic.org/#/swap?locale=zh-CN&utm_source=imtoken',introduce:'去中心化交易所',label:'ETH',show:true},
                    ]
                },
                {
                blockName:'游戏',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/ChainZ.png'),title:'ChainZ Arena',link:'https://www.chainzarena.com/?platform=huobiwallet',introduce:'放置与挖矿，玩与赚',label:'TRX',show:true},
                    {logo:require('@/assets/images/nav_logo/888Tron.png'),title:'888Tron',link:'https://888tron.com',introduce:'游戏，挖矿，获得分红',label:'TRX',show:true},
                    {logo:require('@/assets/images/nav_logo/pointer.png'),title:'无损彩票',link:'https://app.pooltogether.com/?locale=zh-CN&utm_source=imtoken',introduce:'不会损失本金的彩票',show:true},
                    {logo:require('@/assets/images/nav_logo/TronVegas.png'),title:'TronVegas',link:'https://www.tronvegas.net/',introduce:'基于TRON链的在线博弈平台',label:'TRX',show:false},  
                    ]
                },
                {
                blockName:'工具',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/crypto.png'),title:'crypto',link:'https://unstoppabledomains.com/r/f9e8fd6c3ac6480',introduce:'简化加密币转账，构建去中心化网站',label:'ETH',show:true},
                    {logo:require('@/assets/images/nav_logo/miner.png'),title:'小矿工',link:'https://www.oxbtc.com/miner/?from=huobiwallet',introduce:'1000元比特币红包免费送',show:true},
                    {logo:require('@/assets/images/nav_logo/Etherscan.png'),title:'Etherscan',link:'https://cn.etherscan.com/?locale=zh-CN&utm_source=imtoken',introduce:'以太坊交易浏览器',label:'ETH',show:true},
                    {logo:require('@/assets/images/nav_logo/imKey.png'),title:'imKey',link:'https://shop42404838.m.youzan.com/v2/feature/d5bMdxB3Ab?dc_ps=2595664867151279107.200001',introduce:'imKey硬件钱包销售平台',show:false},
                    {logo:require('@/assets/images/nav_logo/BTC.png'),title:'BTC.com',link:'https://btc.com/',introduce:'BTC区块链浏览器',show:false},
                    {logo:require('@/assets/images/nav_logo/OMNIEXPLORER.png'),title:'OMNIEXPLORER.INFO',link:'https://omniexplorer.info/',introduce:'USDT区块链浏览器',show:false},
                    {logo:require('@/assets/images/nav_logo/Tronscan.png'),title:'Tronscan',link:'https://tronscan.io',introduce:'TRX区块链浏览器',show:false},
                    ]
                },
                {
                blockName:'社区',
                isOpen:false,
                media:[
                    {logo:require('@/assets/images/nav_logo/im.png'),title:'im 社群',link:'https://imtoken.fans/?locale=zh-CN&utm_source=imtoken',introduce:'数字钱包用户互助社群',show:true},
                    {logo:require('@/assets/images/nav_logo/Beep.png'),title:'Beep币扑',link:'https://beepcrypto.com/hot?locale=zh-CN&utm_source=imtoken',introduce:'区块链热搜榜',show:true},
                    {logo:require('@/assets/images/nav_logo/DAppTotal.png'),title:'DAppTotal',link:'https://m.dapptotal.com/ranking?locale=zh-CN&utm_source=imtoken',introduce:'头部DApp数据分析平台，助您快人一步了解数据趋势',show:true},
                    ]
                },
            ],
            offsetWidth:0
            
        }
    },
    created(){
        this.bookmark = this.public_js.GetStorage('bookmark') || [];
    },
    mounted(){
        this.offsetWidth = this.$refs.null.offsetWidth
    },
    methods:{
        goDapp(item){
            let isVisit = this.public_js.GetStorage('isVisit') || [];
            if(isVisit.some(n=> n == item.title)){
                // this.$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(item)} })
                this.$router.push({ path:'/thirdParty',query:{ data:item} })
                return
            }
            this.$dialog.confirm({
                title: '你正在访问第三方 Dapp',
                message: ' 你在第三方 Dapp 上的使用行为将适用该第三方 Dapp 的《用户协议》和《隐私政策》，由 '+item.title+' 直接并单独向你承担责任。',
            }).then(() => {
                isVisit.push(item.title)
                this.public_js.SetStorage('isVisit',isVisit);
                this.$router.push({ path:'/thirdParty',query:{ data:item} })
            })  .catch(() => {
                // on cancel
            });
        }
    },

}
</script>
<style scoped lang="scss">
.container-defi{
  .my-swipe .van-swipe-item {
    height: 150px;
    img{
        width: 100%;
        height: 100%;
    }
  }
  .collection{
    padding: 8px 15px;
    height: 100px;
    .no-data{
        text-align: center;
        img{
            width: 60px;
            height: 60px;
        }
        span{
            font-size: 13px;
            color: #c9c9c9;
        }
    }
    p{
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        span:nth-child(2){
            color: #949494;
            font-size: 13px;
            display: flex;
            align-items: center;
        }
    }
    /deep/.van-grid-item__text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80px;
    }
  }
  .recommend{
    .recommend-title{  
        padding: 10px 15px;
        font-size: 15px;    
    }
    .recommend-swipe{
        // height: 180px;
        // background: #eee;
        color: #000;
        .module{
            display: flex;
            height: 60px;
            padding: 5px 15px;
            .logo-img{
                width: 50px;
                height: 50px;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .content{
                width: 255px;
                border-bottom: 1px solid #eee;
                .title{
                    font-size: 13px;
                }
                .describe{
                    font-size: 12px;
                    color: #949494;
                }
            }
        }
    }
  }
}
.null{
    width: 350px;
}
</style>