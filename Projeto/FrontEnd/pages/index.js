import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Signature Management System 2</h1>       
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-center mb-4 font-bold">Welcome</h2>
            <div className="mb-4">
              <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-2">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
        </div> 
      );
    };
    
export default Home;
