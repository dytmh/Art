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
        if (isNullOrEmpty(req.headers['x-wx-openid'])) {
            res.send({
                errcode: 1,
                errmsg: '无效',
                userid: ''
            })
        } else {
            res.send({
                errcode: 0,
                errmsg: '',
                userid: req.headers['x-wx-openid']
            })
        }
        
    }
}

export default userApi