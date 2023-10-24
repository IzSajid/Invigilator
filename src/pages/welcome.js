
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
       <div> 
        <div className="flex flex-col items-center justify-center h-screen" >
            <h1 className="text-4xl font-bold mb-4">Welcome to Invigilator</h1>
            <p className="text-gray-500 mb-8">The best way to manage your exams</p>
           
            <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={() => window.location.href = '/dashboard'}
            >Get Started</button>
        </div>
       </div> 
    );
}

export default Welcome;
