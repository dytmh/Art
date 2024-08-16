import express from 'express'

import userApi from '../routes/userApi'
import schoolApi from '../routes/schoolApi'

const router = express.Router()

router.post('/api/wx_openid', userApi.wx_openid)
router.get('/api/wx_openid', userApi.wx_openid)

router.post('/api/login', userApi.login)
router.get('/api/login', userApi.login)

router.post('/api/school/getSchoolList', schoolApi.getSchoolList)
router.post('/api/school/addSchool', schoolApi.addSchool)
router.post('/api/school/updateSchool', schoolApi.updateSchool)
router.post('/api/school/deleteSchool', schoolApi.deleteSchool)

export default router
