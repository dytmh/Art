import express from 'express'

import userApi from '../routes/userApi'
import schoolApi from '../routes/schoolApi'
import teacherPhotoApi from '../routes/teacherPhotoApi'
import studentPhotoApi from '../routes/studentPhotoApi'
import messageApi from '../routes/messageApi'

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
router.post('/api/teacher/getTeacherPhoto', teacherPhotoApi.getTeacherPhoto)
router.post('/api/teacher/addTeacherPhoto', teacherPhotoApi.addTeacherPhoto)
router.post('/api/teacher/updateTeacherPhoto', teacherPhotoApi.updateTeacherPhoto)
router.post('/api/teacher/deleteTeacherPhoto', teacherPhotoApi.deleteTeacherPhoto)
router.post('/api/teacher/getTeacherLike', teacherPhotoApi.getTeacherLike)
router.post('/api/teacher/updateTeacherLike', teacherPhotoApi.updateTeacherLike)

router.post('/api/student/getStudentPhotoList', studentPhotoApi.getStudentPhotoList)
router.post('/api/student/getStudentPhoto', studentPhotoApi.getStudentPhoto)
router.post('/api/student/addStudentPhoto', studentPhotoApi.addStudentPhoto)
router.post('/api/student/updateStudentPhoto', studentPhotoApi.updateStudentPhoto)
router.post('/api/student/deleteStudentPhoto', studentPhotoApi.deleteStudentPhoto)
router.post('/api/student/getStudentLike', studentPhotoApi.getStudentLike)
router.post('/api/student/updateStudentLike', studentPhotoApi.updateStudentLike)

router.post('/api/message/getMessageList', messageApi.getMessageList)
router.post('/api/message/getMessage', messageApi.getMessage)
router.post('/api/message/addMessage', messageApi.addMessage)
router.post('/api/message/updateMessage', messageApi.updateMessage)
router.post('/api/message/deleteMessage', messageApi.deleteMessage)

router.post('/api/message/subscribeMessage', messageApi.subscribeMessage)
router.get('/api/message/subscribeMessage', messageApi.subscribeMessage)

export default router
