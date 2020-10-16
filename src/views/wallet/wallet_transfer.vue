<template>
    <div class="container-dapp">
        <pageheader :goBack="go_Back"></pageheader>
        <!-- <van-cell :icon="require('@/assets/images/token_logo/ETH.png')" is-link @click="switchToken" class="token-ico" >
            <template slot="title">
                <span class="custom-title">{{transferToken.tokenSymbol}}</span>&emsp;
                <span style="color:#c9c9c9">{{transferToken.tokenName}}</span>
            </template>
        </van-cell> -->

        <div class="amount">
            <p class="amount-top">
                <span>{{walletInfo.walletType}}</span>
                <span style="color:#2364bc" @click="transfer.price=transferToken.totalAccount">余额 {{parseFloat(walletInfo.totalAccount)}}</span>
            </p>
            <van-field v-model="transfer.price" size="large" placeholder="请输入金额" class="price-size" />
        </div>
        <div class="amount address">
            <p class="amount-top">
                <span>收款地址</span>
                <van-icon name="column" class="book" @click="address_show=true" />
            </p>
            <van-field v-model="transfer.address" size="large" placeholder="请输入收款地址" class="address-txt" right-icon="scan" @click-right-icon="$router.push({name:'scan'})" />
            <van-field v-model="transfer.remark" label="备注" placeholder="(选填)" label-width="35px" />
        </div>
        <div class="minersFee-box">
            <span>矿工费</span>
            <span @click="is_seeFee=!is_seeFee"> {{ formatNum(etherValue) }} ether ≈ ￥{{turnCNY(etherValue).toFixed(2) }}
                <van-icon :name="!is_seeFee?'arrow':'arrow-down'" />
            </span>
            
        </div>
        <van-button  v-if="showBtn" type="primary" :disabled="!transfer.price || !transfer.address" class="nextBtn" @click="transfer_next()">下一步</van-button>
        
        <div class="set-fee " v-show="is_seeFee">
            <div class="fee-box " :class="{'animate':senior_checked}">
                <div class="change-fee ">
                    <div class="slider-box">
                        <span>慢</span>
                        <span><van-slider v-model="transfer.gasPrice" :min="1" :max="gasPriceMax" :step="0.01" class="slider" /></span>
                        <span>快</span>
                    </div>
                    <p class="gwei"> {{transfer.gasPrice.toFixed(2)}} gwei</p>

                </div>
                <div class="change-fee2">
                    <van-field v-model="transfer.custom_gasPrice" type="number" placeholder="自定义Gas Price" @blur="gasPriceBlur">
                        <van-button slot="button" size="small" style="border:0;color:#949494;text-align:right" >gwei</van-button>
                    </van-field>
                    <van-field v-model="transfer.gas" placeholder="自定义Gas" class="van-hairline--bottom" >
                        <van-button slot="button" size="small" style="border:0;color:#949494;text-align:right" >gas</van-button>
                    </van-field>
                </div>
            </div>

        </div>
        <p class="senior" v-show="is_seeFee">
            <span>高级模式</span>&emsp;
            <van-switch v-model="senior_checked" class="checked" />&emsp;
        </p>

        <!-- 切换Token -->
        <van-action-sheet v-model="isSwitchToken" title="选择Token" round>
            <div class="switch-token">
                <div class="hot-module van-hairline--bottom" :style="{background:item.tokenId==transferToken.tokenId?'#ebedf0':'#fff' }"
                v-for="item in tokenList.walletCurrencyModels" :key="item.tokenId" @click="sureToken(item)">
                    <div class="hot-img">
                        <img :src="require('@/assets/images/token_logo/'+item.tokenType+'.png')" alt="">
                    </div>
                    <div class="hot-info">
                        <span>{{item.tokenSymbol}}</span>
                        <span style="color:#c9c9c9">{{item.tokenName}}</span>
                    </div>
                    <div class="hot-state">
                        {{  parseFloat(Number(item.quantity).toFixed(5))  }}
                    </div>
                </div>
            </div>
        </van-action-sheet>        

        <!-- 地址本 -->
        <van-popup
            v-model="address_show"
            position="right"
            :style="{ height: '100%',width:'100%' }"
        >
            <address-book :current_address="transferToken.tokenAddress" @transfer_address="transfer_address"></address-book>
        </van-popup>
        <!-- 转账支付 -->
        <van-action-sheet v-model="transferPay_show" title="支付详情" :round="true" class="transferPay-set">
            <div class="transferPay-box">
                <div class="t-price">
                    <p><span> {{transfer.price}} </span> {{transferToken.tokenSymbol}}</p>
                </div>
                <div class="payInfo van-hairline--bottom">
                    <span>支付信息</span>
                    <span>{{transferToken.tokenSymbol}} 转账</span>
                </div>
                <div class="payInfo van-hairline--bottom">
                    <span>收款地址</span>
                    <span> {{transfer.address}} </span>
                </div>
                <div class="payInfo van-hairline--bottom">
                    <span>付款地址</span>
                    <span> {{walletInfo.address}} </span>
                </div>
                <div class="payInfo">
                    <span>矿工费用</span>
                    <span>{{ formatNum(etherValue) }} ether <br>
                        <font>=Gas ({{transfer.gas}})*Gas Price({{senior_checked?transfer.custom_gasPrice:transfer.gasPrice}} gwei)</font>
                    </span>
                </div>
                <van-button type="info" class="nextBtn" @click="pay_show=true;$nextTick(() => {$refs['passwordBox'].focus()})">确认转账</van-button>
            </div>
        </van-action-sheet>

        <!-- 转账支付 -->
        <van-dialog
        v-model="pay_show"
        title="请输入密码"
        show-cancel-button
        @confirm="sure_pay"
        @cancel="transfer.wallet_password=''"
        >
           <div class="pay-box">
               <van-field v-model="transfer.wallet_password" type="password" placeholder="请输入钱包密码" class="pay-input" ref="passwordBox" />
           </div>
        </van-dialog>

    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import addressBook from '@/components/address_book'
