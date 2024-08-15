import GlobalConfig from '../config/config';
import UserModel from '../database/userModel';
import { defined, isNullOrEmpty } from '../utility';
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
                errmsg: '无效用户',
                userid: ''
            })
        } else {
            const user = await UserModel.findOrCreateUser(req.headers['x-wx-openid'] as string, req.body['name'], req.body['avatar'])
            if (defined(user)) {
                res.send({
                    errcode: 0,
                    errmsg: '',
                    ...user
                })
            } else {
                res.send({
                    errcode: 2,
                    errmsg: '登陆失败',
                    userid: ''
                })
            }
            
        }
        
    }
}

export default userApi