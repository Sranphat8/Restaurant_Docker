import { DataTypes } from "sequelize"
import sequelize from "./db.js"
const Restaurant = sequelize.define("Restaurant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Restaurant.sync({ force: false }).then(() => {
    console.log("Table created or already exists.");
}).catch((error) => {
    console.log("Error creating Restaurant table:", error);
});
export default Restaurant;