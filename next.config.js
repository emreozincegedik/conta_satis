/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    merchant_id: process.env.merchant_id,
    merchant_key: process.env.merchant_key,
    merchant_salt: process.env.merchant_salt,
  },
};

module.exports = nextConfig;
