import GlobalConfig from '../config/config';
import MessageModel from '../database/messageModel';
import { defined, isNullOrEmpty } from '../utility';
import type { HandleHttpApi } from './interface'
import axios from 'axios'
import CryptoJS from 'crypto-js'

namespace messageApi
{
    export const getMessageList: HandleHttpApi = async (req, res) => {
        const data = await MessageModel.getMessageList(req.body['page'], req.body['count'])
        if (defined(data)) {
            const total = await MessageModel.count()
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

    export const getMessage: HandleHttpApi = async (req, res) => {
        const data = await MessageModel.getMessage(req.body['id'])
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

    export const addMessage: HandleHttpApi = async (req, res) => {
        const data = await MessageModel.addMessage(req.body['name'], req.body['desc'], req.body['info'])
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

    export const updateMessage: HandleHttpApi = async (req, res) => {
        const data = await MessageModel.updateMessage(req.body['id'], req.body['name'], req.body['desc'], req.body['info'])
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

    export const deleteMessage: HandleHttpApi = async (req, res) => {
        const data = await MessageModel.deleteMessage(req.body['id'])
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

export default messageApi