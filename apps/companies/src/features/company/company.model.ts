import { CreationOptional, DataTypes, Model } from "sequelize";
import { db } from "../../lib/db";
import { TCompany, TCompanyBase } from "@ce/shared-core";
import { Json } from "sequelize/types/utils";

class CompanyModel extends Model<TCompany, TCompanyBase> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare address_label: string;
  declare street: string;
  declare street_number: string;
  declare postal_code: string;
  declare city: string;
  declare country: string;
  declare color: string;
  declare logo: string;
  declare key_phrases: Json;
  declare products_type: string;
  declare siret: string;
  declare phone_contact: string;
  declare email_contact: string;
  declare links: CreationOptional<Record<string, string>>;
  declare external_url: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

CompanyModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key_phrases: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    products_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    links: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    external_url: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "company", // We need to choose the model name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

export { CompanyModel };
