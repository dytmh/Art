import express from 'express'

import userApi from '../routes/userApi'
import schoolApi from '../routes/schoolApi'
import teacherPhotoApi from '../routes/teacherPhotoApi'
import studentPhotoApi from '../routes/studentPhotoApi'

const router = express.Router()

router.post('/api/wx_openid', userApi.wx_openid)
router.get('/api/wx_openid', userApi.wx_openid)

router.post('/api/login', userApi.login)
router.get('/api/login', userApi.login)

router.post('/api/school/getSchoolList', schoolApi.getSchoolList)
router.post('/api/school/addSchool', schoolApi.addSchool)
router.post('/api/school/updateSchool', schoolApi.updateSchool)
router.post('/api/school/deleteSchool', schoolApi.deleteSchool)

router.post('/api/teacher/getTeacherPhotoList', teacherPhotoApi.getTeacherPhotoList)
router.post('/api/teacher/addTeacherPhoto', teacherPhotoApi.addTeacherPhoto)
router.post('/api/teacher/updateTeacherPhoto', teacherPhotoApi.updateTeacherPhoto)
router.post('/api/teacher/deleteTeacherPhoto', teacherPhotoApi.deleteTeacherPhoto)

router.post('/api/student/getSchoolList', studentPhotoApi.getStudentPhotoList)
router.post('/api/student/addSchool', studentPhotoApi.addStudentPhoto)
router.post('/api/student/updateSchool', studentPhotoApi.updateStudentPhoto)
router.post('/api/student/deleteSchool', studentPhotoApi.deleteStudentPhoto)

export default router
