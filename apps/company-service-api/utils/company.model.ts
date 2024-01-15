const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const Company = sequelize.define("company", {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.NUMBER },
  email: { type: DataTypes.STRING },
  address_num: { type: DataTypes.JSON },
  address_street: { type: DataTypes.JSON },
  color: DataTypes.JSON,
  logo: DataTypes.STRING,
  key_phrase: DataTypes.JSON,
  products_type: DataTypes.JSON,
  siret: DataTypes.STRING,
  phone_contact: DataTypes.NUMBER,
  email_contact: { type: DataTypes.STRING, allowNull: false },
  link: DataTypes.JSON,
  external_url: DataTypes.JSON,
});
