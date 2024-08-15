import { DataTypes, Model, where } from "sequelize";
import ModelSequelize from "./modelSequelize";


class SchoolResModel extends Model {
    static register() {
        SchoolResModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            school_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sort: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_school_res',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['school_id', 'sort'] }]
        });
        SchoolResModel.sync({alter: true}).catch(() => {})
    }

    static async getSchoolResList(school_id: string) {
        const data = await SchoolResModel.findAll({
            where: { school_id: school_id },
            order:  ['sort', 'createtime', 'DESC'],
            raw: true
        })
        return data ?? []
    }

    static async addSchoolRes(items: Array<any>) {
        const data = await SchoolResModel.bulkCreate(items)
        if (data && data.length > 0) {
            return true;
        }
        return false;
    }

    static async updateSchoolRes(items: Array<any>) {
        const t = await ModelSequelize.getSequelize().transaction();

        try {
            for(const item of items) {
                const data = await SchoolResModel.findOne({
                    where: { id: item.id }
                })

                if (data) {
                    data.set(item)

                    await data.save({
                        transaction: t
                    })
                }
            }

            await t.commit()

            return true
        }
        catch  {
            await t.rollback();
        }

        return false
    }

    static async deleteSchoolRes(ids: Array<string>) {
        const t = await ModelSequelize.getSequelize().transaction();
        
        try {
            for(const item of ids) {
                const data = await SchoolResModel.findOne({
                    where: { id: item }
                })
                if (data) {
                    await data.destroy({
                        transaction: t
                    })
                }
            }

            await t.commit()

            return true
        }
        catch  {
            await t.rollback();
        }

        return false
    }
}

export default SchoolResModel