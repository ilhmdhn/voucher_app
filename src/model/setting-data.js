const Store = require('electron-store');
const store = new Store();
require('dotenv').config();

    const preferences={
        server_port: 3056,
        outlet_code: process.env.KODE_OUTLET,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME,
        db_ip: process.env.DB_IP_SERVER}
    

    const preferences2 = {
        server_port: 3056,
        is_set: store.get('has_set'),
        db_user: store.get('db_user'),
        db_password: store.get('db_password'),
        db_name: store.get('db_name'),
        db_ip: store.get('db_ip')
    }

    const setPreferencesData = (db_ip, db_name, db_user, db_password)=>{
        return new Promise((resolve, reject)=>{
            try{
                store.get('has_set', true)
                store.get('db_ip', db_ip)
                store.get('db_name', db_name)
                store.get('db_password', db_user)
                store.get('db_user', db_password)
                resolve(true)        
            }catch(err){
                reject(`setPreferences\n${err}`);
            }
        })
    }
module.exports = {
    preferences,
    setPreferencesData
};