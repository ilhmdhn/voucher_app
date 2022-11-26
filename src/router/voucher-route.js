const express = require("express");
const {getInvoiceCode, insertVoucher} = require('../controller/voucher-controller');
const voucherRoute = express.Router();

voucherRoute.get('/invoice-code', getInvoiceCode);
voucherRoute.get('/invoice-detail');
voucherRoute.post('/voucher', insertVoucher);

module.exports = voucherRoute;