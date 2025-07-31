import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe('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', {
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount < 1) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'gbp',
      payment_method_types: ['card'],
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Stripe PaymentIntent error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    console.error('Unknown Stripe error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
