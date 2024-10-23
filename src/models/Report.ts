import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { createId } from "@paralleldrive/cuid2";

export enum reportType{
  user = "user",
  seller = "seller",
  product = "product",
  others = "others"
}

const Report = sequelize.define("report", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: createId(),
    allowNull: false,
  },
  reporter_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  reportee_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull:false
  },
  attachment: {
    type: DataTypes.STRING, //seperated by comma, 
  },
  type:{
    type: DataTypes.STRING,
    allowNull:false
  }
});

export default Report;
