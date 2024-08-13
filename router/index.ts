import express from 'express'

import userApi from '../routes/user'

const router = express.Router()

router.get('/api/wx_openid', userApi.wx_openid)

router.post('/api/login', userApi.login)
router.get('/api/login', userApi.login)

export default router
