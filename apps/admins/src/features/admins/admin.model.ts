import { CreationOptional, DataTypes, Model } from "sequelize";
import { db } from "../../lib/db";
import { CreateAdminDto, TAdmin } from "@ce/shared-core";

class AdminModel extends Model<TAdmin, CreateAdminDto> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

AdminModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: "admin_user", // We need to choose the model name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export { AdminModel };
