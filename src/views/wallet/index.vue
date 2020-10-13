<template>
    <div class="container-nav">
        <div class="header van-hairline--bottom">
            <van-icon name="balance-pay" class="header-ico" @click="$router.push({path:'walletmanage',query:{switch:1}})" />
            <span>钱包</span>
            <van-icon name="scan" class="header-ico" @click="$router.push({name:'scan'})" />
        </div>
        
        <van-pull-refresh v-model="isLoading" @refresh="walletData()" :disabled="scrollTop>0">
        <div class="bg-box">
            <div class="wallet-box">
                <div class="info-box">
                    <div class="info-left">
                        <p class="wallet-name">{{walletInfo?walletInfo.walletName:''}}
                            <span v-if="isHideAmount" @click="isHideAmount=!isHideAmount"><van-icon name="eye-o" /></span>
                            <span v-else @click="isHideAmount=!isHideAmount"><van-icon name="closed-eye" /></span>
                            
                        </p>
                        <p class="address" @click="showQr">
                            <span>{{walletInfo.address? public_js.ellipsAddress(walletInfo.address) :''}}</span>&nbsp;
                            <van-icon name="qr" />
                        </p>
                    </div>
                    <div class="info-right">
                        <p class="more"><van-icon name="ellipsis" @click="walletDetail" /></p>
                        <p v-if="isHideAmount" class="wallet-price"><b> {{walletInfo?parseFloat(walletInfo.totalAccount):0}}</b></p>
                        <p v-else class="wallet-price"><b>∗∗∗∗</b></p>
                        <p v-if="isHideAmount" class="conversion-price">≈${{walletInfo?Number(walletInfo.totalUsd).toFixed(2)!=0?Number(walletInfo.totalUsd).toFixed(2):0:0}} </p>
                        <p v-else class="conversion-price">≈$<span class="hide-p">∗∗∗∗</span></p>
                    </div>    
                </div>
                <div class="operation">
                    <span @click="$router.push({path:'/wallet_collection',query:{walletInfo:walletInfo}})"><van-icon :name="require('@/assets/images/wallet/receivables.png')" size="20" />&nbsp;收款</span>
                    <span @click="goTransfer"><van-icon :name="require('@/assets/images/wallet/transfer.png')" size="20" />&nbsp;转账</span>
                </div>
            </div>
            <p class="assets van-hairline--bottom">
                <span><b>资产</b></span>
                <van-icon name="add-o" class="add-ico" @click="$router.push({name:'add_assets'})" />
            </p>



            <div class="token-list" @scroll="scroll">
                <div class="token-box" v-for="(item,index) in walletInfo?walletInfo.assetsToken:''" :key="index"  @click="select_assets(item,index)">
                    <van-swipe-cell :disabled="item.tokenProtocol=='Main'">
                        <van-cell center>
                            <template slot="title" center> 
                                <div class="left-logo"> 
                                    <div class="left-img">
                                        <img :src='require("@/assets/images/token_logo/"+item.walletType+ ".png")'>
                                    </div>
                                    <span><b>{{item.walletType}}</b></span>
                                </div>
                            </template>
                            <template slot="default">
                                <div class="right-price"><b> {{  item?parseFloat(item.totalAccount):0 }}</b><br> ${{ Number(item.totalUsd).toFixed(2)}}</div>
                            </template>
                        </van-cell>

                        <template slot="right">
                            <van-button class="del-token" square type="danger" text="删除"  @click="delToken(item,index)" />
                        </template>
                    </van-swipe-cell>

                    
                </div>
            </div>



        </div>
        </van-pull-refresh>

        <!-- 地址二维码 -->
        <van-popup v-model="is_showQr" class="qr-box">
            <div class="qr-header">
                <p class="name">{{walletInfo.walletName}}</p>
                <div class="address" v-clipboard:copy="walletInfo.address" v-clipboard:success.stop="onCopy">
                    <span>{{walletInfo.address? public_js.ellipsAddress(walletInfo.address):'' }}</span>
                    <img src="@/assets/images/other/copy.png" alt="">
                </div>
            </div>
            <div class="qr-content" ref="content">
                <div class="qr-text">收款地址</div>
                <div class="qrcode" ref="qrCodeUrl" :style="{'margin-top':qrcodeHeight}"></div>
            </div>
        </van-popup>


    </div>
