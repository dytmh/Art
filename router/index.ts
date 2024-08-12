import express from 'express'

import userApi from '../routes/user'

const router = express.Router()

router.post('/api/login', userApi.login)
router.get('/api/wx_openid', userApi.wx_openid)

export default router
