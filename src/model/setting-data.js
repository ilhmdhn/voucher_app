const Store = require('electron-store');
const store = new Store();
    
    const preferences = {
        server_port: 3056,
        outlet_code: store.get('outlet_code'),
        is_set: store.get('has_set'),
        db_user: store.get('db_user'),
        db_password: store.get('db_password'),
        db_name: store.get('db_name'),
        db_ip: store.get('db_ip')
    }

    const setPreferencesData = (db_ip, db_name, db_user, db_password, outlet_code)=>{
        return new Promise((resolve, reject)=>{
            try{
                
                store.delete('has_set')
                store.delete('outlet_code')
                store.delete('db_ip')
                store.delete('db_name')
                store.delete('db_password')
                store.delete('db_user')

                store.set('has_set', true)
                store.set('outlet_code', outlet_code)
                store.set('db_ip', db_ip)
                store.set('db_name', db_name)
                store.set('db_password', db_password)
                store.set('db_user', db_user)
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