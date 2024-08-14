import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class TeacherModel extends Model {
    static register() {
        TeacherModel.init({
            teacher_id: {
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
            modelName: 't_teachers',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'createtime'] }]
        });
        TeacherModel.sync({alter: true}).catch(() => {})
    }
}

export default TeacherModel