import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Replace with your actual secret key
const stripe = new Stripe('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', {
  apiVersion: undefined, // for example
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Convert pounds to pence (e.g., £2.75 -> 275)
  const amountInPence = Math.round(amount * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: 'gbp',
      payment_method_types: ['card'],
      description: 'Church Offering',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: 'Stripe error: ' + error.message });
  }
}
