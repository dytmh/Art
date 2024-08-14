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
            teacher_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true
            },
            url: {
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
            modelName: 't_teacher_photo',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime', 'updatetime', 'teacher_id'] }]
        });
        TeacherPhotoModel.sync({alter: true}).catch(() => {})
    }
}

export default TeacherPhotoModel