import express from 'express'

import userApi from '../routes/user'

const router = express.Router()

router.post('/login', userApi.login)

export default router
