import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class MessageModel extends Model {
    static register() {
        MessageModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true
            },
            info: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createtime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            updatetime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_messages',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime', 'updatetime'] }]
        });
        MessageModel.sync({alter: true}).catch(() => {})
    }

    static async getMessageList(page: number, count: number) {
        try {
            const data = await MessageModel.findAll({
                order:  [['createtime', 'DESC']],
                limit: count,
                offset: page * count,
                raw: true
            })
            return data
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async getMessage(id: string) {
        try {
            const data = await MessageModel.findOne({
                where: { id },
                raw: true
            })
            return data
        }
        catch(e) {
            console.log(e)
        }
        return null
    }


    static async addMessage(name: string, desc: string, info: string) {
        try {
            const data = await MessageModel.create({
                name: name,
                desc: desc,
                info: info
            })
            return data?.dataValues
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async updateMessage(school_id: string, name: string, desc: string, info: string) {
        try {
            const data = await MessageModel.findOne({
                where: { school_id: school_id }
            })
            if (data) {
                data.set({
                    name: name,
                    address: desc,
                    info: info
                });
                const res = await data.save()
                return res?.dataValues
            }
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async deleteMessage(school_id: string) {
        try {
            const data = await MessageModel.findOne({
                where: { school_id: school_id }
            })
            if (data) {
                await data.destroy()
                return true
            }
        }
        catch(e) {
            console.log(e)
        }
        return false
    }
}

export default MessageModel