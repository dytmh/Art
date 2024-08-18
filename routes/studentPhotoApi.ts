import GlobalConfig from '../config/config';
import StudentPhotoModel from '../database/studentPhotoModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace studentPhotoApi
{
    export const getStudentPhotoList: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.getStudentPhotoList()
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '获取失败',
            })
        }
    }

    export const addStudentPhoto: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.addStudentPhoto(req.body['name'], req.body['desc'], req.body['info'])
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

    export const updateStudentPhoto: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.updateStudentPhoto(req.body['id'], req.body['name'], req.body['desc'], req.body['info'])
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

    export const deleteStudentPhoto: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.deleteStudentPhoto(req.body['id'])
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

export default studentPhotoApi