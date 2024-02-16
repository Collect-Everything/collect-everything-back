import { CreationOptional, DataTypes, Model } from "sequelize";
import { db } from "../../lib/db";
import { TCompany, TCompanyBase } from "@ce/shared-core";

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
  declare key_phrases: string[];
  declare products_type: string;
  declare siret: string;
  declare phone_contact: string;
  declare email_contact: string;
  declare links: CreationOptional<Record<string, string>>;
  declare external_url: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
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
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key_phrases: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    products_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_contact: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: "company", // We need to choose the model name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
  },
);

export { CompanyModel };
