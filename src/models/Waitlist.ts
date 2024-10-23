import { DataTypes } from "sequelize";
import db from "../config/db";
import { nanoid } from "nanoid";

export enum WaitlistType {
    seller="seller",
    buyer="buyer"
}

const Waitlist = db.define("waitlist", {
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
    defaultValue: nanoid(),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Waitlist;
