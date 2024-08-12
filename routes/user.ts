import type { HandleHttpApi } from './interface'

namespace userApi
{
    export const login: HandleHttpApi = async (req, res) => {
        res.send({})
    }
}

export default userApi