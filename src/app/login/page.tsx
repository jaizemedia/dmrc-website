'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,

} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { siteDetails } from '@/data/siteDetails';
import Container from "@/components/Container";


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

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createUserProfile = async (uid: string, emailStr: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, { email: emailStr, createdAt: new Date() });
      }
    } catch {
      setError('Error saving user profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const cred = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      if (!isLogin) {
        await createUserProfile(cred.user.uid, email);
      }
      router.push('/dashboard');
    } catch {
      setError('Authentication failed');
    }
  };


return (
  <Container>
<div className="flex items-center justify-center min-h-[80vh] pt-28 pb-12">
      <div className="w-full max-w-md bg-[#f3f3f5] rounded-xl shadow-md px-8 py-10 text-center">
        <h1 className="text-2xl font-bold mb-1 manrope">{siteDetails.siteName}</h1>
        <p className="text-gray-600 mb-6">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-secondary hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 w-full py-3 border border-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
        >
          {isLogin
            ? 'Need an account? Sign Up'
            : 'Already have an account? Login'}
        </button>

      </div>
    </div>
  </Container>
);
};

export default AuthPage;
