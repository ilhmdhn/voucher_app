const {response} = require('../util/response-format')
const logger = require('../util/logger');
const { getInvoiceHint, getInvoiceData, getInvoicDetaileData, updateVoucherEmailed } = require('../model/invoice-data');
const {outletInfoData} = require('../model/outlet-data');
const axios = require('axios');
const {preferences} = require('../model/setting-data');

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
    const ivc = req.query.search.value;

    if(ivc == '' || ivc == undefined || ivc == null){
        res.send(response(false, null, 'ivc not set'));
        return;
    }

    const invoiceData =  await getInvoicDetaileData(ivc)
    res.json(
      {
        aaData: invoiceData
      }
    );

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
        const fullOutletCode = preferences.outlet_code;

        if(invoiceData.state == false){
          res.send(response(false, null, 'invalid invoice'));
          return;
        }

        const voucherCodeTemp = outletCode + invoiceData.data.transaction_date_for_voucher;
          const instance = axios.create({
            baseURL: 'http://192.168.1.248:3025/',
            timeout: 30000,
            headers: {
              'authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2ODc2MzUyNCwiaWF0IjoxNjY4NzYzNTI0fQ.vhvAqgf7Ie98XGf_plyboGnGSsECEtNIQ4VmG8BzsVs'
            }
          });
          const apiResponse = await instance.post("voucher", {
                'voucher_code_temp': voucherCodeTemp,
                'outlet_code' : outletCode,
                'invoice_code' : invoice,
                'guest_name' : name,
                'guest_instagram' : instagram,
                'guest_phone' : phone,
                'guest_email' : email,
                'full_outlet_code' : fullOutletCode,
                'guest_ktp' : ktp,
                'guest_charge' : invoiceData.data.original_fee,
                'transaction_date' : invoiceData.data.transaction_date
            });
          if(apiResponse.status == 200){
                if(apiResponse.data.state){
                  await updateVoucherEmailed(invoice);
                }
                res.send(response(apiResponse.data.state, null, apiResponse.data.message))
          }else{
                throw apiResponse.statusText;
          }
            

    }catch(err){
        res.send(response(false, null, 'Fail insert voucher'));
        logger.error('insertVoucher '+err);
    }
}

module.exports = {
  getInvoiceCode,
  insertVoucher,
  getInvoiceDetail
}