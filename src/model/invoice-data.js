const sql = require("mssql");
const {sqlConfig} = require('../util/db-connection');
const logger = require('../util/logger');
const {response} = require('../util/response-format')

const getInvoiceHint = (data) =>{
    return new Promise((resolve, reject)=>{
        try{
            
            const query = `
            SELECT TOP 10 
                [Invoice] as invoice 
            FROM 
                dbo.IHP_Ivc
            WHERE 
                ([Total_All] - [Service_Kamar] - [Tax_Kamar] - [Service_Penjualan] - [Tax_Penjualan]) >= 100000
            AND
                Invoice LIKE '${data}%'`;
            sql.connect(sqlConfig, err=>{
                if(err){
                    reject(`Can't connect to database\n${err}`);                    
                }else{
                    new sql.Request().query(query, (err, result)=>{
                        if(result.recordset.length>0){
                            resolve(response(true, result.recordset));
                        }else{
                            resolve(response(false, null, 'Data Kosong'));
                        }
                    });
                }
            });
        }catch(err){
            reject(`getInvoiceHint\n${err}`);
        }
    });
}

const getInvoiceData = (ivc) =>{
    return new Promise((resolve, reject) =>{
        try{
          const query = `
        SELECT
            [Invoice] as invoice, 
            [Nama] as name, 
            [Kamar] as room, 
            [Total_Kamar] as room_charge, 
            [Total_Penjualan] as fnb_charge, 
            ([Total_All] - [Service_Kamar] - [Tax_Kamar] - [Service_Penjualan] - [Tax_Penjualan]) as original_fee,
            [Total_All] as total_charge, 
            CONVERT(varchar, [Date_Trans], 103) as transaction_date,
            CONVERT(varchar, [Date_Trans], 12) as transaction_date_for_voucher,
            [Jenis_Kamar] as room_type 
        FROM 
            hp112.[dbo].[IHP_Ivc] 
        WHERE
            ([Total_All] - [Service_Kamar] - [Tax_Kamar] - [Service_Penjualan] - [Tax_Penjualan]) >= 100000
        AND
            [Invoice] = '${ivc}'
        `;
        sql.connect(sqlConfig, err=>{
            if(err){
                reject(`Can't connect to database\n${err}`);                    
            }else{
                new sql.Request().query(query, (err, result)=>{
                    if(result.recordset.length>0){
                        resolve(response(true, result.recordset[0]));
                    }else{
                        resolve(response(false, null, 'Data Kosong'));
                    }
                });
            }
        });
        }catch(err){
            reject(`getInvoiceDetail ${err}`);
        }
      });
}

module.exports = {
    getInvoiceHint,
    getInvoiceData
}