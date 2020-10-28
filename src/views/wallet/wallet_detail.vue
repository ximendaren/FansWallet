<template>
    <div class="container-dapp">
        <Pageheader />
        <div class="t-content">
        <van-pull-refresh v-model="isLoading" @refresh="refresh()" :disabled="refresh_state">
            <div class="tokenEcharts-box" @touchstart="refresh_state = false">
                <p>总金额({{walletInfo.walletType||walletInfo.tokenSymbol}})</p>
                <p> {{walletInfo.totalAccount}}</p> 
                <p>≈ ${{walletInfo.totalUsd }}</p>
            </div>      
            <van-tabs  color="#2364bc" v-model="activeType" :animated="true" :swipeable="true">
                <van-tab v-for="(title,active) in tokenState" :key="active" :title="title" color="#2364bc">
                    <div class="token-box" @scroll="scroll" >
                    
                        <div class="token-module" v-for="(item,index) in tokenTabs(transactionData,active)" :key="index" @click="viewTransferInfo(item)">
                            <div class="hot-module van-hairline--bottom">
                                <div class="hot-img">
                                    <img :src="imgState(item)" alt="">
                                </div>
                                <div class="hot-info">
                                    <span>{{ public_js.ellipsAddress(item.fromAddress.toLowerCase()==walletInfo.address.toLowerCase()?item.toAddress:item.fromAddress,6) }}</span>
                                    <span style="color:#999">{{public_js.transformationTime(item.timeStamp*1000)}}</span>
                                    <span style="margin-top:5px" v-if="item.confirmations<12 && item.fromAddress.toLowerCase()==walletInfo.address.toLowerCase()">
                                        <van-progress
                                        :pivot-text="item.status==-1?'打包中':item.confirmations.toString()"
                                        color="#2364bc"
                                        :percentage="(item.confirmations ) /12*100"
                                        />
                                    </span> 
                                </div>
                                <div class="hot-state" :style="{color:item.fromAddress.toLowerCase()==walletInfo.address.toLowerCase()?'red':'#09bb07'}"  >
                                    {{item.fromAddress.toLowerCase()==walletInfo.address.toLowerCase()?item.value==0?0:'-'+item.value:'+'+item.value}}
                                </div>
                            </div>
                        </div>

                    </div>    
                </van-tab>
            </van-tabs>
        </van-pull-refresh>
        </div>

        <div class="t-footer van-hairline--top">
            <van-button type="info" class="footer-btn" style="background:#07c160" @click="$router.push({path:'/wallet_collection',query:{walletInfo:walletInfo}})">收款</van-button>
            <van-button type="info" class="footer-btn" @click="transfer">转账</van-button>
        </div>
       

    </div>
