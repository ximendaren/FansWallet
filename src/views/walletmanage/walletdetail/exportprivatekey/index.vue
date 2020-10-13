<template>
  <div class="PrivateKey">
    <div class="header">
      <van-icon name="arrow-left" size="22" @click="$router.go(-2)" />&nbsp;
      导出{{exportType}}
    </div>
    <van-tabs v-model="active">

      <van-tab :title="exportType">
        <div class="PrivateKey-warp">
          <div class="prompt-main">
            <div>
              <p class="prompt-main__func">离线保存</p>
              <p class="prompt-func__desc">切勿保存至邮箱、记事本、记事本、聊天工具等，非常危险</p>
            </div>
            <div>
              <p class="prompt-main__func">请勿使用网络传输</p>
              <p class="prompt-func__desc">请勿通过网络工具传输，一旦被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输</p>
            </div>
            <div>
              <p class="prompt-main__func">密码管理工具保存</p>
              <p class="prompt-func__desc">建议使用密码管理工具管理</p>
            </div>
          </div>
          <div class="PrivateKey-key"> {{wallet_data.keyStore||wallet_data.privateKey}} </div>

          <div class="keyStorePassword" v-if="wallet_data.keyStorePassword">
            <span>keyStore密码</span>
            <span             
              v-clipboard:copy="wallet_data.keyStorePassword"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"> 
              {{wallet_data.keyStorePassword}} 
            </span>
          </div>

          <van-button
            type="info"
            class="btn"
            v-clipboard:copy="wallet_data.keyStore||wallet_data.privateKey"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制 {{exportType=='Keystore'?'Keystore':'Private Key'}}</van-button>
        </div>
      </van-tab>
            <van-tab title="二维码">
        <div class="PrivateKey-warp">
          <div class="prompt-main">
            <div>
              <p class="prompt-main__func">仅供直接扫描</p>
              <p class="prompt-func__desc">二维码禁止保存、截图、以及拍照。仅供用户在安全环境下直接扫描来方便的导入日钱包</p>
            </div>
            <div>
              <p class="prompt-main__func">在安全环境下使用</p>
              <p class="prompt-func__desc">请确保在四周无人以及无摄像头的情况下使用。二维码一旦被他人获取将造成不可挽回的损失</p>
            </div>
          </div>
          <div class="PrivateKey-code">
            <div v-show="isshow" class="qrcode" ref="CodeUrl" @click="codeClick"></div>
            <div>
              <img v-show="ishide" class="PrivateKey-mask" src="../../../../assets/images/wallet/mask.jpg" alt=""><br>
              <van-button v-show="ishide" type="info" class="showbtn" @click="showCode">显示二维码</van-button>
            </div>

          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>

import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      active:0,
      isshow:false,
      ishide:true,
      exportType:'',
      wallet_data:{},
      isCreatQrCode:true,
    };
  },
  watch:{
    active(val){
      if(val == 1){
        this.$nextTick(() => {
          if(this.isCreatQrCode){
            this.creatQrCode()
            this.isCreatQrCode = false
          } 
            
        });
      }
    }
  },
  created() {
    this.exportType = this.$route.query.tag
    this.wallet_data = this.$store.state.wallet_data
  },
  methods: {
    onCopy(e) {
      this.$toast("复制成功");
    },
    onError(e) {
      this.$toast("复制失败");
    },
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.CodeUrl, {
        text: this.wallet_data.keyStore||this.wallet_data.privateKey,
        width:220,
        height:220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    showCode(){
       this.isshow = true;
       this.ishide = false;
    },
    codeClick(){
        this.isshow =false;
        this.ishide = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.PrivateKey {
  background: #fcfffe;
  height: 100vh;
  .header{
    height: 50px;
    background: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .PrivateKey-warp {
    height: inherit;
    .prompt-main {
      display: grid;
      font-size: 14px;
      padding: 20px 0;
      box-sizing: border-box;
      background: #fbfefe;
      grid-template-columns: repeat(1, 100%);
      grid-template-rows: repeat(3, auto-fill);
      border-bottom: 1px solid #e8ebea;
      div {
        width: 90%;
        margin-left: 5%;
        margin-bottom: 5px;
      }
      .prompt-main__func {
        font-weight: 600;
        line-height: 30px;
        color: #267dbf;
        span {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #000;
          border-radius: 50%;
          margin-right: 5px;
          margin-bottom: 3px;
        }
      }
      .prompt-func__desc {
        color: #717174;
      }
    }
  }
  .PrivateKey-key {
    margin: 20px auto;
    width: 90%;
    height: 140px;
    overflow-y: auto;
    word-wrap: break-word;
    font-size: 12px;
    border: 1px solid #eeeeee;
    background: #fbfbfb;
    border-radius: 4px;
    padding: 5px;
  }
  .keyStorePassword{
    padding:  0 15px 10px;
    span:nth-child(1){
      margin-right: 10px;
      color: #999;
    }
  }
  .PrivateKey-code{
    margin-top: 40px;
    display: flex;
    justify-content: center;
   
      .PrivateKey-mask{
          width: 100px;
          height:100px;
          margin-left: 9px;
      }
  }
  .btn {
    width: 90%;
    margin-top: 10px;
    margin-left: 5%;
  }
  .showbtn {
    width: 120px;
  }
}
</style>     