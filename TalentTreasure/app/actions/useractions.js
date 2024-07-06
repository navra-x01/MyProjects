"use server";

import { Cashfree } from "cashfree-sdk";
import Payment from "@/Models/Payment";
import User from "@/Models/User";
import connectDB from "../db/connectDb";

const appId = "TEST10239626c538cc6893c658eb3d6662693201"; // Replace with your Cashfree test App ID
const secretKey = "cfsk_ma_test_e1d1afd6368dfd848cd2076663ff606f_09088e3c"; // Replace with your Cashfree test Secret Key

Cashfree.initialize({
  mode: "TEST", // Set to 'TEST' for testing environment
  appId: process.env.KEY_ID,
  secretKey: process.env.KEY_SECRET,
});

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await Cashfree.Payment.createOrder(options);

  //create a payment object which shows a pending paymnet in the database
  await Payment.create({order_id:x.id,amount:amount,to_username:to_username,name:paymentform.name,message:paymentform.message})

  return x
};
