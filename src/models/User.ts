import {DataTypes} from "sequelize";
import sequelize from "../config/db";

import getAvatar from "../utils/randomAvatar";
import { createId } from "@paralleldrive/cuid2";
export enum ROLE{admin, moderator, user}
const User = sequelize.define("users", {
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
  username: {
    type: DataTypes.STRING,
  },
  auth_type: {
    type: DataTypes.STRING,
  },
  auth_id: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  root: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: ROLE.user,
  },
  _2FA: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  acc_balance: {
    type: DataTypes.STRING,
    defaultValue: "0",
  },
  restricted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  locale: {
    type: DataTypes.STRING,
    defaultValue: "en",
  },
  avatarId: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: getAvatar(),
  },
  lastLogin: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
});

export default User