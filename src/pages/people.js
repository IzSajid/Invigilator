import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../share';

export default function People() {
    const { id } = useParams(); 
    const [data, setData] = useState(null);

    useEffect(() => {
        const url = baseUrl + 'api/cohorts/'+ id +'/users/';
        fetch(url,
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                }
            }
            )
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">People</h1>
            {data && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Creator</h2>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <p className="text-lg font-medium">Username: {data.creator.username}</p>
                        <p className="text-lg font-medium">Email: {data.creator.email}</p>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Users</h2>
                    {data.users.map(user => (
                        <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <p className="text-lg font-medium">Username: {user.username}</p>
                            <p className="text-lg font-medium">Email: {user.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}