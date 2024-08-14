import { Sequelize } from 'sequelize'

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");

class ModelSequelize {
    static _sequelize: Sequelize

    static getSequelize(): Sequelize {
        if (!ModelSequelize._sequelize) {
            ModelSequelize._sequelize = new Sequelize("art", MYSQL_USERNAME!, MYSQL_PASSWORD, {
            host,
            port : Number.parseInt(port),
            dialect: "mysql",
            })

            ModelSequelize.testConnect()
        }
        return ModelSequelize._sequelize
    }

    static async testConnect(){
        try {
            await ModelSequelize.getSequelize().authenticate();
            console.log('数据库连接已成功建立.');
          } catch (error) {
            console.error('无法连接到数据库:', error);
          }
    }
}

export default ModelSequelize