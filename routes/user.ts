import GlobalConfig from '../config/config';
import { isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'

namespace userApi
{
    export const wx_openid: HandleHttpApi = async (req, res) => {
        if (req.headers["x-wx-source"]) {
        res.send(req.headers["x-wx-openid"]);
        }
    }

    export const login: HandleHttpApi = async (req, res) => {
        const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            responseType: 'json',
            params: {
                'appid': GlobalConfig.AppId,
                'secret': GlobalConfig.AppSecret,
                'js_code': req.body["code"],
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
}

export default userApi