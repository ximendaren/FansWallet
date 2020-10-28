import { get, post } from '../api'
import qs from "querystring";
// 广播交易
export const transaction = (params) => get('/v1/wallet/ethereum/SendRawTransaction',params)
// 获取gasPrice
export const get_ethMinerInfo = (params) => get('/v1/wallet/ethereum/transfer-code',params)
// 获取nonce
export const next_nonce = (params) => get('/v1/wallet/ethereum/next-nonce',params)
// 创建钱包
export const created_wallet = (params) => post('/v1/wallet/create',qs.stringify(params))