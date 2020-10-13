import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isVersion:true,
    isLogin:false,
    routerName:'chaincloud',
    shownav:true,
    del_walletId:'',
    newVersion:'',
    newVersionUrl:'',
    walletInfo:'',
    userName:'',
    wallet_data:{},
    wallet_default:{},
    isFingerprint:false,   // 是否开启指纹
    first_auto:0,
    isGuide:window.plus?!plus.storage.getItem("isGuide")?1:plus.storage.getItem("isGuide"):!localStorage.getItem("isGuide")?1:localStorage.getItem("isGuide"),
    optionsData:[  
      {id:0,text:"基本功能",state:true,oldPrice:1,price:1,category:1,see:true},
      {id:1,text:"销毁",state:false,oldPrice:1,price:1,category:1,see:false},
      {id:2,text:"合并",state:false,oldPrice:2,price:1.5,category:1,see:false},
      {id:3,text:"锁定",state:false,oldPrice:1,price:1,category:0,see:false},
      {id:4,text:"锁仓",state:false,oldPrice:2,price:2,category:0,see:false},
      {id:5,text:"增发",state:false,oldPrice:2,price:1.5,category:0,see:false},
      {id:6,text:"空投",state:false,oldPrice:1,price:1,category:1,see:false},
      {id:7,text:"直投",state:false,oldPrice:1,price:1,category:0,see:false}
    ],
  },
  mutations: {
    changeRoute(state,newVal){
      state.routerName=newVal
    },
    delWalletId(state,newVal){
      state.del_walletId=newVal
    },
    get_newVersion(state,newVal){
      state.newVersion=newVal
    },
    get_newVersionUrl(state,newVal){
      state.newVersionUrl=newVal
    },
    walletInfo(state,newVal){
      state.walletInfo=newVal
    },
    userName(state,newVal){
      state.userName=newVal
    },
    walletData(state,newVal){
      state.wallet_data=newVal
    },
    wallet_default(state,newVal){
      state.wallet_default=newVal
    },
    isFingerprint(state,newVal){
      state.isFingerprint=newVal
    },
    first_auto(state,newVal){
      state.first_auto=newVal
    },
    isGuide(state,newVal){
      state.isGuide=newVal
    },
  },
  actions: {

  }
})
