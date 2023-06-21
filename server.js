// Node Server
const express = require('express');
const axios = require('axios'); //promised-based HTTP client for JavaScript

const app = express();
const PORT = 3001;

// API endpoint for fetching products
const API_URL = 'https://devcore02.cimet.io/v1/plan-list';
const API_KEY = '4NKQ3-815C2-8T5Q2-16318-55301';

// Set up CORS headers to allow requests from your React app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route handler for fetching products
app.post('/api/plan-list', async (req, res) => {
  try {
    // Generate the token using the token API
    const tokenResponse = await axios.post('https://devcore02.cimet.io/v1/generate-token',{} , {
        headers:{
            'Api-key': API_KEY,
        }
    });


    const authToken = tokenResponse.data.data.token;



const requestBody = {
    session_id: 'eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9'
  };
  
  const productsResponse = await axios.post(API_URL, requestBody, {
    headers: {
      'Api-key': API_KEY,
      'Auth-token': authToken
    }
  });




    const products = productsResponse.data.data.electricity;

    res.json(products); // sends a Json response
  } catch (error) { 
    console.error('An error occurred while fetching products:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
