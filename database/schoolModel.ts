import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";
import { raw } from "mysql";


class SchoolModel extends Model {
    static register() {
        SchoolModel.init({
            school_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            info: {
                type: DataTypes.TEXT('long'),
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
            },
            sort: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_schools',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'sort'] }]
        });
        SchoolModel.sync({alter: true}).catch(() => {})
    }

    static async getSchoolList() {
        try {
            const data = await SchoolModel.findAll({
                order:  [['sort', 'DESC'], ['createtime', 'DESC']],
                raw: true
            })
            return data ?? []
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async addSchool(name: string, address: string, info: string) {
        try {
            const data = await SchoolModel.create({
                name: name,
                address: address,
                info: info
            })
            return data?.dataValues
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async updateSchool(school_id: string, name: string, address: string, info: string) {
        try {
            const data = await SchoolModel.findOne({
                where: { school_id: school_id }
            })
            if (data) {
                data.set({
                    name: name,
                    address: address,
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

    static async deleteSchool(school_id: string) {
        try {
            const data = await SchoolModel.findOne({
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

export default SchoolModel