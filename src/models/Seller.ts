import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { createId } from "@paralleldrive/cuid2";
const Seller = sequelize.define("seller", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    unique:true,
    defaultValue: createId(),
    allowNull: false,
  },
  shop_icon: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shop_category: {
    type: DataTypes.STRING,
    defaultValue: "", // seperated by comma
  },

  pin: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  balance: {
    type: DataTypes.STRING,
    defaultValue: "0",
  },
  shop_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },

  verification_type: {
    type: DataTypes.STRING, // nin, bvn, passport
  },

  verification_number:{
    type:DataTypes.STRING
  },

  verification_image_front:{
    type:DataTypes.STRING
  },
  verification_image_back:{
    type:DataTypes.STRING
  },

  KYCverified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  region:{
    type:DataTypes.STRING, // country
    allowNull:false
  },

  delivery_zone:{
    type:DataTypes.STRING,
    allowNull:false // 
  },

  shop_desc: {
    type: DataTypes.STRING,
    defaultValue: "",
  },

  product_sold: {
    type: DataTypes.STRING,
    defaultValue: "0",
  },

  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

    verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  verified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
  },
});

export default Seller;
