<template>
    <div class="container-dapp">
        <pageheader></pageheader>
        <van-tabs color="#2364bc" v-model="typeActive" animated swipeable> 
            <van-tab v-for="(item,index) in importType" :title="item.title" :key="index">
                <div class="import-content" v-show="index==0">
                   <p class="tips">使用助记词导入的同时可以修改钱包密码。</p>
                   <div class="input-box">
                       <van-cell-group>
                        <van-field
                            v-model="wordText"
                            rows="4"
                            type="textarea"
                            placeholder="请输入助记词单词，并使用空格分隔"
                            class="textarea"
                        />
                        </van-cell-group>
                   </div>
                </div>
                <div class="import-content" v-show="index==1">
                   <p class="tips">复制粘贴以太坊官方钱包 Keystore 至输入框。</p> 
                   <div class="input-box">
                       <van-cell-group>
                        <van-field
                            v-model="keystoreText"
                            rows="4"
                            type="textarea"
                            placeholder="请输入 Keystore"
                            class="textarea"
                        />
                        </van-cell-group>
                   </div>
                </div>
                <div class="import-content" v-show="index==2">
                   <p class="tips">请输入私钥至输入框。</p>
                   <div class="input-box">
                       <van-cell-group>
                        <van-field
                            v-model="privatekeyText"
                            rows="4"
                            type="textarea"
                            placeholder="请输入明文私钥"
                            class="textarea"
                        />
                        </van-cell-group>
                   </div>
                </div>
                <!-- 选择路径 -->
                <div class="wallet-name" v-show="index==0">
                    <p>路径</p>
                    <span>&emsp;m/44'/60'/0'/0/0</span>
                    
                </div>
                <div class="wallet-name" v-if="typeActive==1">
                    <van-field v-model="keyStorePassword" placeholder="请输入KeyStore密码" class="input" :border="false" />
                </div>
                <!-- 钱包名称 -->
                <div class="wallet-name">
                    <p>钱包名称</p>
                    <van-field v-model="walletName" placeholder="输入钱包名称" :border="false" class="input" />
                </div>
                <!-- 设置密码 -->
                <div class="setPassword-box">
                    <p>设置钱包密码</p>
                    <van-field v-model="password" placeholder="输入钱包密码" type="password" :border="false" class="input" oninput="value=value.replace(/[\W]/g,'')" />
                    <van-field v-model="ag_password" placeholder="再次输入密码" type="password" :border="false" class="input" oninput="value=value.replace(/[\W]/g,'')" />
                    <van-field v-model="remark" placeholder="备注" class="input" />
                </div>
                <div style="text-align:center" v-if="showBtn">
                    <van-button type="default" class="start-import" @click="start_import(item)" :disabled="isInport">开始导入</van-button>
                </div>

            </van-tab>
        </van-tabs>


    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import {importWallet} from '@/api/mycenter/wallet'
