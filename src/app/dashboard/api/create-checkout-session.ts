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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Church Offering',
            },
            unit_amount: Math.round(amount * 100), // amount in pence
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/dashboard?payment=success`,
      cancel_url: `${req.headers.origin}/dashboard?payment=cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Session error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
