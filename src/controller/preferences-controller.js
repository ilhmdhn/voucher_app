const {response} = require('../util/response-format')
const logger = require('../util/logger');
const {setPreferencesData, preferences} = require('../model/setting-data');
const {connectionDbCheck} = require('../util/db-connection');

const setPreferences = async(req, res)=>{
    try{
        const outlet_code = req.body.outlet_code.trim();
        const databaseIp = req.body.database_ip.trim();
        const dbName = req.body.database_name.trim();
        const dbUser = req.body.database_user.trim();
        const dbPassword = req.body.database_password.trim();
        if(outlet_code == ''|| databaseIp == '' || dbName == '' || dbUser == '' || dbPassword == '' || outlet_code == 'undefined'|| databaseIp == 'undefined' || dbName == 'undefined' || dbUser == 'undefined' || dbPassword == 'undefined'){
            res.send(response(false, null, 'data tidak lengkap'));
            return
        }

        await setPreferencesData(databaseIp, dbName, dbUser, dbPassword, outlet_code);
        res.send(response(true, null, 'Set Preferences Success'));
    }catch(err){
        logger.error(`setPreferences\n${err}`);
        res.send(response(false, null, 'Set preferences failed'));
    }
}

const getPreferences = async(req, res)=>{
    try{
        console.log('settingannya', JSON.stringify(preferences));
        res.send(response(true, preferences))
    }catch(err){
        logger.error(`getPreferences\n${err}`);
        res.send(response(false, null, 'error'));
    }
}

const getConnectionState = async(req, res)=>{
    try{
        res.send(response(true, await connectionDbCheck()))
    }catch(err){
        res.send(response(false, null, 'server error'));
    }
}

module.exports = {
    setPreferences,
    getPreferences,
    getConnectionState
}