import CryptoJS from 'crypto-js'
export default {
    components:{pageheader},
    data() {
        return {
            clientHeight:document.documentElement.clientHeight,
　　　　　　 showBtn: true,  // 控制按钮显示隐藏
            importType:[
                {
                    title:'助记词',
                    value:'Words',
                },
                {
                    title:'Keystore',
                    value:'KeyStore',
                },
                {
                    title:'私钥',
                    value:'PrivateKey',
                }],
            typeActive:0,
            wordText:'',
            keystoreText:'',
            privatekeyText:'',
            password:'',
            ag_password:'',
            remark:'',
            walletName:'',
            keyStorePassword:'',
            walletToken:''
        }
    },
    created(){
        this.walletToken = this.$route.query.walletToken || 'ETH'
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
    computed:{
        isInport(){
            switch (this.typeActive) {
                case 0:
                    if(!this.password || !this.ag_password || !this.wordText || !this.walletName ) return true                    
                    break;
                case 1:
                    if(!this.password || !this.ag_password || !this.keystoreText || !this.walletName ) return true
                    break;
                case 2:
                    if(!this.password || !this.ag_password || !this.privatekeyText || !this.walletName ) return true
                    break;
            
                default:return true
                    break;
            }
        }
    },
    methods:{
        start_import(item){    
            if(this.password.length <6){
                this.$toast('密码不能小于6位')
                return
            }
            if(this.password !== this.ag_password){
                this.$toast('两次输入的密码不一致')
                return
            }
            // if(!(/\d+/.test(this.password) && /[a-zA-Z]+/.test(this.password))) {
            //     this.$toast("钱包密码必须包含数字和字母");
            //     return;
            // }
            // let params = {
            //     WalletName:this.walletName,
            //     Password:this.password,
            //     Remark:this.remark,
            //     HeadPortrait:1,
            //     WalletType:'ETH',
            //     PrivateKey:this.privatekeyText,
            //     Words:this.wordText,
            //     KeyStore:this.keystoreText,
            //     KeyStorePassword:this.keyStorePassword,
            //     ImportType:item.value,                
            // }



            var ethers = require('ethers');
            var wallet= ethers.Wallet.fromMnemonic(this.wordText);

            console.log(wallet)
            'shine dog venue hand question scan hero tennis room victory chimney tower'

            var password = CryptoJS.AES.encrypt(this.password, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var mnemonicWords = CryptoJS.AES.encrypt(this.wordText, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            let walletInfo = this.public_js.GetStorage('walletInfo') || []
            if(walletInfo.length> 0){
                walletInfo.forEach(item => {
                    item.isMain = 0
                })
            }

            let assetsToken;
            if(this.walletToken === 'ETH'){ 

                assetsToken = [{
                    contractAddress:wallet.address,
                    tokenLogo:'',
                    walletType:'ETH',
                    tokenSymbol:this.walletName,
                    totalAccount:0,
                    totalUsd:0,
                }]
               
                walletInfo.push({
                    userName:'',
                    walletName:this.walletName,
                    password:password.ciphertext.toString(),
                    remark:this.remark,
                    isMain:1,
                    address:wallet.address,
                    walletType:'ETH',
                    totalAccount:0,
                    totalUsd:0,
                    mnemonic:mnemonicWords.ciphertext.toString(),
                    privateKey:wallet.privateKey,
                    assetsToken:assetsToken
                })
            }
            if(this.walletToken === 'BTC'){ 
                var btcWallet = {};
                var bitcoinjs = require('bitcoinjs-lib');
                bip39.mnemonicToSeed(mnemonic).then(res=>{
                var root = bitcoinjs.bip32.fromSeed(res);
                var keyPair = root.derivePath("m/44'/0'/0'/0/0");
                btcWallet.privateKey = keyPair.toWIF();    // 私钥：L2tduuvVupopVxJ8tFtmGf5KXxKoaJBRFUKU1VCoTX3dtskwwAhF
                btcWallet.publicKey = keyPair.publicKey;
                btcWallet.address = bitcoinjs.payments.p2pkh({ pubkey: btcWallet.publicKey }).address; 

                // btcWallet.privateKey = CryptoJS.AES.encrypt(btcWallet.privateKey, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
                //     mode: CryptoJS.mode.ECB,
                //     padding: CryptoJS.pad.Pkcs7
                // });

                    assetsToken = [{
                        contractAddress:btcWallet.address,
                        tokenLogo:'',
                        walletType:'BTC',
                        tokenSymbol:this.walletName,
                        totalAccount:0,
                        totalUsd:0,
                    }]
                    walletInfo.push({
                        userName:'',
                        walletName:this.walletName,
                        password:password.ciphertext.toString(),
                        remark:this.remark,
                        isMain:0,
                        address:btcWallet.address,
                        walletType:'BTC',
                        totalAccount:0,
                        totalUsd:0,
                        mnemonic:mnemonicWords.ciphertext.toString(),
                        privateKey:btcWallet.privateKey,
                        assetsToken:assetsToken
                    })

                });
            }

            setTimeout(() => {
                this.public_js.SetStorage('walletInfo',walletInfo)
                this.$router.push('wallet')
                this.$toast.clear();
            },30)

        },
        isScan(state){
            console.log(state)
        }
    }
}
</script>
<style scoped lang="scss">
.container-dapp{
    
    .import-content{
        .tips{
            line-height: 50px;
            padding: 0 20px;
            background: rgb(245, 245, 245);
            color: #666;
            font-size: 14px;
        }
        .input-box{
            padding: 10px 20px 0;
            .textarea{
                padding: 5px 10px;
                border: 1px solid #eee; 
                border-radius: 7px;
            }
        }
    }
    .setPassword-box,.wallet-name{
        padding: 5px 15px;
        >p{
            font-size: 15px;
        }
        .input{
            border-bottom: 0.7px solid rgba(241, 241, 241, 0.849);
            height: 48px;
            display: flex;
            align-items: center;
        }
    }
    .start-import{
        width: 90%;
        background: #2364bc;
        color: #fff;
        border-radius: 10px;
        margin-top: 30px;

    }
}
</style>