import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class StudentModel extends Model {
    static register() {
        StudentModel.init({
            student_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createtime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_students',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime'] }]
        });
        StudentModel.sync({alter: true}).catch(() => {})
    }
}

export default StudentModel