import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        jwt.verify(token, 'secretpassword');
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
