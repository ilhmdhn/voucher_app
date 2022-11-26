const sql = require('mssql');
const express = require('express');
const app = express();
const logger = require('../util/logger');
require('dotenv').config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_IP_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

const connectionDbCheck = () =>{
  return new Promise((resolve, reject)=>{
    let connectionStatus = {
      "connected": false,
      "database_name": process.env.DB_NAME,
      "database_ip": process.env.DB_IP_SERVER,
      "message": ""
  }
    try{
      sql.connect(sqlConfig, err=>{
        if(err){
          connectionStatus = {
            "connected": false,
            "database_name": process.env.DB_NAME,
            "database_ip": process.env.DB_IP_SERVER,
            "message": `Database connection failed \n ${err}`
        }
          logger.error(`Error Connect To Database \n ${err}`)
          resolve(connectionStatus);
        }else{
          connectionStatus = {
            "connected": true,
            "database_name": process.env.DB_NAME,
            "database_ip": process.env.DB_IP_SERVER,
            "message": "Success"
        }
        resolve(connectionStatus)
        }
      })
    }catch(err){
      logger.error(`Error Check Database Connection \n ${err}`)
      connectionStatus = {
        "connected": false,
        "database_name": process.env.DB_NAME,
        "database_ip": process.env.DB_IP_SERVER,
        "message": err
    }
      resolve(connectionStatus)
    }
  });
}

module.exports = {
    sqlConfig,
    connectionDbCheck
}