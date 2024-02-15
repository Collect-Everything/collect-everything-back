import { CreationOptional, DataTypes, Model } from "sequelize";
import { db } from "../../lib/db";
import { TCustomer, TCustomerBase } from "@ce/shared-core";

class CustomerModel extends Model<TCustomer, TCustomerBase> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare role_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

CustomerModel.init(
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
    role_id: {
      type: DataTypes.INTEGER,
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
    modelName: "Customer", // We need to choose the model name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export { CustomerModel };