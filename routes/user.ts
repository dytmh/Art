import type { HandleHttpApi } from './interface'

namespace userApi
{
    export const wx_openid: HandleHttpApi = async (req, res) => {
        if (req.headers["x-wx-source"]) {
        res.send(req.headers["x-wx-openid"]);
        }
    }

    export const login: HandleHttpApi = async (req, res) => {
        res.send({})
    }
}

export default userApi