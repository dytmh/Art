import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class StudentPhotoResModel extends Model {
    static register() {
        StudentPhotoResModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            photo_id: {
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
            modelName: 't_student_photo_res',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['photo_id', 'sort'] }]
        });
        StudentPhotoResModel.sync({alter: true}).catch(() => {})
    }
}

export default StudentPhotoResModel