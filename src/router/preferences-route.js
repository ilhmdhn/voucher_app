const express = require("express");
const preferencesRoute = express.Router();
const {setPreferences, getPreferences, getConnectionState} = require('../controller/preferences-controller')

preferencesRoute.post('/preferences',setPreferences);
preferencesRoute.get('/preferences', (req, res)=>{
    res.render('preferences', { title: 'Preferences' });
});
preferencesRoute.get('/preferences-setting', getPreferences);
preferencesRoute.get('/connection-test', getConnectionState);
module.exports = preferencesRoute;