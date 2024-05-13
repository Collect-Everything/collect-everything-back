import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Json } from "sequelize/lib/utils";

export interface CompanyModel
  extends Model<
    InferAttributes<CompanyModel>,
    InferCreationAttributes<CompanyModel>
  > {
  id: string;
  name: string;
  phone: string;
  email: string;
  address_label: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  country: string;
  password: string;
  color: CreationOptional<string>;
  logo: CreationOptional<string>;
  key_phrases: CreationOptional<Json>;
  products_type: CreationOptional<string>;
  siret: CreationOptional<string>;
  phone_contact: CreationOptional<string>;
  email_contact: CreationOptional<string>;
  links: CreationOptional<Record<string, string>>;
  external_url: CreationOptional<string>;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
  deleted_at: CreationOptional<Date>;
}

export const getCompanyModel = (sequelize: Sequelize) =>
  sequelize.define<CompanyModel>(
    "company",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
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
      password: {
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    },
  );
