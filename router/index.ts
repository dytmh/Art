import express from 'express'

import userApi from '../routes/user'

const router = express.Router()

router.get('/api/wx_openid', userApi.wx_openid)

router.post('/api/login', userApi.login)
router.get('/api/login', userApi.login)

router.post('/api/logout', userApi.logout)
router.get('/api/logout', userApi.logout)

router.post('/api/checkSession', userApi.checkSession)
router.get('/api/checkSession', userApi.checkSession)

export default router
