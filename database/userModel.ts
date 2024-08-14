import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class UserModel extends Model {
    static register() {
        UserModel.init({
            userid: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            admin: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
                allowNull: false
            },
            createtime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_users',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'sort'] }]
        });
        UserModel.sync({alter: true}).catch(() => {})
    }
}

export default UserModel