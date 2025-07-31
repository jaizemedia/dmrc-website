'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteDetails } from '@/data/siteDetails';

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
const googleProvider = new GoogleAuthProvider();
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

  const handleGoogle = async () => {
    setError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await createUserProfile(cred.user.uid, cred.user.email!);
      router.push('/dashboard');
    } catch {
      setError('Google sign-in failed');
    }
  };

  const container: React.CSSProperties = {
    maxWidth: 400,
    margin: '5vh auto',
    padding: 30,
    borderRadius: 10,
    background: '#f4f7ff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
  };
  const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '12px' };
  const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
  };
  const buttonStyle: React.CSSProperties = {
    padding: '10px 0',
    borderRadius: 6,
    border: 'none',
    background: '#4f46e5',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };
  const toggleStyle: React.CSSProperties = {
    padding: '10px 0',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#fff',
    color: '#444',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto 0',
  };
  const googleStyle: React.CSSProperties = {
    padding: '10px 0',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#4285F4',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: 20,
  };
  const errorStyle: React.CSSProperties = {
    color: 'crimson',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  };

  return (
    <>
         <main style={container}>
        <h1>{siteDetails.siteName}</h1>
        <p>{isLogin ? 'Login to your account' : 'Create a new account'}</p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={buttonStyle}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
        <button onClick={() => setIsLogin(!isLogin)} style={toggleStyle}>
          {isLogin
            ? 'Need an account? Sign Up'
            : 'Already have an account? Login'}
        </button>
        <button onClick={handleGoogle} style={googleStyle}>
          Sign in with Google
        </button>
      </main>
    </>
  );
};

export default AuthPage;
