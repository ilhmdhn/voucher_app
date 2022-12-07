const {response} = require('../util/response-format')
const logger = require('../util/logger');
const {setPreferencesData, preferences} = require('../model/setting-data');

const setPreferences = async(req, res)=>{
    try{
        const databaseIp = req.body.database_ip;
        const dbName = req.body.database_name;
        const dbUser = req.body.database_user;
        const dbPassword = req.body.database_password;

        await setPreferencesData(databaseIp, dbName, dbUser, dbPassword);
        res.send(response(true, null, 'Set Preferences Success'));
    }catch(err){
        logger.error(`setPreferences\n${err}`);
        res.send(response(false, null, 'Set preferences failed'));
    }
}

const getPreferences = async(req, res)=>{
    try{
        res.send(response(true, preferences))
    }catch(err){
        logger.error(`getPreferences\n${err}`);
        res.send(response(false, null, 'error'));
    }
}

module.exports = {
    setPreferences,
    getPreferences
}