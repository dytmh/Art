import GlobalConfig from '../config/config';
import TeacherPhotoModel from '../database/teacherPhotoModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace teacherPhotoApi
{
    export const getTeacherPhotoList: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.getTeacherPhotoList(req.body['page'], req.body['count'])
        if (defined(data)) {
            const total = await TeacherPhotoModel.count()
            res.send({
                errcode: 0,
                errmsg: '',
                total: total,
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '获取失败',
            })
        }
    }

    export const addTeacherPhoto: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.addTeacherPhoto(req.body['name'], req.body['desc'], req.body['info'])
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '添加失败',
            })
        }
    }

    export const updateTeacherPhoto: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.updateTeacherPhoto(req.body['id'], req.body['name'], req.body['desc'], req.body['info'])
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '更新失败',
            })
        }
    }

    export const deleteTeacherPhoto: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.deleteTeacherPhoto(req.body['id'])
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '删除失败',
            })
        }
    }
}

export default teacherPhotoApi