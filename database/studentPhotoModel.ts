import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class StudentPhotoModel extends Model {
    static register() {
        StudentPhotoModel.init({
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
            modelName: 't_student_photos',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime', 'updatetime'] }]
        });
        StudentPhotoModel.sync({alter: true}).catch(() => {})
    }

    static async getStudentPhotoList(page: number, count: number, userid: string) {
        try {
            const data = await StudentPhotoModel.findAll({
                attributes: {
                    include: [
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_student_likes
                                WHERE t_student_likes.photoid = t_student_photos.id
                            )`),
                            'likenum'
                        ],
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_student_likes
                                WHERE t_student_likes.photoid = t_student_photos.id AND t_student_likes.userid = '${userid}' LIMIT 1
                            )`),
                            'mylike'
                        ]
                    ]
                },
                order:  [['createtime', 'DESC']],
                limit: count,
                offset: page * count,
                raw: true
            })
            return data ?? []
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async getStudentPhoto(id: string, userid: string) {
        try {
            const data = await StudentPhotoModel.findOne({
                attributes: {
                    include: [
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_student_likes
                                WHERE t_student_likes.photoid = t_student_photos.id
                            )`),
                            'likenum'
                        ],
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_student_likes
                                WHERE t_student_likes.photoid = t_student_photos.id AND t_student_likes.userid = '${userid}' LIMIT 1
                            )`),
                            'mylike'
                        ]
                    ]
                },
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


    static async addStudentPhoto(name: string, desc: string, info: string) {
        try {
            const data = await StudentPhotoModel.create({
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

    static async updateStudentPhoto(id: string, name: string, desc: string, info: string) {
        try {
            const data = await StudentPhotoModel.findOne({
                where: { id: id }
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

    static async deleteStudentPhoto(id: string) {
        try {
            const data = await StudentPhotoModel.findOne({
                where: { id: id }
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

export default StudentPhotoModel