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
            modelName: 't_student',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime'] }]
        });
        StudentModel.sync({alter: true})
    }
}

export default StudentModel