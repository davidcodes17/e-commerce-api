import {DataTypes} from "sequelize";
import sequelize from "../config/db";
import { createId } from "@paralleldrive/cuid2";
const Token = sequelize.define("token", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue:createId(),
    allowNull: false,
    unique:true
  },
  user_id:{
    type:DataTypes.STRING,
    allowNull:false
  },
  type:{
    type:DataTypes.STRING,
    allowNull:false
    // reset || verify
  },
  token:{
    type: DataTypes.STRING,
    // defaultValue:uuid.v1() || randomID(),
    allowNull: false,
  },
  expiresOn:{
    type: DataTypes.DATE,
    defaultValue: new Date(Date.now() + 60 * 60 * 1000) // 1hr
  }
});

export default Token