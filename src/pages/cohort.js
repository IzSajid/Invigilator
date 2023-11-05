import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../share';

export default function Cohort(props) {
    const { id } = useParams();
    const [cohort, setCohort] = useState(null);

    useEffect(() => {
        const url = baseUrl + 'api/cohorts/'+ id +'/';
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                setCohort(data.cohort);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg w-1/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to={'/people/'+id} className="text-gray-900 font-bold text-xl">People</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <nav className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-3xl font-bold text-gray-900">{cohort && cohort.cohort_name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {cohort && (
                            <div>
                                <p className="text-gray-700">Cohort ID: {cohort.id}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}