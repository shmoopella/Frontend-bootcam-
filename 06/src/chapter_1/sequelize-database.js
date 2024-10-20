"use strict"

const Sequelize= require("sequelize");

const db = new Sequelize("cafedb", "admin", "admin", {
  dialect: "postgres",
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false
  }
});

module.exports = db;
