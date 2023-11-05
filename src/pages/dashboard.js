import '../index.css';
import React, { useEffect,useState } from 'react';
import { Link} from 'react-router-dom';
import JoinCohort from '../compotents/JoinCohort';
import CreateCohort from '../compotents/CreateChohort';
import { baseUrl } from '../share';

export default function Dashboard() {
    const [cohorts, setCohorts] = useState([]);
    const [joined, setJoined] = useState([]);

    function joinCohort(cohortID) {
            const data = { cohort: cohortID, user: 5 };
            const url = baseUrl + 'api/joined/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data.cohort);
                    setJoined([...joined, data.cohort]);
                    //make sure the list is updated appropriately
                })
                .catch((e) => {
                    console.log(e);
                });
    }

    function createCohort(courseName) {
        const data = { cohort_name: courseName ,cohort_creator: 1};
        const url = baseUrl + 'api/cohorts/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.cohort);
                setCohorts([...cohorts, data.cohort]);
                //make sure the list is updated appropriately
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        const url = baseUrl + 'api/cohorts/';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCohorts(data.cohorts);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    console.log('Access denied');
                    // Handle the 403 response here
                } else {
                    console.log('Something went wrong');
                }
            });
    }, []);
    useEffect(() => {
        const url = baseUrl + 'api/joined/';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setJoined(data.Joined_cohorts);
            });
    }, []);






    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center mt-8">
                <JoinCohort joinCohort={joinCohort} />,
                <CreateCohort createCohort={createCohort} />
            </div>
            <div className="flex justify-center mt-8">
                {cohorts.length === 0 ? (
                    <p>Loading...</p> // You can replace this with a loading spinner if desired
                ) : (
                    <div className="flex flex-col items-center mt-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cohorts</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cohorts.map((cohort) => (
                                <div className="bg-white rounded-lg shadow-lg p-4" key={cohort.id}>
                                    <Link to={`/cohort/${cohort.id}`}>
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                            {cohort.cohort_name}
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-8">
                {joined.length === 0 ? (
                    <p>Loading...</p> 
                ) : (
                    <div className="flex flex-col items-center mt-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Joined Cohorts</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {joined.map((joined) => (
                                <div className="bg-white rounded-lg shadow-lg p-4" key={joined.id}>
                                    <Link to={`/cohort/${joined.cohort.cohort_id}`}>
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                             <p> {joined.cohort.cohort_name} </p>
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
            
        </div>
        );
}



