import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class TeacherLikeModel extends Model {
    static register() {
        TeacherLikeModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userid: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photoid: {
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
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_teacher_likes',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: true, fields: ['userid', 'photoid'] }]
        });
        TeacherLikeModel.sync({alter: true}).catch(() => {})
    }

    static async getTeacherLike(photoid: string) {
        try {
            const data = await TeacherLikeModel.count({
                where: { photoid },
            })
            return data ?? 0
        }
        catch(e) {
            console.log(e)
        }
        return 0
    }

    static async updateTeacherLike(photoid: string, userid: string, up: number) {
        try {
            if (up >= 1) { 
                await TeacherLikeModel.create({
                    photoid: photoid,
                    userid: userid
                })
            } else {
                const d = await TeacherLikeModel.findOne({
                    where: { photoid, userid }
                })
                if (d) {
                    await d.destroy();
                }
            }
        }
        catch(e) {
            console.log(e)
        }
        return TeacherLikeModel.getTeacherLike(photoid);
    }
}

export default TeacherLikeModel