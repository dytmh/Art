import GlobalConfig from '../config/config';
import StudentLikeModel from '../database/studentLikeModel';
import StudentPhotoModel from '../database/studentPhotoModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace studentPhotoApi
{
    export const getStudentPhotoList: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.getStudentPhotoList(req.body['page'], req.body['count'])
        if (defined(data)) {
            const total = await StudentPhotoModel.count()
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

    export const getStudentPhoto: HandleHttpApi = async (req, res) => {
        const data = await StudentPhotoModel.getStudentPhoto(req.body['id'])
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

    export const getStudentLike: HandleHttpApi = async (req, res) => {
        const data = await StudentLikeModel.getStudentLike(req.body['id'])
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
                data: 0
            })
        }
    }

    export const updateStudentLike: HandleHttpApi = async (req, res) => {
        const data = await StudentLikeModel.updateStudentLike(req.body['id'], req.body['userid'], Number.parseInt(req.body['up']))
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: data
            })
        } else {
            res.send({
                errcode: 1,
                errmsg: '设置失败',
                data: 0
            })
        }
    }
}

export default studentPhotoApi