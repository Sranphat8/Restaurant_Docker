import {Sequelize} from "sequelize";
import dbConfig from "../config/db.config.js"; 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.DBPORT,
    dialect: dbConfig.dialect,
    logging: false,
});

const testConnection = async () => { 
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
};

testConnection();
export default sequelize;