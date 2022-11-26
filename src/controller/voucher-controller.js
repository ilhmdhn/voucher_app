const {response} = require('../util/response-format')
const logger = require('../util/logger');
const { getInvoiceHint } = require('../model/invoice-data');
const axios = require('axios');

const getInvoiceCode = async(req, res) =>{
    try{
        const ivc = req.body.invoice;

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

const insertVoucher = async(req, res) =>{
    try{
        
        const name = req.body.name;
        const invoice = req.body.invoice;
        const instagram = req.body.instagram;
        const phone = req.body.phone;
        const email = req.body.email;
        const ktp = req.body.ktp;

        const detailVoucher = {
            outlet_code : "hp1",
            invoice_code : invoice,
            guest_name : name,
            guest_instagram : instagram,
            guest_phone : phone,
            guest_email : email,
            guest_ktp : ktp,
            guest_charge : "1000",
            transaction_date : "1nov2022"
          }
          const httpHeader ={
            'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2ODc2MzUyNCwiaWF0IjoxNjY4NzYzNTI0fQ.vhvAqgf7Ie98XGf_plyboGnGSsECEtNIQ4VmG8BzsVs'
          }
          axios.post('localhost:3025/voucher', 3000, httpHeader,{
            detailVoucher
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }catch(err){
        res.send(response(false, null, 'Fail insert voucher'));
    }
}

insertVoucher();