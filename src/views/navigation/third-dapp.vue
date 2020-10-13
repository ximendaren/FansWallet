<template>
    <div class="third-party">
        <div class="header">
            <!-- <div class="title"> {{linkData.title}} </div> -->
            <div class="operation">
                <van-icon class="icon" name="ellipsis" @click="operation_show=true"  />
                <van-icon class="icon" name="close" @click="$router.back()" />
            </div>
        </div>
        <iframe :src="linkData.link" width="100%" frameborder="0" scrolling="auto" class="iframe" ></iframe>

        <van-share-sheet v-model="operation_show" :options="options" @select="operationType" />


    </div>
</template>

<script>
export default {
    data(){
        return{
            operation_show: false,
            linkData:{},
            options: [
                {
                name: '复制链接',
                icon: require('@/assets/images/icon/link.png'),
                },
                {
                name: '刷新',
                icon: require('@/assets/images/icon/refresh.png'),
                },
                {
                name: '收藏',
                icon: require('@/assets/images/icon/collet.png'),
                },
            ],
        }
    },
    // created(){
    //     plus.webview.open(this.$route.query.data,'window',{top:'46px',bottom:'0px'}); 
   
    // },
    // beforeDestroy(){
    //     plus.webview.close( 'window' );
    // },
    created(){
        this.linkData = this.$route.query.data
    },
    methods:{
        operationType(item,index){
            this.operation_show = false;
            switch (index) {
                case 0:
                    this.$toast('复制成功')
                    break;
                case 1:
                    this.$router.go(0)
                    break;
                case 2:
                    let bookmark = this.public_js.GetStorage('bookmark') || []
                    bookmark.push(this.linkData)
                    this.public_js.SetStorage('bookmark',bookmark)
                    this.$toast('已收藏')
                    break;
            
                default:
                    break;
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.third-party{

    .header{
        height: 46px;
        background: #eee;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        .title{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%);
            line-height: 46px;
            font-size: 16px;
        }
        .operation{
            width: 80px;
            height: 30px;
            border-radius: 15px;
            background: #fff;
            display: flex;
            .icon{
                width: 40px;
                line-height: 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 700;
            }
        }
    }
    .iframe{
        height: calc(100vh - 46px);
        position: absolute;
        top: 46px;
    }
    .third-tips{
        padding: 60px 25px 0;
        box-sizing: border-box;
        text-align: center;
        p{
            font-size: 16px;
        }
        .tips-text{
            margin-top: 10px;
        }
        .confirm{
            position: absolute;
            left: 50%;
            bottom: 12px;
            width: 350px;
            transform: translate(-50%);
            border-radius: 8px;
        }
    }
}
</style>