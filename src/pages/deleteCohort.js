
import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { baseUrl } from '../share';

const DeleteCohortPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    

    const handleDelete = () => {
        const url = baseUrl + 'api/cohorts/' + id + '/';
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error deleting question: ${response.statusText}`);
                }
                // Only try to parse the response as JSON if there's content
                return response.status === 204 ? null : response.json();
            })
            .then(data => {
                console.log(data);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error deleting question:', error);
            });
    }  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Are you sure you want to delete this cohort?</h1>
      <button onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Delete
      </button>
    </div>
  );
};

export default DeleteCohortPage;
