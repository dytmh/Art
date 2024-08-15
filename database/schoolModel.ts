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
        const data = await SchoolModel.findAll({
            order:  ['sort', 'createtime', 'DESC'],
            raw: true
        })
        return data ?? []
    }

    static async addSchool(name: string, address: string) {
        const data = await SchoolModel.create({
            name: name,
            address: address,
        },
        {
            raw: true
        })
        return data?.dataValues
    }

    static async updateSchool(school_id: string, name: string, address: string) {
        const data = await SchoolModel.findOne({
            where: { school_id: school_id },
            raw: true
        })
        if (data) {
            data.set({
                name: name,
                address: address
            });
            const res = await data.save()
            return res?.dataValues
        }
    }

    static async deleteSchool(school_id: string) {
        const data = await SchoolModel.findOne({
            where: { school_id: school_id }
        })
        if (data) {
            await data.destroy()
        }
    }
}

export default SchoolModel