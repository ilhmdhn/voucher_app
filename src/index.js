require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT;

const voucherRoute = require('../src/router/voucher-route');
app.listen(port, async()=>{
    console.log(`App Running on ${port} port`);
});

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));

app.use(voucherRoute);