import {transaction, get_ethInfo, get_ethMinerInfo} from '@/api/wallet' 
import CryptoJS from 'crypto-js'
import {ethers, providers } from 'ethers';
export default {
    components:{pageheader, addressBook},
    data() {
        return {
            clientHeight:document.documentElement.clientHeight,
            showBtn: true,
            transferToken:{},   //需要转账的token
            gasPriceMax:100,
            transfer:{
                price:'',
                gasPrice:5,
                gas:51000,
                address:'',
                custom_gasPrice:0, 
                wallet_password:'',
            },
            senior_checked:false,
            address_show:false,
            is_seeFee:false,
            transferPay_show:false,
          
            walletInfo:{},
            isSwitchToken:false,
            tokenList:[],
            pay_show:false,
            gasData:{},
            go_Back:''
        }
    },

    created(){

        // if(window.plus){
        //     this.walletInfo =  JSON.parse(plus.storage.getItem('tokenList'))
        // }else{
        //     this.walletInfo =  JSON.parse(localStorage.getItem('tokenList'))
        // }

        // if(this.$route.query.walletInfo){
        //     let index = JSON.parse(this.$route.query.walletInfo).tokenIndex
        //     this.transferToken = this.walletInfo.walletCurrencyModels[index]
        //     this.ethMinerInfo() //获取EHT矿工数据
        //     return
        // }
        if(this.$route.query.qrAddress){   //扫码信息          
            if( this.$route.query.qrAddress.substr(0,1) === '{'){
                let qrData = JSON.parse(this.$route.query.qrAddress)
                this.transfer.address = qrData.address
                this.transfer.price = qrData.price
                
            }else{
                this.transfer.address = this.$route.query.qrAddress
            }           
            this.walletInfo = this.public_js.GetStorage('walletInfo').find(n => n.isMain)
            this.go_Back = 'wallet'
        }else{
            this.walletInfo = JSON.parse(this.$route.query.walletInfo)
            console.log(this.walletInfo)
        }
       
        // this.ethMinerInfo() //获取EHT矿工数据
    },
    mounted(){
        window.onresize= ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    },
    beforeDestroy(){
        if(this.go_Back){
            this.$router.push('wallet')
        }
    },
    watch:{
        senior_checked(state){
            if(state){
                this.transfer.custom_gasPrice = Number( this.transfer.gasPrice.toFixed(2) )
            }else{
                this.transfer.gasPrice = Number(this.transfer.custom_gasPrice)
            }
        },
        // transferToken(val){   console.log(val)
        //     if(val.tokenSymbol == 'ETH'){
        //         this.transfer.gas = 21000
        //     }else{
        //         this.transfer.gas = 51000
        //     }
        // }
    },
    computed:{
        etherValue(){   //矿工费
           
            return  this.transfer.gasPrice * this.transfer.gas /1000000000
          
        }
    },
    methods:{

        sure_pay(){    //确认支付
            // const password =CryptoJS.MD5(this.transfer.wallet_password).toString().toLocaleUpperCase() 
            if(this.walletInfo.walletType == 'ETH'){
                const provider = new providers.JsonRpcProvider("https://rinkeby.infura.io/v3/107f905703814dbd99b749a176eb9ede"); //链接服务器
                var wallet = new ethers.Wallet(this.walletInfo.privateKey,provider);
                console.log(wallet);
                var signTransaction={
                to: this.transfer.address,
                from: this.walletInfo.address,
                nonce: 42,
                gasLimit: 21000,//21000步
                gasPrice: 1000000000, //1GWei=1000000000Wei
                data: null,
                value: this.transfer.price,
                chainId: 4
                }
                wallet.signTransaction(signTransaction).then(res=>{
                console.log(res);
                });
                console.log(signTransaction)
            }
            
            if(this.walletInfo.walletType == 'BTC'){
                const bitcoin = require('bitcoinjs-lib');
                let alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');    console.log('alice',alice)
                // L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy为Alice的私钥
                //  let lbtcVersion = 65282;
                let txb = new bitcoin.TransactionBuilder(bitcoin.networks['bitcoin']);
                //  txb.setVersion(Number(setVersion));
                txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); 
                // Alice's previous transaction output, has 15000 satoshis
                txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000);    // (in)15000 - (out)12000 = (fee)3000, this is the miner fee
                txb.sign(0, alice)
                let signature = txb.build().toHex()
                console.log(signature)
            }
        return
            let params = {
                ToAddress:this.transfer.address,
                Amount:this.transfer.price,
                TokenId:this.transferToken.tokenId,
                GasPrice:this.senior_checked?this.transfer.custom_gasPrice:this.transfer.gasPrice,
                Gas:this.transfer.gas,
                Data:this.transfer.remark,
                WalletPassword:this.transfer.wallet_password
            }
            this.$toast.loading({
                duration: 0,
                message: '交易中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            transaction(params).then(res => {
                this.transfer.wallet_password=''
                this.$toast.clear();
                if(res.code === 0){
                    this.$toast.success('交易成功');  
                    let transferInfo = {
                        timeStamp:res.data.timestamp,
                        transactionHash:res.data.transactionHash,
                        toAddress:this.transfer.address,
                        tokenAddress:this.transferToken.tokenAddress,   
                        value:this.transfer.price,
                        fromAddress:this.walletInfo.address,
                        confirmations:0,
                        status:-1,
                        gasPrice:this.senior_checked?this.transfer.custom_gasPrice:this.transfer.gasPrice
                    }
                   let transferListJSON = [];
                    if(window.plus){
                        let transferList = plus.storage.getItem("transferList");
                        if(transferList){
                          transferListJSON = JSON.parse(transferList)
                          transferListJSON.push(transferInfo)
                        }else{
                            transferListJSON=[transferInfo]
                        }
                        plus.storage.setItem("transferList",JSON.stringify(transferListJSON));
                    }else{
                        let transferList= localStorage.getItem("transferList");
                            console.log(    '---',transferList)
                        if(transferList){
                          transferListJSON = JSON.parse(transferList)
                          transferListJSON.push(transferInfo)
                        }else{
                            transferListJSON=[transferInfo]
                        }
                        localStorage.setItem("transferList", JSON.stringify(transferListJSON));
                    } 
                    this.$router.push({path:'/wallet_detail',query:{isTransfer:true}})
                    
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.transfer.wallet_password=''
                this.$toast('网络异常')
                this.$toast.clear();
            })
        },
        gasPriceBlur(){
            if(this.transfer.custom_gasPrice>100){
                this.$toast('gas price太高，建议小于100gwei')
                this.gasPriceMax = Number(this.transfer.custom_gasPrice)
            }else{
                this.gasPriceMax = 100
                this.transfer.gasPrice = Number(this.transfer.custom_gasPrice)
            }
        },
        switchToken(){  //选择Token
            this.isSwitchToken = true;
            if(window.plus){
                this.tokenList = JSON.parse(plus.storage.getItem('tokenList'))
            }else{
                this.tokenList = JSON.parse(localStorage.getItem('tokenList'))
                console.log(this.tokenList)
            }

        },
        sureToken(item){
            this.transferToken=item;
            this.isSwitchToken=false;
            this.ethMinerInfo()
        },
        formatNum(num){    //ETH 数量
            var m = Math.pow(10, 10); 
            return parseInt(num * m, 10) / m;
        },
        turnCNY(price){   //转换成CNY
            return price * (this.gasData.priceCny || 0)
        },
        transfer_address(item){
            this.address_show = false;
            if(item){
                this.transfer.address = item
            }
            
        },
        transfer_next(){   
            if(!(/((^[1-9]\d*)|^0)(\.\d{0,20}){0,1}$/.test(this.transfer.price))){
                this.$notify({ type: 'danger', message: '输入的金额不正确' });
                return
            }else if(Number(this.transfer.price) > Number(this.transferToken.quantity)){
                this.$notify({ type: 'danger', message: '余额不足' });
                return
            }
            // else if(this.transfer.address.startsWith('0x')&&this.transfer.address.length!==42 || !this.transfer.address.startsWith('0x')&&this.transfer.address.length!==40   ){
            //     this.$notify({ type: 'danger', message: '请输入正确收款地址' });
            //     return
            // }
            else{
                this.transferPay_show=true;
            }

        },
        ethMinerInfo(){    //获取矿工数据
        console.log(   '0-0' ,this.transferToken)
            let params = {
                ContractAddress:this.transferToken.tokenAddress
            }
            this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中'
            });
            get_ethMinerInfo(params).then(res => {
                this.$toast.clear();
                if(res.code === 0){
                    this.gasData = res.data
                    this.transfer.gas = this.gasData.avgGas
                    this.transfer.gasPrice = this.gasData.gasPriceSafeLow +4
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })
        }
    },
}
</script>
<style scoped lang="scss">
/deep/.van-cell{
    line-height: 26px;    
}
/deep/ .van-field__control{
    line-height: 26px;   
}
.van-icon__image{
    width: 24px;
    height: 24px;
}
.container-dapp{
    height: 100vh;
    background: #eee;
    font-size: 14px;

    .amount{
        .address-txt{
            font-size: 12px;
        }
        .amount-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            height: 40px;
            background: #fff;
        }
        .price-size{
            font-size: 18px;
        }
    }
    .address{
        margin-top: 10px;
        .book{
            font-size: 18px;
        }
    }
    .minersFee-box{
        min-height: 50px;
        margin-top: 10px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        
        span:nth-child(2){
            display: flex;
            align-items: center; 
            color: #2364bc;
        }
    }
    .set-fee{        
        width: 375px;
        overflow: hidden;
        height: 120px;
        
    }
    .fee-box{
        height: 120px;
        width: 750px;
        transition: all .3s;
    }
    .animate{
        transform: translate(-50%);
        transition: all .3s;
    }
    .change-fee2{
        width: 375px;
        float: left;
        height: 120px;
        background: #fff;
    }

    .change-fee{
        width: 375px;
        float: left;
        overflow: hidden;
        height: 120px;
        background: #fff;
        position: relative;
        .slider-box{
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        
            .slider{
                width: 260px;
                margin: auto;
            }
        }
        .gwei{
            line-height: 20px;
            text-align: center;
            color: #666;
        }

    }
    .senior{
        width: 100vw;
        height: 40px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span{
            color: #767677;
        }
        .checked{
            font-size: 18px !important;
        }
    }
    .nextBtn{
        position: fixed;
        width: 96%;
        background: #2364bc;
        border: 0;
        bottom: 6px;
        left: 50%;
        transform: translate(-50%);
        border-radius: 6px;
    }
    .transferPay-set{
        height: 400px;
        border-radius: 15px 15px 0 0;
    }
    
    .switch-token{
        overflow-y: auto;
        height: 300px;
        // border-radius: 10px;
        .hot-module{
            height: 56px;
            padding: 5px 10px;
            display: flex;
            align-items: center;
            .hot-img{
                width: 40px;
                height: 40px;
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
                    width:120px;
                    line-height: 20px;
                    padding: 0px 10px;
                    box-sizing: border-box;
                    overflow:hidden; //超出的文本隐藏
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                }
                span:nth-child(2){
                    font-size: 12px;
                }
            }
            .hot-state{
                min-width: 190px;
                line-height: 40px;
                text-align: right;
                font-size: 20px;
                // overflow:hidden; //超出的文本隐藏
                // text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
            }
        }
    }
    .transferPay-box{
        padding: 0 20px;
        .t-price{
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            span{
                font-size: 30px;
            }
        }
        .payInfo{
            height: 50px;
            display: flex;
            align-items: center;
            span:nth-child(1){
                color: #999;
                min-width: 60px;
                display: block;
                
            }
            span:nth-child(2){
                margin-left: 20px;  
                font-size: 13px;              
                word-wrap:break-word;
                word-break:break-all;
                overflow: hidden;
                font{
                    color: #999;
                    font-size: 12px;
                }
            }
        }

    }
    .pay-box{
        height: 70px;
        padding: 0 20px;
        .pay-input{
            border: 1px solid #999;
            margin-top: 15px;
            border-radius: 7px;
        }
    }
}
</style>