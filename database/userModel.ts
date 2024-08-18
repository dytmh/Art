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
            remark: {
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

    static async findOrCreateUser(userid: string, name: string, avatar: string) {
        const [user, created] = await UserModel.findOrCreate({
            where: { userid: userid },
            defaults: {
                userid: userid,
                name: name,
                avatar: avatar,
                admin: 0
            },
            raw: true
          })
          if (created) {
            return user?.dataValues
          }
          return user
    }

    static async findUser(userid: string) {
        const user = await UserModel.findOne({
            where: { userid: userid },
            raw: true
        })
        return user
    }
}

export default UserModel