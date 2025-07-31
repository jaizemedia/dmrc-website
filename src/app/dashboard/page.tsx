'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import EventsWidget from '@/components/EventCalendarEmbed';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Stripe publishable key (replace this with your actual one)
const stripePromise = loadStripe('pk_live_51RFgZBBMLSTMtFsQbBaqMEsxD9X5v7klUWGvzJjELtbTNBjQBV6CX4hmeFsYZe8Xs89nq70IqoYlIx03TEm8w3dQ00NLiCluiS');

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB8ntsD7n8mqLZRm6y8VpiDSBVoGRTWrls',
  authDomain: 'disciple-makers-church-int-l.firebaseapp.com',
  projectId: 'disciple-makers-church-int-l',
  storageBucket: 'disciple-makers-church-int-l.firebasestorage.app',
  messagingSenderId: '484991457391',
  appId: '1:484991457391:web:f93256091f94170fcb159a',
  measurementId: 'G-23T167B32Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

const GiveForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  useEffect(() => {
    if (!stripe) {
      setPaymentRequest(null);
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setPaymentRequest(null);
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'Offering',
        amount: Number(amount) * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check availability of the Payment Request API.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      } else {
        setPaymentRequest(null);
      }
    });

    pr.on('paymentmethod', async (ev: any) => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Number(amount) * 100 }),
        });

        const { clientSecret } = await response.json();

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: ev.paymentMethod.id,
        }, { handleActions: false });

        if (confirmError) {
          ev.complete('fail');
          setMessage(confirmError.message || 'Payment failed');
        } else {
          ev.complete('success');
          setMessage('Thank you for your offering!');
          setAmount('');
          elements?.getElement(CardElement)?.clear();
        }
      } catch (err) {
        ev.complete('fail');
        setMessage('Payment failed, please try again.');
        console.error(err);
      }
    });
  }, [stripe, amount, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) * 100 }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setMessage(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        setMessage('Thank you for your offering!');
        setAmount('');
        cardElement.clear();
      }
    } catch (err) {
      console.error(err);
      setMessage('Payment failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {paymentRequest && (
        <div className="mb-4">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}

      <input
        type="number"
        min="1"
        placeholder="Amount (GBP)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <div className="p-3 border border-gray-300 rounded-md">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Processing...' : 'Give Offering'}
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </form>
  );
};

const Dashboard: React.FC = () => {
  // Volunteer form states
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerMessage, setVolunteerMessage] = useState('');
  const [volunteerSuccess, setVolunteerSuccess] = useState<string | null>(null);

  // Prayer request states
  const [prayerMessage, setPrayerMessage] = useState('');
  const [prayerSuccess, setPrayerSuccess] = useState<string | null>(null);

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'volunteers'), {
        name: volunteerName,
        email: volunteerEmail,
        message: volunteerMessage,
        createdAt: serverTimestamp(),
      });
      setVolunteerSuccess('Thank you for volunteering!');
      setVolunteerName('');
      setVolunteerEmail('');
      setVolunteerMessage('');
    } catch (error) {
      console.error(error);
      setVolunteerSuccess('Failed to submit volunteer info. Please try again.');
    }
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'prayerRequests'), {
        message: prayerMessage,
        createdAt: serverTimestamp(),
      });
      setPrayerSuccess('Your prayer request has been submitted.');
      setPrayerMessage('');
    } catch (error) {
      console.error(error);
      setPrayerSuccess('Failed to submit prayer request. Please try again.');
    }
  };

  return (
    <>
      <Container>
        <div className="pt-[90px] max-w-4xl mx-auto py-12 space-y-16">
          {/* Volunteer Form */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Volunteer</h2>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Name"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={volunteerEmail}
                onChange={(e) => setVolunteerEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Message (optional)"
                value={volunteerMessage}
                onChange={(e) => setVolunteerMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Submit Volunteer Info
              </button>
              {volunteerSuccess && <p className="mt-2 text-green-600">{volunteerSuccess}</p>}
            </form>
          </section>

          {/* Prayer Requests Form */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Prayer Requests</h2>
            <form onSubmit={handlePrayerSubmit} className="space-y-4 max-w-md">
              <textarea
                placeholder="Write your prayer request here"
                value={prayerMessage}
                onChange={(e) => setPrayerMessage(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Submit Prayer Request
              </button>
              {prayerSuccess && <p className="mt-2 text-green-600">{prayerSuccess}</p>}
            </form>
          </section>

          {/* Stripe Giving Form */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Give Offering</h2>
            <GiveForm />
          </section>

          {/* Event Widget */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <EventsWidget />
          </section>
        </div>
      </Container>
    </>
  );
};

const App: React.FC = () => (
  <StripeProvider>
    <Dashboard />
  </StripeProvider>
);

export default App;
