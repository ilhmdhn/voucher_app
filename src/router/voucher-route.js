const express = require("express");
const {getInvoiceCode, insertVoucher, getInvoiceDetail} = require('../controller/voucher-controller');
const voucherRoute = express.Router();


voucherRoute.get('/', (req, res) => {
    res.render('datatransaksi', { title: 'Voucher Generate App' });
});
voucherRoute.get('/invoice-code', getInvoiceCode);
voucherRoute.get('/invoice-detail', getInvoiceDetail);
voucherRoute.post('/voucher', insertVoucher);

module.exports = voucherRoute;