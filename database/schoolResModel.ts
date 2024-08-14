import { DataTypes, Model } from "sequelize";
import ModelSequelize from "./modelSequelize";


class SchoolResModel extends Model {
    static register() {
        SchoolResModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            school_id: {
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
            modelName: 't_school_res',
            indexes: [{ name: 'index', unique: false, fields: ['school_id', 'sort'] }]
        });
        SchoolResModel.sync({alter: true})
    }
}

export default SchoolResModel