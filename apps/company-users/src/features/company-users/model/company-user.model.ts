import { CreationOptional, DataTypes, Model } from "sequelize";
import { db } from "../../../lib/db";
import { COMPANY_USER_ROLES, CompanyUserRole } from "./roles";
import { CreateCompanyUser } from "../dto/create-company-user.dto";

export interface CompanyUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: CompanyUserRole;
  company_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

class CompanyUserModel extends Model<CompanyUser, CreateCompanyUser> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare role: CompanyUserRole;
  declare company_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

CompanyUserModel.init(
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
    role: {
      type: DataTypes.ENUM(...COMPANY_USER_ROLES),
      allowNull: false,
    },
    company_id: {
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
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: "company_users", // We need to choose the model name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

export { CompanyUserModel };