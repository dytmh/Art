import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class StudentLikeModel extends Model {
    static register() {
        StudentLikeModel.init({
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
            modelName: 't_student_likes',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: true, fields: ['userid', 'photoid'] }]
        });
        StudentLikeModel.sync({alter: true}).catch(() => {})
    }

    static async getStudentLike(photoid: string) {
        try {
            const data = await StudentLikeModel.count({
                where: { photoid },
            })
            return data ?? 0
        }
        catch(e) {
            console.log(e)
        }
        return 0
    }

    static async updateStudentLike(photoid: string, userid: string, up: number) {
        try {
            if (up >= 1) { 
                await StudentLikeModel.create({
                    photoid: photoid,
                    userid: userid
                })
            } else {
                const d = await StudentLikeModel.findOne({
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
        return StudentLikeModel.getStudentLike(photoid);
    }
}

export default StudentLikeModel