</template>
<script>
import {get_transactionList, get_walletBalance, get_newTransactionState, get_transferReceipt} from '@/api/wallet'
import Pageheader from "@/components/pageheader";
export default {
    components: {
        Pageheader,
    },
    data() {
        return {
            tokenState:["全部","转出","转入","失败"],
            walletInfo:{},
            transactionData:[],
            isLoading: false,
            activeType:0,
            scrollTop:0,
            tokenBalance:{},
            transferInfo:{},
            timer:'',
            refresh_state:false,
            routerBack:false,
        }
    },
    created(){    

    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            
            if(from.name == 'wallet'){               
                vm.walletInfo = JSON.parse(vm.$route.query.walletInfo); 
                vm.$store.commit('walletInfo',vm.walletInfo)
                vm.transactionList()   //交易纪录
                vm.walletBalance()   //获取金额
                vm.routerBack = false
                vm.transactionData = [];
                vm.tokenBalance = {}
            }else if(from.name == 'wallet_transfer'){
                if(vm.$route.query.isTransfer){
                    vm.routerBack = vm.$route.query.isTransfer
                    vm.walletInfo = vm.$store.state.walletInfo
                    vm.transactionList()
                    vm.walletBalance()
                }
            }
        })
    },
    // activated(){
        

    // },
    // deactivated(){  


    // },

    watch:{
        scrollTop(num){
            if(num > 0){
                this.refresh_state = true
            }else{
                this.refresh_state = false
            }
        }
    },
    methods:{
        transactionList(load){   //获取交易纪录
        return
            this.transactionData = []
            
            let params = {
                TokenAddress:this.walletInfo.tokenAddress,
                Address:this.walletInfo.address,
                PageId:1,
                PageSize:100
            }
            if(!load){
                this.$toast.loading({
                    duration: 0,
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner'
                });
            }
            get_transactionList(params).then(res => {
                
                if(this.isLoading){
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }
                if(res.code === 0){
                        // 是否再转账中  并且 有交易hash
                    let transferList=[]
                    if(window.plus){
                        let plusTransferList =plus.storage.getItem("transferList");
                        if(plusTransferList){
                            transferList = JSON.parse(plusTransferList);
                        }
                    }else{
                        let localTransferList=localStorage.getItem('transferList')
                        if(localTransferList){
                            transferList = JSON.parse(localTransferList);
                        }
                    }
                    if(transferList && transferList.length !== 0 ){
                        if(transferList.filter(n=>n.tokenAddress.toLowerCase()==this.walletInfo.tokenAddress.toLowerCase()).length>0){
                            // this.loadingData = res.data
                            //渲染列表数据
                            transferList.filter(n=>n.tokenAddress.toLowerCase()==this.walletInfo.tokenAddress.toLowerCase()).forEach(txInfo=>{
                              
                                if(!(res.data.some(n => n.transactionHash === txInfo.transactionHash))){
                                    txInfo.blockNumber='';
                                    txInfo.blockHash='';
                                    txInfo.gasUsed='';
                                    res.data.unshift(txInfo)
                         
                                }else{
                                    let nowTransfer= res.data.find(n=>n.transactionHash==txInfo.transactionHash)
                                    if(nowTransfer.confirmations>txInfo.confirmations){
                                        nowTransfer.confirmations=txInfo.confirmations; 
                                        nowTransfer.status= txInfo.status;
                                    }else{
                                        txInfo.confirmations = nowTransfer.confirmations;
                                        txInfo.status = nowTransfer.status
                                    }
                                }
                            })
                            console.log(   'time',this.timer)
                            if(!this.timer){
                   
                                this.transferState(transferList)
                            }
                        }
                    }
                    this.transactionData = res.data
                    this.$toast.clear();
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear()
                this.$toast('网络异常')
            })
        },
        transferState(transferList){  //转账打包数据
            this.timer = setInterval(() => {  
                // transferList.filter(n=>n.tokenAddress.toLowerCase()==this.walletInfo.tokenAddress.toLowerCase())
                transferList.forEach(transferInfo => {
                    get_newTransactionState({TransactionHash:transferInfo.transactionHash}).then(res => {
                        if(res.code === 0){
                            let data = res.data
                            let nowTransfer= this.transactionData.find(n=>n.transactionHash==transferInfo.transactionHash)
                            // console.log("---",this.transactionData);
                            
                            if(nowTransfer){
                                nowTransfer.confirmations=data.confirmations; 
                                nowTransfer.status= data.status;
                                if(data.confirmations>12 ){
                                    if(window.plus){
                                        let nowTransferList= JSON.parse(plus.storage.getItem("transferList"));
                                        let savetransferList=  nowTransferList.filter(n=>n.transactionHash!==transferInfo.transactionHash)
                                        if(savetransferList.length==0){
                                            plus.storage.setItem("transferList",'');
                                            clearInterval(this.timer)
                                            this.timer = ''
                                        }else{
                                            plus.storage.setItem("transferList",JSON.stringify(savetransferList));
                                        }
                                    }else{
                                        let nowTransferList=  JSON.parse(localStorage.getItem('transferList'));
                                        let savetransferList=  nowTransferList.filter(n=>n.transactionHash!==transferInfo.transactionHash)
                                        if(savetransferList.length==0){
                                            localStorage.setItem('transferList','');
                                            clearInterval(this.timer)
                                            this.timer = ''
                                        }else{
                                            localStorage.setItem('transferList',JSON.stringify(savetransferList));
                                        }
                                    }
                                    if(data.status==0){
                                        this.$toast('交易失败') 
                                    }else{
                                        let params = {
                                            TransactionHash:nowTransfer.transactionHash
                                        }
                                        get_transferReceipt(params).then(res=>{
                                            this.$toast.clear();
                                            if(res.code===0){
                                                let transferReceipt = res.data;
                                                nowTransfer.blockNumber=transferReceipt.blockNumber;
                                                nowTransfer.blockHash=transferReceipt.blockHash;
                                                nowTransfer.gas=transferReceipt.gasUsed;
                                                nowTransfer.gasPrice=transferReceipt.gasPrice;
                                                nowTransfer.confirmations=transferReceipt.confirmations;

                                            }else{
                                                this.$toast(res.messages)
                                            }
                                        }).catch(err => {

                                        })
                                    }
                                    // this.transactionList(1)
                                }else{
                                    if(window.plus){
                                        transferList = JSON.parse(plus.storage.getItem("transferList"));
                                        let nowInfo = transferList.find(n=>n.transactionHash==transferInfo.transactionHash)
                                        nowInfo.confirmations=data.confirmations; 
                                        nowInfo.status= data.status;
                                        plus.storage.setItem("transferList",JSON.stringify(transferList));
                                    }else{
                                        transferList = JSON.parse(localStorage.getItem('transferList'));
                                        let nowInfo = transferList.find(n=>n.transactionHash==transferInfo.transactionHash)
                                        nowInfo.confirmations=data.confirmations; 
                                        nowInfo.status= data.status;
                                        localStorage.setItem("transferList", JSON.stringify(transferList));
                                    }
                                }
                            }       
                        }else{
                            this.$toast(res.messages)
                        }
                    })
                })
            }, 6000);
            
        },
        moreTransfer(){   //多个转账


        },
        refresh(){    //刷新
            this.transactionList()
            this.walletBalance()
        },
        scroll(event) {
            this.scrollTop = event.target.scrollTop
        },
        imgState(item){   //导出导入图片
            if(item.confirmations<12){
                return require('@/assets/images/wallet/loading.png')
            }else if(item.fromAddress.toLowerCase()===this.walletInfo.address.toLowerCase()){
                return require('@/assets/images/wallet/export.png')
            }else if(item.fromAddress.toLowerCase()!==this.walletInfo.address.toLowerCase()){
                return require('@/assets/images/wallet/import.png')
            }
        },
        tokenTabs(transactionData,active){    //切换token状态
            if(active==0){
                return transactionData
            }else if(active==1){
                return transactionData.filter(n => n.fromAddress.toLowerCase()===this.walletInfo.address.toLowerCase() )
            }else if(active==2){
                return transactionData.filter(n => n.fromAddress.toLowerCase()!==this.walletInfo.address.toLowerCase() )
            }
        },
        walletBalance(){   //获取金额
            // let params = {
            //     TokenAddress:this.walletInfo.tokenAddress,
            //     Address:this.walletInfo.address
            // }
            // this.$toast.loading({
            //     duration: 0,
            //     message: '加载中...',
            //     forbidClick: true,
            //     loadingType: 'spinner'
            // });
            // get_walletBalance(params).then(res => {
            //      this.$toast.clear();
            //     if(res.code === 0){
                 
            //         this.tokenBalance = res.data
            //     }else{
            //         this.$toast(res.messages)
            //     }
            // }).catch(err => {
            //      this.$toast.clear();
            //     this.$toast('网络异常')
            // })
        },
        transfer(){   // 转账
            this.$router.push({path:'/wallet_transfer',query:{walletInfo:JSON.stringify(this.walletInfo)}})
        },
        viewTransferInfo(item){
            item.tokenAddress = this.walletInfo.tokenAddress;
            item.address = this.walletInfo.address
            this.$router.push({path:'/transaction_detail',query:{transactionInfo:JSON.stringify(item)}})
        }

    },
}
</script>
<style scoped lang="scss">
.container-dapp{
    .header{
        height: 50px;
        border-bottom: 1px #eee solid;  
        background: #fff;     
        .back{
            line-height: 50px;
            font-size: 22px;
            margin-left: 15px;
            width: 30px;
        }
    }
    .t-content{
        
        .tokenEcharts-box{
            height: 140px;
            background: #eee;
            font-size: 18px;
            text-align: center;
            padding-top: 20px;
            p:nth-child(2){
                font-size: 30px;
                margin: 10px 0 5px;
                font-weight: 600;
            }
            p:nth-child(3){
                font-size: 16px;
            }
        }
        .token-box{
            height: calc(100vh-305px);
            overflow-y: scroll;
            .hot-module{
                min-height: 56px;
                padding: 5px 10px;
                display: flex;
                align-items: center;
                position: relative;
                .hot-img{
                    width: 30px;
                    height: 30px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .hot-info{
                    height: 100%;
                    padding: 8px 0;
                    box-sizing: border-box;
                    span{
                        display: block;
                        width:270px;
                        line-height: 20px;
                        padding: 0px 10px;
                        box-sizing: border-box;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                        overflow:hidden; //超出的文本隐藏
                        text-overflow:ellipsis; //溢出用省略号显示
                        white-space:nowrap; //溢出不换行

                    }
                }
                .hot-state{
                    position: absolute;
                    top: 10px;
                    right: 12px;
                    width: 190px;
                    line-height: 40px;
                    text-align: right;
                    font-size: 18px;
                    overflow:hidden; //超出的文本隐藏
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                    display: inline-block;
                }
            }
        }

    }
    .t-footer{
        height: 50px;
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        .footer-btn{
            width: 48%;
            border-radius: 6px;
            background: #2364bc;
            border: 0;
        }
    }

}
</style>