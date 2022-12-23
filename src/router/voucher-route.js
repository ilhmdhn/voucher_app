const multer  = require('multer')
const express = require("express");
const {getInvoiceCode, insertVoucher, getInvoiceDetail, insertVoucherFile, getVoucherHistory} = require('../controller/voucher-controller');
const upload = multer({ dest: 'uploads/' })
const voucherRoute = express.Router();


voucherRoute.get('/', (req, res) => {
    res.render('datatransaksi', { title: 'Voucher Generate App' });
});
voucherRoute.get('/invoice-code', getInvoiceCode);
voucherRoute.get('/invoice-detail', getInvoiceDetail);
voucherRoute.post('/voucher', insertVoucher);
voucherRoute.get('/history', (req, response)=>{
    response.render('history')
});
voucherRoute.post('/voucher-file', upload.single('voucherFile'), insertVoucherFile);
voucherRoute.get('/voucher-history', getVoucherHistory);

module.exports = voucherRoute;