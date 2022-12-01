const sql = require("mssql");
const {sqlConfig} = require('./db-connection');

const addVoucherSendColumnOnIhp_Ivc = () =>{
    return new Promise((resolve,reject)=>{
        try{
            const query = `
                IF NOT EXISTS (SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='IHP_Ivc' AND COLUMN_NAME ='emailed_voucher')
                BEGIN
                ALTER TABLE IHP_Ivc ADD emailed_voucher [smallint] NULL
                END
            `
            sql.connect(sqlConfig, err=>{
                if(err){
                    reject(`Can't connect to database\n${err}`);
                }else{
                    new sql.Request().query(query, (err, result)=>{
                        if(err){
                            reject(`addVoucherSendColumnOnIhp_Ivc query \n${err}\n${query}`);
                        }else{
                            resolve(true)
                        }
                    });
                }
            });

        }catch(err){
            reject(`addVoucherSendColumnOnIhp_Ivc\n${err}`);
        }
    })
}

module.exports={
    addVoucherSendColumnOnIhp_Ivc
}