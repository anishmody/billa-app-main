import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// API endpoint for fetching products
const API_URL = 'https://devcore02.cimet.io/v1/plan-list';
const API_KEY = '4NKQ3-815C2-8T5Q2-16318-55301';

// Cache to store tokens and their expiration time for each user
const tokenCache: { [userId: string]: { token: string; expirationTime: number } } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = 'user123'; // Replace with your own user identification mechanism

    let authToken = tokenCache[userId]?.token;
    const expirationTime = tokenCache[userId]?.expirationTime;

    // Check if token exists and is not expired
    if (!authToken || Date.now() > expirationTime) {
      // Generate the token using the token API
      const tokenResponse = await axios.post(
        'https://devcore02.cimet.io/v1/generate-token',
        {},
        {
          headers: {
            'Api-key': API_KEY,
          },
        }
      );

      authToken = tokenResponse.data.data.token;
      const expirationTime = Date.now() + tokenResponse.data.data.expires_in * 1000; // Calculate the expiration time

      // Store the token and its expiration time in the cache
      tokenCache[userId] = { token: authToken, expirationTime };
    }

    const requestBody = {
      session_id:
        'eyJpdiI6IkVNUkZ1N0hlSHhHSnJ3Vjl4aUlxc0E9PSIsInZhbHVlIjoieFlxa1wvVDYxQWl5U2pxMDFcL0R6ZVVvdEN6Mkk0R29TRDN3ZnN0U3VGcER0cEFMa2NVb0xNcDJudjlRTHRUbGJkIiwibWFjIjoiMTE0MmU0MGE5YmJhMzY4Nzc4MDExNmZkNTI1MjZhMGE3OTQyMDZmOTc1MTVmZDM1Mzc3ZmJmNjhmMzllOGYxYSJ9',
    };

    const productsResponse = await axios.post(API_URL, requestBody, {
      headers: {
        'Api-key': API_KEY,
        'Auth-token': authToken,
      },
    });

    const products = productsResponse.data.data.electricity;

    res.status(200).json(products); // sends a JSON response
  } catch (error: any) {
    console.error('An error occurred while fetching products:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
}
