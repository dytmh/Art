import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class SchoolModel extends Model {
    static register() {
        SchoolModel.init({
            school_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
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
            },
            sort: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_schools',
            createdAt: 'createtime',
            updatedAt: 'updatetime',
            indexes: [{ name: 'index', unique: false, fields: ['name', 'sort'] }]
        });
        SchoolModel.sync({alter: true}).catch(() => {})
    }
}

export default SchoolModel