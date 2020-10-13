<template>
  <div id="app">
    
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>   
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive>
    <router-view></router-view>
    </keep-alive>    -->
  </div>
</template>
<script>
import {get_funcList} from '@/api/chaincloud/coin_making'
export default {
  data() {
    return {
        
    };
  },
  created(){
    // this.funcList()
  },
  methods:{
    //获取功能列表
    funcList(){
      get_funcList({TokenType:'ETH'}).then(res => {
        if(res.code === 0){
          if(window.plus){
            plus.storage.setItem('funcList',JSON.stringify(res.data))
          }else{
            localStorage.funcList = JSON.stringify(res.data)
          }
        }else{
          this.$toast(res.messages)
        }
      }).catch(err => {
        // this.funcList()
      })
    },
  }

};
</script>
<style lang="scss">
#app{
  background: #fff;
  height: 100vh;
}
</style>
