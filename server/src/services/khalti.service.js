const axios = require('axios');

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
const KHALTI_BASE_URL = process.env.KHALTI_BASE_URL || 'https://a.khalti.com/api/v2';

const khaltiClient = axios.create({
  baseURL: KHALTI_BASE_URL,
  headers: {
    'Authorization': `Key ${KHALTI_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

const initiatePayment = async (amount, purchaseOrderId, purchaseOrderName, returnUrl, websiteUrl) => {
  try {
    const response = await khaltiClient.post('/epayment/initiate/', {
      return_url: returnUrl,
      website_url: websiteUrl,
      amount: amount * 100, // Khalti expects amount in paisa
      purchase_order_id: purchaseOrderId.toString(),
      purchase_order_name: purchaseOrderName
    });
    return response.data;
  } catch (error) {
    console.error('Khalti Initiation Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to initiate payment with Khalti');
  }
};

const verifyPayment = async (pidx) => {
  try {
    const response = await khaltiClient.post('/epayment/lookup/', { pidx });
    return response.data;
  } catch (error) {
    console.error('Khalti Verification Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to verify payment with Khalti');
  }
};

module.exports = {
  initiatePayment,
  verifyPayment
};
