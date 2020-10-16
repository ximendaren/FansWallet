import { get, post } from './../api'
import qs from "querystring"


// export const set_walletTokens= (params) => post('/v1/wallet/set-wallet-tokens',qs.stringify(params)) //添加资产

// export const importWallet= (params) => post('/v1/wallet/import',qs.stringify(params)) //导入钱包

export const get_hotList= (params) => get('/v1/wallet/token/list-hot',params)  //热门货币

export const get_searchToken= (params) => get('/v1/wallet/token/list',params)  //搜索货币