</template>
<script>
import QRCode from "qrcodejs2";
import {get_walletData, set_default, set_walletTokens} from '@/api/mycenter/wallet'
import { log } from 'util';
export default {
    name:'wallet',
    data() {
        return {
            walletInfo:{},
            isHideAmount:true,
            is_showQr:false,
            changeQr:true,
            qrcodeHeight:0,
            isLoading: false,
            scrollTop:0,
            update_show:false,  //更新弹框
            versionData:'',   //更新返回数据
            isForce:false,   //是否强制更新

        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {                 
            if(from.name == 'walletmanage'&&vm.$route.params.isDefault){   
                vm.walletInfo = {}            
                vm.walletData()
            }
        })
    },
    created(){
        // this.isUpdate()
        
        // if(this.$route.query.data){    //选择完默认钱包
        //     this.walletInfo = JSON.parse(this.$route.query.data)
        // }else{
        //     if(window.plus){
        //        this.walletInfo =  JSON.parse(plus.storage.getItem('tokenList'))
        //     }else{
        //        this.walletInfo =  JSON.parse(localStorage.getItem('tokenList'))
        //     }

        // }
    },
    activated() {  
        this.walletInfo = this.public_js.GetStorage('walletInfo');
        this.walletInfo = this.walletInfo.find(n=> n.isMain ==1)
        console.log(this.walletInfo)
        // if(this.$route.query.data){
        //     this.walletInfo = JSON.parse(this.$route.query.data)
        // }else{

        // }
    },
    methods:{
        scroll(event){
            this.scrollTop = event.target.scrollTop
        },
        goTransfer(){   //转账
            let item = this.walletInfo
            item.tokenIndex = 0;
            item.address = this.walletInfo.address;
            this.$router.push({path:'/wallet_transfer',query:{walletInfo:JSON.stringify(item)}})    

            // this.walletInfo.walletCurrencyModels[0].address = this.walletInfo.address
            // this.walletInfo.walletCurrencyModels[0].tokenIndex = 0
            // this.$router.push({path:'/wallet_transfer'})
        },
        delToken(item,index){   //删除当前资产
            let params = {
                tokenId:item.tokenId,
                IsAdd:0
            }
            set_walletTokens(params).then(res => {
                if(res.code === 0){
                    this.walletInfo.walletCurrencyModels.splice(index,1)
                    this.$toast('移除成功')
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear()
                this.$toast('网络异常')
            })
        },
        onRefresh() {      
            this.$toast('刷新成功');
            this.isLoading = false;
        },
        select_assets(item,index){
            item.tokenIndex = index;
            item.address = this.walletInfo.address;
            this.$router.push({path:'/wallet_detail',query:{walletInfo:JSON.stringify(item)}})
        },
        walletData(){    //获取钱包数据
        this.isLoading = false;
        return
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
                mask:true
            });

            get_walletData().then(res => {
                this.$toast.clear();
                if(res.code === 0){
                    this.walletInfo = res.data
                    this.$store.commit('wallet_default',this.walletInfo)  //默认钱包
                    if(window.plus){
                        plus.storage.setItem('tokenList',JSON.stringify(res.data))
                    }else{
                        localStorage.setItem('tokenList',JSON.stringify(res.data))
                    }
                    if(this.isLoading){
                        this.$toast('刷新成功');
                    }
                    this.isLoading = false;
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear();
                this.$toast('网络异常')
            })
        },
        showQr(){
            this.is_showQr=true;            
            if(this.changeQr){
                setTimeout(()=>{
                    this.qrcodeHeight = (this.$refs.content.offsetHeight -160) /2 +'px'
                    this.creatQrCode()
                    
                })
            }

        },
        walletDetail(){
            this.$router.push({name:'walletdetail',query:{data:JSON.stringify(this.walletInfo)}})
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
        creatQrCode() {
            
            const qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.walletInfo.address,
                width: 160,
                height: 160,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            this.changeQr = false
        },
        //下载安装
        installApk(url,forcedUpdate) {
        // plus.nativeUI.showWaiting("正在更新软件，请稍后...");
        this.$toast.loading({
            message: '正在更新，\n请稍后...',
            forbidClick: true,
            duration: 0,
        });   
        var dtask = plus.downloader.createDownload(url, {}, (d, status)=> {
            if(status == 200) {
            //  plus.nativeUI.closeWaiting(); 
            this.$toast.clear();
            var path = d.filename;
            console.log(d.filename);
            
            plus.runtime.install(path,{force:false},()=>{
                    this.$toast.clear();
                    plus.runtime.restart();
                }
                ,function(e){
                    this.$toast.clear();
                    plus.nativeUI.alert("安装wgt文件失败");
                }
            );
            
            } else {
            // plus.nativeUI.closeWaiting();
            this.$toast.clear();
            this.$dialog.confirm({
                    title: '版本更新',
                    message: '更新失败，是否重新下载'
                    }).then(() => {
                        this.installApk(url,forcedUpdate)
                    }).catch(() => {
                    //判断是否强制更新
                    if(forcedUpdate!==1){
                        plus.runtime.quit();
                    }
                    })
            }
            
        });
            dtask.start();
        },

        isUpdate(){   //检测新版本
            if(window.plus){
                this.versionData =  JSON.parse(plus.storage.getItem('version_data'))
                if(this.versionData.app_version != this.versionData.versionNo){
                this.update_show =true
                    if(this.versionData.forcedUpdate==1){
                    this.isForce = true
                    }
                } 

            }
        },



    }
}
</script>
<style scoped lang="scss">
.van-cell{
    line-height: 46px;
}
.container-nav{
    // height: calc(100vh-44px);
    height: 100%;
    .header{
        height: 50px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        span{
            font-size: 18px;
        }
        .header-ico{
           font-size: 26px;
        }
    }
    .bg-box{
        height: calc(100vh - 102px);
    }
    .wallet-box{
        width: 355px;
        height: 150px;
        background: url('../../assets/images/other/walletBg.png') 100%;
        margin: 8px auto;
        border-radius: 13px;
        color: #fff;
        font-size: 16px;
        .info-box{
            height: 100px;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            box-sizing: border-box;
            position: relative;
            p:nth-child(2){
                font-size: 12px;
            }
            .info-left{
                .wallet-name{
                    display: flex;
                    font-size: 24px;
                    width: 180px;
                    overflow:hidden; 
                    white-space: nowrap; 
                    text-overflow: ellipsis;
                    span{
                        display: flex;
                        align-items: center;
                        margin-left: 5px;
                    }
                }
                .address{
                    margin-top: 32px;
                    display: flex;
                    align-items: center;
                    height: 20px;
                    span{
                        display: inline-block;
                        // width: 160px;
                    }
                }
            }
            .info-right{
                text-align: right;
                .more{
                    font-size: 22px;
                }
            }
            .wallet-price{
                font-size: 24px !important;
                
             
                position: absolute;
                top: 45px;
                right: 10px;
            }
            .conversion-price{
                font-size: 14px;
                color: #f3efef;
                line-height: 20px;
                position: absolute;
                top: 80px;
                right: 10px;
            }
            .hide-p{
                font-size: 18px;
            }
        }
        .operation{
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                // flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 170px;
                height: 36px;
                background: rgba(255, 255, 255, 0.305);
                border-radius: 10px;
            }
        }
    }
    .assets{
        height: 36px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .add-ico{
            font-size: 22px;
        }
    }
    .token-list{
        height: calc(100vh - 290px);
        overflow-y: auto;
        .token-box{

            .left-logo{
                display: flex;
                align-items: center;
                .left-img{
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                span{
                    font-size: 16px;
                }
            }
            .right-price{
                line-height: 16px;
                b{
                    color: #000;
                    font-size: 16px;
                }
            }
            .del-token{
                height: 52px;
            }    
        

            // .title{
            //     display: flex;     
            //     align-items: center;
            //     img{
            //         width: 30px;
            //         height: 30px;
            //     }
            //     span{
            //         font-size: 16px;
            //         margin-left: 10px;
            //     }     
            // }
            .token-price{
                p:nth-child(2){
                    font-size: 14px;
                    color: #666;
                }
            font-size: 18px; 
            text-align: right;
            }

        }
    }
    .qr-box{
        width: 320px;
        height: 320px;
        border-radius: 10px;
        font-size: 16px;
        .qr-header{
            height: 80px;
            background: #2364bc;
            color: #fff;
            overflow: hidden;
            .name{
                text-align: center;
                margin-top: 10px;
            }   
            .address{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;
                height: 30px;
                padding: 0 10px;
                span{
                    // width: 300px;                   
                    font-size: 12px;                   
                }
                img{
                    width: 12px;
                    height: 12px;
                    margin-left: 3px;
                }
            }   
        }
        .qr-content{
            height: 240px;
            overflow: hidden;
            position: relative;
            .qr-text{
                position: absolute;
                top: 2px;
                left: 50%;
                transform: translate(-50%)
            }
            .qrcode{
                display: flex;
                justify-content: center;
                // margin-top: 20px;
            }
        }
    }

}
</style>