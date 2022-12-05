require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const port = process.env.SERVER_PORT;
const {addVoucherSendColumnOnIhp_Ivc} = require('./util/add-table')
const voucherRoute = require('../src/router/voucher-route');

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const loggerRequest = (req, res, next) =>{
    logger.info(`Receive request ${req.method} ${req.originalUrl}`)
    next()
}
app.listen(port, async()=>{
    await addVoucherSendColumnOnIhp_Ivc()
    console.log(`App Running on ${port} port`);
});

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));
app.use(loggerRequest);

app.use(voucherRoute);