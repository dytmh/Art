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
        console.log(req.headers)
        console.log(req.body)
        
        res.send({
            errcode: 0,
            errmsg: ''
        })
    }
}

export default userApi