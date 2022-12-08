const sql = require('mssql');
const logger = require('../util/logger');
const {preferences} = require('../model/setting-data');

const sqlConfig = {
  user: preferences.db_user,
  password: preferences.db_password,
  database: preferences.db_name,
  server: preferences.db_ip,
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
      "database_name": preferences.db_name,
      "database_ip": preferences.db_ip,
      "message": ""
  }
    try{
      sql.connect(sqlConfig, err=>{
        if(err){
          connectionStatus = {
            "connected": false,
            "message": `Database connection failed \n ${err}`
        }
          logger.error(`Error Connect To Database \n ${err}`)
          resolve(connectionStatus);
        }else{
          connectionStatus = {
            "connected": true,
            "message": "Success"
        }
        resolve(connectionStatus)
        }
      })
    }catch(err){
      logger.error(`Error Check Database Connection \n ${err}`)
      connectionStatus = {
        "connected": false,
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