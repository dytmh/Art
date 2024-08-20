import GlobalConfig from '../config/config';
import TeacherLikeModel from '../database/teacherLikeModel';
import TeacherPhotoModel from '../database/teacherPhotoModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace teacherPhotoApi
{
    export const getTeacherPhotoList: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.getTeacherPhotoList(req.body['page'], req.body['count'], req.headers['x-wx-openid'] as string ?? '')
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

    export const getTeacherPhoto: HandleHttpApi = async (req, res) => {
        const data = await TeacherPhotoModel.getTeacherPhoto(req.body['id'], req.headers['x-wx-openid'] as string ?? '')
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

    export const getTeacherLike: HandleHttpApi = async (req, res) => {
        const data = await TeacherLikeModel.getTeacherLike(req.body['id'])
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

    export const updateTeacherLike: HandleHttpApi = async (req, res) => {
        const data = await TeacherLikeModel.updateTeacherLike(req.body['id'], req.headers['x-wx-openid'] as string, req.body['up'])
        if (defined(data)) {
            res.send({
                errcode: 0,
                errmsg: '',
                data: {
                    mylike: req.body['up'],
                    likenum: data
                }
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

export default teacherPhotoApi