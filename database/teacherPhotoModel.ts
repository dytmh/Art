import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class TeacherPhotoModel extends Model {
    static register() {
        TeacherPhotoModel.init({
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
            modelName: 't_teacher_photos',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime', 'updatetime'] }]
        });
        TeacherPhotoModel.sync({alter: true}).catch(() => {})
    }

    static async getTeacherPhotoList(page: number, count: number, userid: string) {
        try {
            const data = await TeacherPhotoModel.findAll({
                attributes: {
                    include: [
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_teacher_likes
                                WHERE t_teacher_likes.photoid = t_teacher_photos.id
                            )`),
                            'likenum'
                        ],
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_teacher_likes
                                WHERE t_teacher_likes.photoid = t_teacher_photos.id AND t_teacher_likes.userid = '${userid}' LIMIT 1
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
            return data
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async getTeacherPhoto(id: string, userid: string) {
        try {
            const data = await TeacherPhotoModel.findOne({
                attributes: {
                    include: [
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_teacher_likes
                                WHERE t_teacher_likes.photoid = t_teacher_photos.id
                            )`),
                            'likenum'
                        ],
                        [
                            ModelSequelize.getSequelize().literal(`(
                                SELECT COUNT(*)
                                FROM t_teacher_likes
                                WHERE t_teacher_likes.photoid = t_teacher_photos.id AND t_teacher_likes.userid = '${userid}' LIMIT 1
                            )`),
                            'mylike'
                        ]
                    ]
                },
                where: { id },
                raw: true
            })
            return data ?? []
        }
        catch(e) {
            console.log(e)
        }
        return null
    }

    static async addTeacherPhoto(name: string, desc: string, info: string) {
        try {
            const data = await TeacherPhotoModel.create({
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

    static async updateTeacherPhoto(id: string, name: string, desc: string, info: string) {
        try {
            const data = await TeacherPhotoModel.findOne({
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

    static async deleteTeacherPhoto(id: string) {
        try {
            const data = await TeacherPhotoModel.findOne({
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

export default TeacherPhotoModel