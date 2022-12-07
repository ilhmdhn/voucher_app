const express = require("express");
const preferencesRoute = express.Router();
const {setPreferences, getPreferences} = require('../controller/preferences-controller')

preferencesRoute.post('/preferences',setPreferences);
preferencesRoute.get('/preferences', (req, res)=>{
    // res.render
});
preferencesRoute.get('/preferences-setting', getPreferences);
module.exports = preferencesRoute;