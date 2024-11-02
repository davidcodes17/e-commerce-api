import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { createId } from "@paralleldrive/cuid2";
const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue: createId(),
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
