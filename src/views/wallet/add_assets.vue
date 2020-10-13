<template>
    <div class="assets-container">
        <pageheader></pageheader>
        <van-search v-if="!isSearch" placeholder="请输入Token名称或合约地址" v-model="tokenValue" class="seach-box" @focus="isSearch=true"  />
        <van-search v-else placeholder="请输入Token名称或合约地址" v-model="tokenValue" class="seach-box" show-action @cancel="isSearch=false" @input="searchToken" />
          
        <div class="hot-assets" v-if="!isSearch">
            <div class="hot-title van-hairline--bottom"><span>热门资产</span> <span @click="$toast('开发中')">申请上币<van-icon class="ico" name="upgrade" /></span> </div>
            <div class="hot-module van-hairline--bottom" v-for="item in hotToken" :key="item.tokenId">
                <div class="hot-img">
                    <img :src="require('@/assets/images/token_logo/'+item.tokenType+'.png')" alt="">
                </div>
                <div class="hot-info">
                    <span><b>{{item.tokenSymbol}}</b>&emsp;<font style="color:#888">{{item.tokenName}}</font> </span>
                    <span> {{ellipsAddress(item.tokenAddress)}}  </span>
                </div>
                <div class="hot-state">
                    <van-icon :name="item.isAdd==0?'add-o':'passed'" :style="{'opacity':item.isAdd==1?'0.5':'1'}" @click="add_assets(item)" />
                </div>
            </div>
        </div>

        <div class="hot-assets" v-if="checkToken.length>0&&isSearch">
            <div class="hot-module van-hairline--bottom" v-for="item in checkToken" :key="item.tokenId">
                <div class="hot-img">
                    <img :src="require('@/assets/images/token_logo/'+item.tokenType+'.png')" alt="">
                </div>
                <div class="hot-info">
                    <span><b>{{item.tokenSymbol}}</b>&emsp;<font style="color:#888">{{item.tokenName}}</font></span>
                    <span>{{ellipsAddress(item.tokenAddress)}}</span>
                </div>
                <div class="hot-state" @click="add_assets(item)">
                    <van-icon :name="item.isAdd==0?'add-o':'passed'" :style="{'opacity':item.isAdd==1?'0.5':'1'}" /> 
                </div>
            </div>
        </div>
        <div v-if="checkToken.length==0&&tokenValue.length>0" class="unsearched">
            未搜索到相关Token
        </div>



    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import {get_hotList, get_searchToken, set_walletTokens, get_walletData} from '@/api/mycenter/wallet'
export default {
    components:{pageheader},
    data(){
        return {
            tokenValue:'',
            isSearch:false,
            hotToken:[],
            checkToken:[],
        }
    },
    created(){
        this.hot_list()
    },
    methods:{
        add_assets(item){
            if(!item.isAdd){
                let params = {
                    tokenId:item.tokenId,
                    IsAdd:1
                }
                // set_walletTokens(params).then(res => {
                //     if(res.code === 0){
                //         item.isAdd = 1;
                //         this.$toast('添加资产成功')

                //         get_walletData().then(res => {   
                //             if(res.code === 0){
                //                 if(window.plus){
                //                     plus.storage.setItem('tokenList',JSON.stringify(res.data))
                //                 }else{
                //                     localStorage.setItem('tokenList',JSON.stringify(res.data))
                //                 }
                //             }
                //         })    
                //     }else{
                //         this.$toast(res.messages)
                //     }
                // }).catch(err => {
                //     this.$toast.clear()
                //     this.$toast('网络异常')
                // })
            }
        },
        hot_list(){
            // this.$toast.loading({
            // message: '加载中...',
            // forbidClick: true,
            // loadingType: 'spinner'
            // });
            // get_hotList().then(res => {
            //     this.$toast.clear()
            //     if(res.code === 0){
            //         this.hotToken = res.data
            //     }else{
            //         this.$toast(res.messages)
            //     }
            // }).catch(err => {
            //     this.$toast.clear()
            //     this.$toast('网络异常')
            // })
        },
        searchToken(){    
            // let params = {
            //     PageCount:15,
            //     GetType:'After',
            //     PagingParams:0,
            //     TokenSymbol:this.tokenValue
            // }
            // this.$toast.loading({
            //     message: '加载中...',
            //     forbidClick: true,
            //     loadingType: 'spinner'
            // });
            // get_searchToken(params).then(res => {
            //     this.$toast.clear()
            //     if(res.code === 0){
            //         this.checkToken = res.data
            //         console.log(this.checkToken)
            //     }else{
            //         this.$toast(res.messages)
            //     }
            // }).catch(err => {
            //     this.$toast('网络异常')
            //     this.$toast.clear()
            // })
        },
        ellipsAddress(address){
            return address.slice(0,12)+'...'+address.slice(address.length-12,address.length)
        }
    }
}
</script>
<style scoped lang="scss">
.van-cell{
    display: flex;
    align-items: center;
    
}
.assets-container{
    .hot-assets{
        line-height: 50px;
        padding: 0 15px;
        font-size: 14px;
        .hot-title{
            display: flex;
            justify-content: space-between;
            span:nth-child(2){
                color: #2364bc;
                display: flex;
                align-items: center;
                .ico{
                    font-size: 16px;
                }
                    
            
            }
        }
    }
    .hot-module{
        height: 56px;
        padding: 5px 0;
        display: flex;
        align-items: center;
        .hot-img{
            width: 44px;
            height: 44px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .hot-info{
            height: 100%;

            span{
                display: block;
                width:260px;
                line-height: 28px;
                padding: 0 10px;
                box-sizing: border-box;
            }

        }
        .hot-state{
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
    }
    .unsearched{
        font-size: 16px;
        color: #c9c9c9;
        margin-top: 20px;
        text-align: center;
    }
}
</style>