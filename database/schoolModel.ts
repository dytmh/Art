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
            },
            address: {
                type: DataTypes.STRING,
            },
            creaettime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatetime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            sort: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
          }, { 
            sequelize: ModelSequelize.getSequelize(),
            modelName: 't_school',
            indexes: [{ unique: false, fields: ['name', 'sort'] }]
        });
        SchoolModel.sync({alter: true})
    }
}

export default SchoolModel