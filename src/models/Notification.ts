import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import { createId } from "@paralleldrive/cuid2";
export enum NotificationType {
  order = "order",
  transaction="transaction"
}

const Notification = sequelize.define("notifications", {
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
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ref: {
    type: DataTypes.JSON,
  },

  title: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  markAsRead: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
});

export default Notification;
