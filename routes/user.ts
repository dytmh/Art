import GlobalConfig from '../config/config';
import { isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace userApi
{
    export const wx_openid: HandleHttpApi = async (req, res) => {
        if (req.headers["x-wx-source"]) {
        res.send(req.headers["x-wx-openid"]);
        }
    }

    export const login: HandleHttpApi = async (req, res) => {
        const wxRes = await axios.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            responseType: 'json',
            params: {
                'appid': GlobalConfig.AppId,
                'secret': GlobalConfig.AppSecret,
                'js_code': req.body["code"] ?? req.query["code"],
                'grant_type': 'authorization_code'
            }
        })

        console.log(wxRes.data)

        if (wxRes.data && !isNullOrEmpty(wxRes.data.openid)) {
        }
        
        res.send({
            errcode: wxRes.data.errcode,
            errmsg: wxRes.data.errmsg
        })
    }

    export const logout: HandleHttpApi = async (req, res) => {
        const wxRes = await axios.request({
            url: 'https://api.weixin.qq.com/wxa/resetusersessionkey',
            method: 'GET',
            responseType: 'json',
            params: {
                'openid': req.headers["userid"] ?? req.headers["userid"],
                'signature': CryptoJS.HmacSHA256(req.headers["token"] as string, "").toString(),
                'sig_method': 'hmac_sha256'
            }
        })

        res.send({
            errcode: 0,
            errmsg: ''
        })
    }

    export const checkSession: HandleHttpApi = async (req, res) => {
        const wxRes = await axios.request({
            url: 'https://api.weixin.qq.com/wxa/checksession',
            method: 'GET',
            responseType: 'json',
            params: {
                'openid': req.headers["userid"] ?? req.headers["userid"],
                'signature': CryptoJS.HmacSHA256(req.headers["token"] as string, "").toString(),
                'sig_method': 'hmac_sha256'
            }
        })

        res.send({
            errcode: wxRes.data.errcode,
            errmsg: wxRes.data.errmsg
        })
    }
}

export default userApi