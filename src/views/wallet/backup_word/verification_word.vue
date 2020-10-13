<template>  
    <div class="container">
        <pageheader></pageheader>

        <div style="padding:0 15px">
            <div class="title-box">
                <img src="" style="height:50px">
                <!-- <p><b>确认助记词</b></p> -->
            </div>
            <p>请按顺序点击助记词，以确认您正确备份。</p>
            <div class="display-area">
                <div class="terms-box">
                    <span v-for="(item,index) in validationTerm" :key="index" @click="pull_terms(item,index)">{{item}}</span>
                </div>
            </div>
            <div class="operation-area">
                <div class="terms-box">
                    <span v-for="(item,index) in randomTerm" :key="index" @click="push_terms(item,index)">{{item}}</span>
                </div>
            </div>
        </div>

        <van-button type="info" size="normal" class="sure_btn" :disabled="randomTerm.length !==0" @click="finish">完成</van-button>
    </div>
</template>

<script>
import pageheader from '@/components/pageheader'
export default {
    components:{ pageheader },
    data(){
        return{
            mnemonic:[],
            randomTerm:[],
            randomTerm:[],
            termsData:[],

        }
    },
    created(){
        this.mnemonic = this.public_js.GetStorage('walletInfo')[0].mnemonic.split(' ')

        this.randomTerm = []
        this.validationTerm=[]
        this.termsData = this.mnemonic
        for (var item in this.termsData) this.randomTerm[item] = this.termsData[item];
        this.randomTerm.sort(function(){ return 0.5 - Math.random() })

        console.log(this.mnemonic)
    },
    methods:{
        pull_terms(item,index){  
            this.randomTerm.push(item)
            this.validationTerm.splice(index,1)
        },
        push_terms(item,index){ 
            this.validationTerm.push(item)
            this.randomTerm.splice(index,1)
        },
        finish(){    //完成
            if(this.termsData.join(',') === this.validationTerm.join(',')){
                this.$toast.success('钱包创建成功');
                this.$router.push({
                    name:'wallet',
                })         
            }else{
                this.$toast.clear();
                // this.$toast.fail('助记词顺序不正确！');
                this.$notify('助记词顺序不正确！');
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.container{

    width: 100%;
    height: 100%;
    
    .back{
        line-height: 50px;
        font-size: 22px;
        padding: 0 10px;
        border-bottom: 1px solid #eee;
    }
    .title-box{
        font-size: 18px;
        height: 100px;
        // background: #eee;
        text-align: center;
    }
    p{
        line-height: 60px;
        text-align: center;
        padding: 10px 0;
    }

    .display-area{
        min-height: 50px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
       
    }
    .terms-box{
        display: flex;
        flex-wrap: wrap;
        margin: 10px auto;
       
        box-sizing:border-box;
        span{
            line-height: 20px;
            background: rgb(233, 238, 240);
            padding: 5px 6px;
            border-radius: 4px;
            margin: 5px;
            font-size: 15px;
        }
    }
    .operation-area{
       
    }
    .sure_btn{
        position: absolute;
        bottom: 10px;
        width: 90%;
        left: 50%;
        transform: translate(-50%)

    }

}
</style>