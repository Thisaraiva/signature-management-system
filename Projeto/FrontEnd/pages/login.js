import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importe o useRouter do next/router


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Instancie o useRouter

  const handleSubmit = async (e) => {
    console.log('entrou no handleSubmit');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      // Handle successful login
      console.log('Login successful:', response.data);

      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);
      console.log(`ROUTER --> ${router}`);
      // Redirecionar para a página de dashboard após o login
      router.push('/dashboard'); // Substitua '/dashboard' pela rota correta do seu projeto
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-center mb-4 font-bold">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;