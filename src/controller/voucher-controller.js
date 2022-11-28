const {response} = require('../util/response-format')
const logger = require('../util/logger');
const { getInvoiceHint, getInvoiceData } = require('../model/invoice-data');
const {outletInfoData} = require('../model/outlet-data');
const axios = require('axios');

const getInvoiceCode = async(req, res) =>{
    try{
        const ivc = req.query.invoice;

        if(ivc == '' || ivc == undefined || ivc == null){
            res.send(response(false, null, 'ivc not set'));
            return;
        }

        const invoiceCode =  await getInvoiceHint(ivc)
        res.send(invoiceCode);
    }catch(err){
        logger.error(`getInvoiceCode\n${err}`);
        res.send(response(false, null, `can't get invoice code`));
    }
}

const getInvoiceDetail = async(req, res) =>{
  try{
    const ivc = req.query.invoice;

    if(ivc == '' || ivc == undefined || ivc == null){
        res.send(response(false, null, 'ivc not set'));
        return;
    }

    const invoiceData =  await getInvoiceData(ivc)
    res.send(response(true, invoiceData));
  }catch(err){
    res.send(response(false, null, 'error get invoice data'));
    logger.error(`getInvoiceDetail\n${err}`);
  }
}

const insertVoucher = async(req, res) =>{
    try{
        
        const name = req.body.name;
        const invoice = req.body.invoice;
        const instagram = req.body.instagram;
        const phone = req.body.phone;
        const email = req.body.email;
        const ktp = req.body.ktp;

        const outletInfo = await outletInfoData();
        const outletCode = outletInfo.outlet_code;
        const invoiceData =  await getInvoiceData(invoice)

        if(invoiceData.state == false){
          res.send(response(false, null, 'invalid invoice'));
          return;
        }

        const voucherCodeTemp = outletCode + invoiceData.data.transaction_date_for_voucher;
        const detailVoucher = {
            voucher_code_temp: voucherCodeTemp,
            outlet_code : outletCode,
            invoice_code : invoice,
            guest_name : name,
            guest_instagram : instagram,
            guest_phone : phone,
            guest_email : email,
            guest_ktp : ktp,
            guest_charge : invoiceData.data.original_fee,
            transaction_date : invoiceData.data.transaction_date
          }

          console.log('detailVoucher\n'+JSON.stringify(detailVoucher));
          const httpHeader ={
            'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2ODc2MzUyNCwiaWF0IjoxNjY4NzYzNTI0fQ.vhvAqgf7Ie98XGf_plyboGnGSsECEtNIQ4VmG8BzsVs'
          }
          axios.post('http://192.168.1.248:3025/voucher', 3000, httpHeader,{
            detailVoucher
          })
          .then((res) => {
            console.log(res);
            res.send(response(true, null, 'Fail insert voucher'));
          })
          .catch((err) => {
            console.log(err);
            res.send(response(false, null, 'Fail insert voucher'));
          });
    }catch(err){
        res.send(response(false, null, 'Fail insert voucher'));
    }
}

module.exports = {
  getInvoiceCode,
  insertVoucher,
  getInvoiceDetail
}