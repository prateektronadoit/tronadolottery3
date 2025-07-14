import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import { ethers } from 'ethers';

const MONGO_URI = 'mongodb+srv://prateeksingh:4C_PRATEEK12@cluster0.koe0qtc.mongodb.net/';
const DB_NAME = 'tronado';
const COLLECTION = 'round_emails';
const EMAIL_TO = 'prateek.singh@tronadoit.in';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
  "function currentRoundId() view returns (uint256)",
  "function rounds(uint256) view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"
];
const CONTRACT_ADDRESS = '0xc00235bc296c2d8986bbab01967239f8a61c0f88';
const PROVIDER_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';

async function getLatestRoundInfo() {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const roundId = await contract.currentRoundId();
  const roundData = await contract.rounds(roundId);
  const createdAt = Number(roundData[8]);
  return { roundId: Number(roundId), createdAt };
}

async function sendEmail(roundId: number) {
  // Configure your SMTP or use a test account
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP
    auth: {
      user: 'your_gmail@gmail.com',
      pass: 'your_gmail_app_password',
    },
  });

  await transporter.sendMail({
    from: 'no-reply@tronadoit.in',
    to: EMAIL_TO,
    subject: `Tronado: 2 hours passed since round ${roundId} creation`,
    text: `2 hours have passed since round ${roundId} was created.`,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Get latest round info
    const { roundId, createdAt } = await getLatestRoundInfo();
    const now = Math.floor(Date.now() / 1000);

    // 2. Connect to MongoDB
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    // 3. Check if email already sent for this round
    const alreadySent = await collection.findOne({ roundId });
    if (alreadySent) {
      client.close();
      return res.status(200).json({ message: 'Email already sent for this round.' });
    }

    // 4. Check if 2 hours have passed
    if (now - createdAt < 7200) {
      client.close();
      return res.status(200).json({ message: '2 hours have not passed yet.' });
    }

    // 5. Send email
    await sendEmail(roundId);
    await collection.insertOne({ roundId, sentAt: new Date() });
    client.close();
    return res.status(200).json({ message: 'Email sent.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 