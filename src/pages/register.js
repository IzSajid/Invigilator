import { useState} from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const location = useLocation();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
        
    }

    return (
        <form  onSubmit={handleSubmit}
        className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-300">
               
               <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
               
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" for="username">
                        Username
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <div className="flex items-center justify-center flex-col">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                    <Link to={'/login'} className="mt-4 no-underline">Already have an account? Login here</Link>
                    <Link to={'/welcome'} className="mt-4 no-underline">Back to welcome page</Link>
                </div>
            </div>
        </form>
    );
}