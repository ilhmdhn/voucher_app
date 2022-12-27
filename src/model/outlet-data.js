const sql = require("mssql");
const {sqlConfig} = require('../util/db-connection');

const outletInfoData = () =>{
    return new Promise((resolve, reject) =>{
        try{
            const query = `
            SELECT [Outlet] outlet_code,[Nama_Outlet] outlet_name,SUBSTRING([Nama_Outlet], 1, 1) as outlet_initial ,[Alamat_Outlet] outlet_address FROM [dbo].[IHP_Config] WHERE [DATA] = '1'
            `;

            sql.connect(sqlConfig, err=>{
                if(err){
                    reject(`Can't connect to database\n${err}`);                    
                }else{
                    new sql.Request().query(query, (err, result)=>{
                        if(err){
                            reject(`getOutletInfo query\n${err}\n${query}`);   
                        }else{
                            if(result.recordset.length>0){
                                resolve(result.recordset[0]);
                            }else{
                                resolve(false);
                            }
                        }
                    });
                }
            });

        }catch(err){
            reject(`getOutletInfo\n${err}`);       
        }
    })
}

module.exports ={
    outletInfoData
}