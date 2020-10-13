<template>
    <div class="transaction-container">
        <pageheader></pageheader>
        <div class="transaction-box">
            <div class="header">
                <div class="price-data">
                    <div class="state-img">
                        <img src="@/assets/images/other/transferSuccess.png" alt="">
                        
                    </div>
                    <span class="price-num"><b>{{transactionInfo.value}}</b></span>
                    <span>{{transactionInfo.tokenSymbol}}</span>
                </div>
                <div class="time">{{switchTime(transactionInfo.timeStamp*1000)}} +0800  </div>
                <div class="transaction-state"><b>{{transactionInfo.fromAddress.toLowerCase()==transactionInfo.address.toLowerCase()?'已付款' :'已收款'}}</b></div>
            </div>
            <div class="main">
                <div class="miner-fee van-hairline--bottom">
                    <p>
                        <span>矿工费用：</span>
                        <span>{{ minerFee }} ether</span>
                    </p>
                    <p class="gas">= Gas ({{transactionInfo.gas  }}) * GasPrice({{transactionInfo.gasPrice}}gwei)</p>
                </div>
                <div class="transaction-address van-hairline--bottom">
                    <span>收款地址：</span>
                    <span           
                    v-clipboard:copy="transactionInfo.toAddress"
                    v-clipboard:success="onCopy"
                    >{{public_js.ellipsAddress(transactionInfo.toAddress)}}</span>
                </div>
                <div class="transaction-address van-hairline--bottom">
                    <span>付款地址：</span>
                    <span
                    v-clipboard:copy="transactionInfo.fromAddress"
                    v-clipboard:success="onCopy"
                    >{{public_js.ellipsAddress(transactionInfo.fromAddress)}}</span>
                </div>
                <div class="transaction-address van-hairline--bottom" v-if="transactionInfo.contractAddress">
                    <span>合约地址：</span>
                    <span   
                    v-clipboard:copy="transactionInfo.contractAddress"
                    v-clipboard:success="onCopy"
                    >{{public_js.ellipsAddress(transactionInfo.contractAddress)}}</span>
                </div>
                <div class="transaction-address">
                    <span>备注：&emsp;&emsp;</span>
                    <span></span>
                </div>
                <hr style= "border:0.5px dashed #eee">
                <div class="transaction-hash">
                    <span>区块：&emsp;&emsp;</span>
                    <span
                    >{{transactionInfo.blockNumber}}</span>
                </div>
                <div class="transaction-hash">
                    <span>Nonce：&emsp;</span>
                    <span>{{transactionInfo.nonce}}</span>
                </div>
                <div class="transaction-hash">
                    <span>区块哈希：</span>
                    <span
                    v-clipboard:copy="transactionInfo.blockHash"
                    v-clipboard:success="onCopy"
                    >{{public_js.ellipsAddress(transactionInfo.blockHash,6)}}</span>
                </div>
                <div class="transaction-hash">
                    <span>交易哈希：</span>
                    <span
                    v-clipboard:copy="transactionInfo.transactionHash"
                    v-clipboard:success="onCopy"
                    >{{public_js.ellipsAddress(transactionInfo.transactionHash,6)}}</span>
                </div>
                <div class="qr-content" ref="content">
                    <div class="qrcode" ref="qrCodeUrl"></div>
                    <p @click="$router.push({path:'/queryContract',query:{url:'https://cn.etherscan.com/token/'+transactionInfo.contractAddress}})">到Etherscan查询更多详细信息>></p>
                </div>
            </div>



        </div>
    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import QRCode from "qrcodejs2";
import {get_transferReceipt} from '@/api/wallet'
export default {
    components:{pageheader},
    data(){
        return{
            
        }
    },
    created(){
        this.transactionInfo = JSON.parse(this.$route.query.transactionInfo)
        console.log(this.transactionInfo)
    },
    mounted(){
        this.creatQrCode()
    },
    computed:{
        minerFee(){
            let price = this.transactionInfo.gas * this.transactionInfo.gasPrice /1000000000;
            let m = Math.pow(10, 10); 
            return parseInt(price * m, 10) / m;
        }
    },
    methods:{
        // transferInfo(){
        //     let params = {
        //         TransactionHash:this.transactionInfo.transactionHash
        //     }
        //     this.$toast.loading({
        //         duration: 0,
        //         message: '加载中...',
        //         forbidClick: true,
        //         loadingType: 'spinner'
        //     });
        //     get_transferReceipt(params).then(res=>{
        //         this.$toast.clear();
        //         if(res.code===0){
        //             this.transactionInfo = res.data;
        //         }else{
        //             this.$toast(res.messages)
        //         }
        //     }).catch(err => {
        //         this.$toast('网络异常')
        //     })
        // },
        switchTime(time){
            let now = new Date(time);
            var year=now.getFullYear(); 
            var month=(now.getMonth()+1).toString().padStart(2,'0');; 
            var date=now.getDate().toString().padStart(2,'0');
            var hour=now.getHours().toString().padStart(2,'0');
            var minute=now.getMinutes().toString().padStart(2,'0');
            var second=now.getSeconds().toString().padStart(2,'0');
            return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second; 
        },
        creatQrCode() {   
            var qrHeight = this.$refs.qrCodeUrl.clientHeight; 
            const qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.transactionInfo.fromAddress,
                width: qrHeight,
                height: qrHeight,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
    }
}
</script>
<style scoped lang="scss">
.transaction-container{
    height: 100vh;
    background: #f4f4f4;
    .transaction-box{
        width: 350px;
        height: 550px;
        border: 1px solid #eee;
        border-radius: 10px;
        margin: 10px auto;
        box-shadow: 2px 2px 8px 1px rgba(179, 179, 177, 0.5);
        background: #fff;
        .header{
            height: 130px;
            text-align: center;
            padding: 20px 0;
            box-sizing: border-box;
            .price-data{
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 26px;
                span:nth-child(3){
                    font-size: 16px;
                    margin-top: 9px;
                }
                .state-img{
                    width: 30px;
                    height: 30px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .price-num{
                    margin: 0 5px 0 20px;
                }
                
            }
            .transaction-state{
                font-size: 16px;
                margin-top: 5px;
            }
        }
        .main{
            font-size: 14px;
            padding: 10px 20px;
            position: relative;
            .miner-fee{
                height: 50px;
                padding-top: 10px;
                box-sizing: border-box;
                p{
                    line-height: 20px;
                }
                p:nth-child(2){
                    line-height: 20px;
                    margin-left: 70px;
                    color: #c5c2c2;
                    font-size: 12px;
                }
            }
            .transaction-address{
                line-height: 50px;
            }
            .transaction-hash{
                line-height: 30px;
            }
            .transaction-address,.transaction-hash,.miner-fee >p{
                span:nth-child(1){
                    color: #949494;
                }
            }

            .qr-content{
                width: 90px;
                height: 80px;
                
                position: absolute;
                bottom: 40px;
                right:25px;
                .qrcode{
                    height: 80px;
                }
                >p{
                    font-size: 12px;
                    color: rgb(81, 172, 247);
                }
            }
        }
    }
}
</style>