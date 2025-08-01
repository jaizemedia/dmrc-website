'use client';

import React, { useState } from 'react';
import Container from '@/components/Container';
import EventsWidget from '@/components/EventCalendarEmbed';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Dashboard: React.FC = () => {
  // Volunteer form state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerMessage, setVolunteerMessage] = useState('');
  const [volunteerSuccess, setVolunteerSuccess] = useState<string | null>(null);

  // Prayer request state
  const [prayerMessage, setPrayerMessage] = useState('');
  const [prayerSuccess, setPrayerSuccess] = useState<string | null>(null);

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <Container>
      <div className="pt-[90px] max-w-4xl mx-auto py-12 space-y-16 px-4">
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

        {/* Payment Iframe */}
        <section className="make-payment-section">
 <button
  onClick={() => window.location.href = "https://donate.stripe.com/3cs8AzeVxc8se1W5kk"}
  className="
    flex items-center justify-center
    bg-gradient-to-r from-purple-600 to-indigo-700
    hover:from-green-400 hover:to-blue-500
    text-white text-lg font-semibold
    py-3 px-8 rounded-full shadow-lg
    transition-all duration-300 ease-in-out
  "
>
  <span className="mr-3">Donate (Any Amount)</span>
  <div className="flex items-center space-x-3">
  
    <img
      src="https://www.svgrepo.com/show/452157/apple-pay.svg"
      alt="Apple Pay"
      className="h-6 w-6"
    />
    <img
      src="https://www.svgrepo.com/show/508690/google-pay.svg"
      alt="Google Pay"
      className="h-6 w-6"
    />
  </div>
</button>

</section>


        {/* Events Section */}
        <section>
          <div className="border p-6 rounded-md bg-white shadow-sm">
            <EventsWidget />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
