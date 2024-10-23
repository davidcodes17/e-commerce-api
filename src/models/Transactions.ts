import { DataTypes } from "sequelize";
import db from "../config/db";

const Transactions = db.define("transactions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  seller_id: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.STRING,
  },
  currency: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "initiate",
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  transaction_id: {
    type: DataTypes.STRING,
  },
  ip: {
    type: DataTypes.STRING,
  },
  narration: {
    type: DataTypes.STRING,
  },
  summary: {
    type: DataTypes.STRING,
  },
  app_fee: {
    type: DataTypes.STRING,
  },
  fee: {
    type: DataTypes.STRING,
  },
  amount_settled:{
    type:DataTypes.STRING
  }
});

export default Transactions;
