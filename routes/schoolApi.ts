import GlobalConfig from '../config/config';
import SchoolModel from '../database/schoolModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace schoolApi
{
    export const getSchoolList: HandleHttpApi = async (req, res) => {
        const data = await SchoolModel.getSchoolList()
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

    export const addSchool: HandleHttpApi = async (req, res) => {
        const data = await SchoolModel.addSchool(req.body['name'], req.body['address'], req.body['info'])
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

    export const updateSchool: HandleHttpApi = async (req, res) => {
        const data = await SchoolModel.updateSchool(req.body['school_id'], req.body['name'], req.body['address'], req.body['info'])
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

    export const deleteSchool: HandleHttpApi = async (req, res) => {
        const data = await SchoolModel.deleteSchool(req.body['school_id'])
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

export default schoolApi