const sql = require("mssql");
const {sqlConfig} = require('../util/db-connection');
const logger = require('../util/logger');
const {response} = require('../util/response-format')

const getInvoiceHint = (data) =>{
    return new Promise((resolve, reject)=>{
        try{
            
            const query = `SELECT TOP 10 [Invoice] FROM dbo.IHP_Ivc WHERE Invoice LIKE '${data}%'`;

            sql.connect(sqlConfig, err=>{
                if(err){
                    reject(`Can't connect to database\n${err}`);                    
                }else{
                    new sql.Request().query(query, (err, result)=>{
                        if(result.recordset.length>0){
                            resolve(response(false, null, 'Data Kosong'));
                        }else{
                            resolve(response(true, result.recordset));
                        }
                    });
                }
            });
        }catch(err){
            reject(`getInvoiceHint\n${err}`);
        }
    });
}

const getInvoiceDetail = (ivc) =>{
    return new Promise((resolve, reject) =>{
        try{
          const query = `
          SELECT [Total_Kamar], []
          `
        }catch(err){
    
        }
      })
}

module.exports = {
    getInvoiceHint
}