'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '/workspaces/dmrc-website/firebaseConfig.js';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err) {
      setError('Google Sign-In failed');
    }
  };

  return (
    <>
      <Header />
      <main className="auth-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
        <button onClick={handleGoogleSignIn} className="auth-google">
          Sign in with Google
        </button>
      </main>
      <Footer />
    </>
  );
};

export default AuthPage;
